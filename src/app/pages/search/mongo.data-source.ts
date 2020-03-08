
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Observable, Subject } from 'rxjs';
import { DateUtils } from '../common/components/utils/data-utils';
import { HttpClient } from '@angular/common/http';
import { RejectionService } from 'app/theme/services/rejection/rejectionService.service';


@Injectable()
export class MongoServerDataSource extends LocalDataSource {

  lastRequestCount: number = 0;
  private search: string;
  private params: {} = {};
  private paramsUsed: string;
  private filterUsed: {} = {};
  private collectionId: string;
  private rejectionService: RejectionService;
  private isCollectionReady: boolean = false;

  private columnsListTofilter: any[] = [];
  private configCollection: any[] = [];
  private multisort: {};
  private elements: any[] = [];
  private refreshfields: string[] = [];
  private localPaging: boolean = false;
  private isfilterUsed: boolean = false;

  private pendingRequest = true;
  private updates = new Subject<any>();

  //une partie de la conf qui permet d'indiquer les items ayants des embedded, et les tyeps date
  private subConfigCollection: any =
    {
      'contract': [{ 'item': 'legalName', 'embedded': 'ownerLst' }, { 'item': 'startDate', 'type': 'date' }],
      'health-aggregate': [{ 'item': 'sequenceCode', 'embedded': 'healthClaimDtlLst' },
      { 'item': 'insuredGroupType', 'embedded': 'insuredGroupDtlLst' },
      { 'item': 'insuredGroupAge', 'embedded': 'insuredGroupDtlLst' },
      { 'item': 'insuredGroupSex', 'embedded': 'insuredGroupDtlLst' },
      { 'item': 'externalBeneditPaid', 'embedded': 'healthClaimDtlLst' }],
      'policy-ident': [{ 'item': 'externalOwnerLegalName', 'embedded': 'externalOwnerLst' },
      { 'item': 'externalStartDate', 'type': 'date' }],
      'agreement': [{ 'item': 'startDateAgr', 'type': 'date' }, { 'item': 'startDateAmd', 'type': 'date' }],
      'compensation-rules': [{ 'item': 'startDate', 'type': 'date' }, { 'item': 'endDate', 'type': 'date' }],
      'juridical-entity': [{ 'item': 'startDate', 'type': 'date' }],

      'premium-payment': [{ 'item': 'organizationCode', 'embedded': 'billingLst', 'type': 'date' },
      { 'item': 'periodStartDate', 'embedded': 'billingLst', 'type': 'date' },
      { 'item': 'periodEndDate', 'embedded': 'billingLst', 'type': 'date' },
      { 'item': 'clawbackDueDate', 'embedded': 'clawBackLst', 'type': 'date' },
      { 'item': 'clawBackDate', 'embedded': 'clawBackLst', 'type': 'date' },
      { 'item': 'paymentDate', 'embedded': 'moneyInLst', 'type': 'date' },
      { 'item': 'premiumGrossAmount', 'embedded': 'billingLst' },
      { 'item': 'paymentAmount', 'embedded': 'moneyInLst' },
      { 'item': 'paymentAmountTaxExcl', 'embedded': 'billingLst' },
      { 'item': 'paymentAmntPaid', 'embedded': 'billingLst' },
      { 'item': 'grossAmount', 'embedded': 'clawBackLst' }
      ],
      'disbursement': [{ 'item': 'disbursementDate', 'type': 'date' },
      { 'item': 'startDate', 'type': 'date' },
      { 'item': 'endDate', 'type': 'date' }]
    };

  constructor(private http: HttpClient) {
    super();
    this.rejectionService = new RejectionService(http);
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
    console.log('columnsListTofilter: ', columnsListTofilter);
    this.columnsListTofilter = columnsListTofilter;
  }

  setConfig(configCollection: any[]) {
    this.configCollection = configCollection;
  }

  setMultisort(multisort: {}) {
    this.multisort = multisort;
  }

  setRefreshfields(refreshfields: string[]) {
    this.refreshfields = refreshfields;
  }

  getCollectionReady(): Observable<boolean> {
    return Observable.bind(this.isCollectionReady);
  }

  getUpdates(): Subject<any> {
    return this.updates;
  }

  setParams(params) {
    this.params = params;
  }

  getPrefix(field) {
    let config;
    let prefix = '';

    if (this.configCollection && this.configCollection.length > 0) {
      config = this.configCollection;
    } else
      if (this.subConfigCollection && this.subConfigCollection[this.collectionId] && this.subConfigCollection[this.collectionId].length > 0) {
        config = this.subConfigCollection[this.collectionId];
      }
    if (config && config.length > 0) {
      let confResult = config.find(element => element.item == field);

      if (confResult && confResult['embedded']) {
        prefix = confResult['embedded'] + '.';
      }
    }
    return prefix;
  }

  setPage(page: number, doEmit: boolean = true): MongoServerDataSource {
    this.localPaging = true;
    super.setPage(page, doEmit);
    return this;
  }

  addFilter(fieldConf: any, andOperator = true, doEmit: boolean = true): MongoServerDataSource {
    console.log('this.params: ', this.params);
    this.pendingRequest = true;
    if (!this.params) {
      this.params = {};
    }

    if (!this.filterUsed) {
      this.filterUsed = {};
    }

    if (!this.params['filters']) {
      this.params['filters'] = {};
    }

    if (!this.params['filters']['parameters']) {
      this.params['filters']['parameters'] = {};
    }

    if (fieldConf) {
      if (fieldConf['search'] != "") {
        this.params['filters']['parameters'][fieldConf['field']] = fieldConf['search'];
        this.filterUsed[fieldConf['field']] = fieldConf['search'];
      } else {
        delete this.params['filters']['parameters'][fieldConf['field']];
        delete this.filterUsed[fieldConf['field']];
      }
      if (this.refreshfields.includes(fieldConf['field'] + '')) {
        this.refresh();
      }
    }
    return this;
  }

  isFilterUsed() {
    return this.filterUsed && Object.keys(this.filterUsed).length > 0 ? true : false;
  }

  getParams() {
    return JSON.parse(this.paramsUsed);
  }

  getFilterUsed() {
    return this.filterUsed;
  }

  getElements(): Promise<any> {
    if (this.pendingRequest) {
      this.updates.next(this.params);
      this.pendingRequest = false;
    }
    let limitPerPage: number;
    let page: number;
    let sort: string;
    let order: string;
    let multisort: any;

    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        let prefix = this.getPrefix(fieldConf.field);
        sort = prefix + fieldConf.field;
        order = fieldConf.direction;
      });
    }

    let sortItems: string[];
    let sortItemsResult: string[];
    let indexSort: any;

    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
      page = this.pagingConf['page'];
      limitPerPage = this.pagingConf['perPage'];
    }

    let filters: any[] = [];
    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf) => {
        let filter: any = { 'item': '', 'value': '' };
        if (fieldConf['search']) {
          let prefix = this.getPrefix(fieldConf.field);
          filter['item'] = prefix + fieldConf['field'];
          filter['value'] = fieldConf['search'];
          filters.push(filter);
        }
      });
    }

    if (this.localPaging && this.elements) {
      this.localPaging = false;
      return new Promise((resolve, reject) => {
        resolve(this.elements.slice((page - 1) * limitPerPage, page * limitPerPage));
      });
    }

    this.paramsUsed = JSON.stringify(this.params);

    return this.rejectionService.loadCollectionFromMongo(this.params).pipe(
      map(
        collectionsList => {
          this.isCollectionReady = true;
          this.lastRequestCount = collectionsList.length;
          if (collectionsList) {
            this.elements = [].concat(collectionsList);
            if (collectionsList.length >= page * limitPerPage) {
              return collectionsList.slice((page - 1) * limitPerPage, page * limitPerPage);
            }
            return collectionsList;
          }
          return [];
        }
      )).toPromise();
  }


  getCollectionId(collectionId) {
    return collectionId;
  }

  // getItemsTypeDate() {
  //   let config;
  //   let itemsTypeDate: string[] = [];

  //   if (this.configCollection && this.configCollection.length > 0) {
  //     config = this.configCollection;
  //   } else
  //     if (this.subConfigCollection && this.subConfigCollection[this.collectionId] && this.subConfigCollection[this.collectionId].length > 0) {
  //       config = this.subConfigCollection[this.collectionId];
  //     }
  //   if (config && config.length > 0) {
  //     let confCollection = config.filter(element => element.type == 'date');
  //     if (confCollection !== undefined) {
  //       confCollection.forEach(field => {
  //         itemsTypeDate.push(field.embedded ? field.embedded + '.' + field.item : field.item);
  //       });
  //     }
  //   }
  //   return itemsTypeDate;
  // }

  // formatDateList(collections: any, collectionId: any) {
  //   if (collections && collections !== undefined && collections.length > 0) {
  //     let itemsTypeDate: string[] = this.getItemsTypeDate();
  //     collections.forEach(
  //       collection => {
  //         if (itemsTypeDate !== undefined) {
  //           itemsTypeDate.forEach(
  //             elementDate => {
  //               var arrayOfStrings = elementDate.split('.');
  //               if (arrayOfStrings.length === 1) {
  //                 collection[elementDate] = this.formatDate(collection[elementDate], 'date');
  //               } else {
  //                 collection[arrayOfStrings[0]][arrayOfStrings[1]] = this.formatDate(collection[arrayOfStrings[0]][arrayOfStrings[1]], 'date');
  //               }
  //             });
  //         }
  //       }
  //     );
  //   }
  //   return collections;
  // }

  // formatDate(data: String, type: String) {
  //   if (data === '' || data === null) {
  //     return '';
  //   }
  //   if (type === 'date') {
  //     return DateUtils.formatDate(data, 'dd/MM/yyyy');
  //   } else if (type === 'timestamp') {
  //     return DateUtils.formatDate(data, 'dd/MM/yyyy HH:mm:ss');
  //   }
  // }

}
