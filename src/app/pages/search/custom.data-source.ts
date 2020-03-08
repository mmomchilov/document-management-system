
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';
import { SearchService } from '../../theme/services/search/search.service';
import { DateUtils } from '../common/components/utils/data-utils';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CustomServerDataSource extends LocalDataSource {

  lastRequestCount: number = 0;
  private search: string;
  private collectionId: string;
  private searchService: SearchService;
  private isCollectionReady: boolean = false;

  private columnsListTofilter: any[] = [];
  private configCollection: any[] = [];
  private multisort: {};

  //une partie de la conf qui permet d'indiquer les names ayants des embedded, et les tyeps date
  private subConfigCollection: any =
    {
      'contract': [{ 'name': 'legalName', 'embedded': 'ownerLst' }, { 'name': 'startDate', 'type': 'date' }],
      'health-aggregate': [{ 'name': 'sequenceCode', 'embedded': 'healthClaimDtlLst' },
      { 'name': 'insuredGroupType', 'embedded': 'insuredGroupDtlLst' },
      { 'name': 'insuredGroupAge', 'embedded': 'insuredGroupDtlLst' },
      { 'name': 'insuredGroupSex', 'embedded': 'insuredGroupDtlLst' },
      { 'name': 'externalBeneditPaid', 'embedded': 'healthClaimDtlLst' }],
      'policy-ident': [{ 'name': 'externalOwnerLegalName', 'embedded': 'externalOwnerLst' },
      { 'name': 'externalStartDate', 'type': 'date' }],
      'agreement': [{ 'name': 'startDateAgr', 'type': 'date' }, { 'name': 'startDateAmd', 'type': 'date' }],
      'compensation-rules': [{ 'name': 'startDate', 'type': 'date' }, { 'name': 'endDate', 'type': 'date' }],
      'juridical-entity': [{ 'name': 'startDate', 'type': 'date' }],
      'information-delegate': [{ 'name': 'startDate', 'type': 'date' }, { 'name': 'statusDate', 'type': 'date' }],
      'premium-payment': [{ 'name': 'organizationCode', 'embedded': 'billingLst' },
      { 'name': 'periodStartDate', 'embedded': 'billingLst', 'type': 'date' },
      { 'name': 'periodEndDate', 'embedded': 'billingLst', 'type': 'date' },
      { 'name': 'clawbackDueDate', 'embedded': 'clawBackLst', 'type': 'date' },
      { 'name': 'clawBackDate', 'embedded': 'clawBackLst', 'type': 'date' },
      { 'name': 'paymentDate', 'embedded': 'moneyInLst', 'type': 'date' },
      { 'name': 'premiumGrossAmount', 'embedded': 'billingLst', 'type': 'number' },
      { 'name': 'paymentAmount', 'embedded': 'moneyInLst', 'type': 'number' },
      { 'name': 'paymentAmountTaxExcl', 'embedded': 'billingLst', 'type': 'number' },
      { 'name': 'paymentAmntPaid', 'embedded': 'billingLst', 'type': 'number' },
      { 'name': 'grossAmount', 'embedded': 'clawBackLst', 'type': 'number' }
      ],
      'disbursement': [{ 'name': 'disbursementDate', 'type': 'date' },
      { 'name': 'startDate', 'type': 'date' },
      { 'name': 'endDate', 'type': 'date' }],
      'message-applications': [
        { 'name': 'startDate', 'type': 'date' },
        { 'name': 'endDate', 'type': 'date' },
        { 'name': 'lastGeneratedDate', 'type': 'date' }
      ],
      'membership-insured': [{ 'name': 'birthDate', 'type': 'date' }],
      'claim-folder': [{ 'name': 'claimEventDate', 'type': 'date' }]
    };

  constructor(private http: HttpClient) {
    super();
    this.searchService = new SearchService(http);
  }

  count(): number {
    return this.lastRequestCount;
  }

  setSearch(search: string) {
    this.search = search;
  }

  setCollectionId(collectionId: string) {
    this.collectionId = collectionId;
  }

  setColumnsListTofilter(columnsListTofilter: any[]) {
    this.columnsListTofilter = columnsListTofilter;
  }

  setConfig(configCollection: any[]) {
    this.configCollection = configCollection;
  }

  setMultisort(multisort: {}) {
    this.multisort = multisort;
  }

  getCollectionReady(): Observable<boolean> {
    return Observable.bind(this.isCollectionReady);
  }

  getPrefix(field) {
    let config;
    let prefix = '';

    if (this.configCollection && this.configCollection[this.collectionId] && this.configCollection[this.collectionId].length > 0) {
      config = this.configCollection[this.collectionId];
    } else
      if (this.subConfigCollection && this.subConfigCollection[this.collectionId] && this.subConfigCollection[this.collectionId].length > 0) {
        config = this.subConfigCollection[this.collectionId];
      }
    if (config && config.length > 0) {
      let confResult = config.find(element => element.name === field);

      if (confResult && confResult['embedded']) {
        prefix = confResult['embedded'] + '.';
      }
    }
    return prefix;
  }

  getElements(): Promise<any> {
    let limitPerPage: number;
    let page: number;
    let sort: string;
    let order: string;
    let collectionId = this.collectionId;
    let collections = [collectionId];
    let search = this.search;
    let columnsListTofilter = this.columnsListTofilter;
    let configCollection = this.configCollection;
    let multisort: any;

    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        let prefix = this.getPrefix(fieldConf.field);
        sort = prefix + fieldConf.field;
        order = fieldConf.direction;
      });
    } else {
      let multisort = this.multisort;
    }

    let sortnames: string[];
    let sortnamesResult: string[];
    let indexSort: any;

    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
      page = this.pagingConf['page'];
      limitPerPage = this.pagingConf['perPage'];
    }

    let filters: any[] = [];
    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf) => {
        let filter: any = { 'name': '', 'value': '' };
        if (fieldConf['search']) {
          let prefix = this.getPrefix(fieldConf.field);
          filter['name'] = prefix + fieldConf['field'];
          filter['value'] = fieldConf['search'];
          filters.push(filter);
        }
      });
    }

    let body = {
      collections,
      search,
      page,
      limitPerPage,
      sort,
      order,
      filters,
      multisort,
      columnsListTofilter
    };

    return this.searchService.loadCollectionsPerPage(body).pipe(
      map(
        collectionsList => {
          if (collectionsList[collectionId]) {
            if (collectionsList['summary'] && collectionsList['summary'][collectionId]
              && collectionsList['summary'][collectionId]['total']) {
              this.lastRequestCount = collectionsList['summary'][collectionId]['total'];
            }
            this.isCollectionReady = true;
            let resultFormated = this.formatList(collectionsList[collectionId], collectionId, 'date');
            return resultFormated;
          } else {
            this.isCollectionReady = true;
            return [];
          }
        }
      )).toPromise();
  }


  getCollectionId(collectionId) {
    return collectionId;
  }

  getItemsByType(type: string) {
    let config;
    let namesType: string[] = [];

    if (this.configCollection && this.configCollection.length > 0) {
      config = this.configCollection;
    } else
      if (this.subConfigCollection && this.subConfigCollection[this.collectionId] && this.subConfigCollection[this.collectionId].length > 0) {
        config = this.subConfigCollection[this.collectionId];
      }
    if (config && config.length > 0) {
      let confCollection = config.filter(element => element.type == 'date');
      if (confCollection !== undefined) {
        confCollection.forEach(field => {
          namesType.push(field.embedded ? field.embedded + '.' + field.name : field.name);
        });
      }
    }
    return namesType;
  }

  formatType(element: any, type: string) {
    let obj: any;
    switch (type) {
      case 'date':
        obj = this.formatDate(element, 'date');
        break;
      case 'number':
        obj = isNaN(Number(element)) ? '' : Number(element);
        break;
    }
    return obj;
  }

  formatList(collections: any, collectionId: any, type: string) {
    if (collections && collections !== undefined && collections.length > 0) {
      const namesType: string[] = this.getItemsByType(type);
      collections.forEach(
        collection => {
          if (namesType !== undefined) {
            namesType.forEach(
              element => {
                const arrayOfStrings = element.split('.');
                if (arrayOfStrings.length === 1) {
                  collection[element] = this.formatType(collection[element], type);
                } else {
                  collection[arrayOfStrings[0]][arrayOfStrings[1]] = this.formatType(collection[arrayOfStrings[0]][arrayOfStrings[1]], type);
                }
              });
          }
        }
      );
    }
    return collections;
  }

  formatDate(data: String, type: String) {
    if (data === '' || data === null) {
      return '';
    }
    if (type === 'date') {
      return DateUtils.formatDate(data, 'dd/MM/yyyy');
    } else if (type === 'timestamp') {
      return DateUtils.formatDate(data, 'dd/MM/yyyy HH:mm:ss');
    }
  }

}
