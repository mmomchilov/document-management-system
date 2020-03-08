import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchService, RoutingService, CollectionDetailsService, MongoSearchService } from '../../theme';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalOptions } from 'ngx-bootstrap/modal/modal-options.class';
import { DetailsModal } from './modals/details/details.modal.component';
import { HttpClient } from '@angular/common/http';

import 'style-loader!./search.scss';
import { CustomServerDataSource } from './custom.data-source';
import { KeycloakService } from '../../../keycloak/keycloak.service';


@Component({
  selector: 'search',
  providers: [CustomServerDataSource],
  templateUrl: './search.html'
})

export class SearchComponent implements OnInit {

  @Input() detailsBlockedAmountTableData: Array<any>;
  public selectedItemList: any;
  public selectedItem: any;
  public errorMessage: string;
  public allItems: any;
  public collections = [];
  public isCollectionReady: boolean = false;
  public dataSourceList: any = {};
  public settings: any = {};
  public limitedSettings: any = {};
  public keyword: string;
  customCollectionDataSource: CustomServerDataSource;

  constructor(private http: HttpClient,
    private _modalService: BsModalService,
    private searchService: SearchService, private translate: TranslateService, private mongoSearchService: MongoSearchService,
    private collectionDetails: CollectionDetailsService, private router: Router, private routingService: RoutingService) {
  }

  ngOnInit() {
    if (!this.routingService.data.isSearchAll) {
      let linkHome = ['pages/home'];
      this.router.navigate(linkHome);
    }
    if (this.routingService.data.isSearchAll) {
      this.routingService.searchCallback = {
        callBack: this.getResult,
        targetComponent: this
      }
      this.routingService.searchResult();
    }
  }

  /**
  * Get Search result
  */
  getResult(settings: any, limitedSettings: any, allItems: any, collections: any, targetComponent: any, keyword: string) {
    targetComponent.isCollectionReady = false;
    targetComponent.allItems = allItems;
    targetComponent.settings = settings;
    targetComponent.collections = collections;
    targetComponent.limitedSettings = limitedSettings;
    targetComponent.keyword = keyword;
    collections.forEach(function (collection) {
      const customCollectionDataSource = new CustomServerDataSource(targetComponent.http);
      customCollectionDataSource.setCollectionId(collection);
      customCollectionDataSource.setSearch(targetComponent.keyword);
      targetComponent.dataSourceList[collection] = customCollectionDataSource;

    });

    targetComponent.isCollectionReady = true;
  }

  showContextualSearchModal(collectionId: any): void {
    const customCollectionDataSource = new CustomServerDataSource(this.http);
    customCollectionDataSource.setCollectionId(collectionId);
    customCollectionDataSource.setSearch(this.keyword);
    const modalOptions: ModalOptions = {
      class: 'large-modal',
      backdrop: 'static',
      initialState: {
        detailsTitle: this.translate.get(`localizationResource.common.${collectionId}.longLabel`),
        selectedItemList: [collectionId],
        selectedItem: collectionId,
        settings: this.settings,
        dataSourceList: this.dataSourceList,
        'customCollectionDataSource': customCollectionDataSource,
        isCollectionReady: this.isCollectionReady
      }
    };
    this._modalService.show(DetailsModal, modalOptions);
  }

  navigateToEntityPage(selectedRow: any) {
    if (selectedRow.data.collectionId === 'contract' || selectedRow.data.collectionId === 'organization') {
      this.routingService.data.selectedEntity = selectedRow.data;
      this.routingService.data.settings = this.settings;
      this.routingService.entityResult();
      let linkEntity = ['pages/entityFile'];
      this.router.navigate(linkEntity);
    } else if (selectedRow.data.collectionId === 'membership-insured') {
      this.routingService.data.selectedInsured = selectedRow.data;
      this.routingService.data.settings = this.settings;
      let linkInsured = ['pages/insuredFile'];
      this.router.navigate(linkInsured);
    } else if (selectedRow.data.collectionId === 'policy-ident') {
      let links = selectedRow.data.links.filter(link => link.rel === 'self');
      let url = links[0]['href']
      this.collectionDetails.loadDetails(selectedRow.data.collectionId, url)
        .subscribe(
          collectionDetails => {
            this.routingService.data = {
              'isView': true,
              'contract': collectionDetails[selectedRow.data.collectionId][0]['data']
            };
            this.routingService.detailResult();
            this.router.navigate(['pages/contractDetails']);
          },
          error => this.errorMessage = <any>error
        );
    } else if (selectedRow.data.collectionId === 'agreement') {
      let links = selectedRow.data.links.filter(link => link.rel === 'self');
      let url = links[0]['href']
      let collectionId = selectedRow.data.collectionId;

      this.collectionDetails.loadDetails(selectedRow.data.collectionId, url)
        .subscribe(
          collectionDetails => {
            this.routingService.detailResult();
            this.routingService.data.judicalEntityDetails = this.routingService.data.judicalEntityDetails;

            this.routingService.data.agreementDetails = collectionDetails[selectedRow.data.collectionId][0];
            let agreementBuid = collectionDetails[selectedRow.data.collectionId][0]['data'].BUID;
            if (collectionDetails[collectionId][0]['context']['juridical-entity']['juridical-entity_id']) {
              let urlJuridical = KeycloakService.auth.apiUrl + '/collections/juridical-entity/' + collectionDetails[collectionId][0]['context']['juridical-entity']['juridical-entity_id'];
              this.collectionDetails.loadDetails('juridical-entity', urlJuridical)
                .subscribe(
                  collectionDetailsJuridical => {
                    this.routingService.data.judicalEntityDetails = collectionDetailsJuridical['juridical-entity'][0];
                    if (collectionDetails[collectionId][0]['context']['thirdParty']['juridical-entity_id']) {
                      let urlThirdParty = KeycloakService.auth.apiUrl + '/collections/juridical-entity/' + collectionDetails[collectionId][0]['context']['thirdParty']['juridical-entity_id'];
                      this.collectionDetails.loadDetails('juridical-entity', urlThirdParty)
                        .subscribe(
                          collectionDetailsThirdParty => {
                            let filters = [];
                            filters.push({
                              "field": "context.previousVersion.agreement_id", "value": agreementBuid, "type": "string", "operator": "$eq"
                            });
                            this.mongoSearchService.loadCollections(filters, 'agreement', null)
                              .subscribe(response => {
                                let lastVersion = false;
                                if (response['agreement'] && response['agreement'].length > 0) {
                                  lastVersion = false;
                                } else {
                                  lastVersion = true;
                                }
                                this.routingService.data.thirdPartyDetails = collectionDetailsThirdParty['juridical-entity'][0];
                                let routedAgreement = collectionDetails[collectionId][0];
                                this.showAgreement(routedAgreement, lastVersion);
                              });
                          },
                          error => this.errorMessage = <any>error
                        );
                    } else {
                      console.log('No found ThirdParty');
                      this.router.navigate(['pages/agreements', agreementBuid]);
                    }
                  },
                  error => this.errorMessage = <any>error
                );
            } else {
              console.log('No found Juridical-entity');
              this.router.navigate(['pages/agreements', agreementBuid]);
            }
          },
          error => this.errorMessage = <any>error
        );

    }
  }

  showAgreement(routedAgreement: any, lastVersion: boolean) {
    this.routingService.data = {
      'isView': true,
      'isCreate': false,
      'isUpdate': false,
      'isVersion': false,
      'isLastVersion': lastVersion,
      'agreement': routedAgreement['data']
    };
    this.router.navigate(['pages/agreementDetails']);
  }

  getSettings(collection: any) {
    for (let key in (this.settings[collection].columns)) {
      let title = this.translate.instant((this.settings[collection].columns)[key].titleCode);
      (this.settings[collection].columns)[key].title = title;
    }
    return this.settings[collection];
  }

  getLimitedSettings(collection: any) {
    for (let key in (this.limitedSettings[collection].columns)) {
      let title = this.translate.instant((this.limitedSettings[collection].columns)[key].titleCode);
      (this.limitedSettings[collection].columns)[key].title = title;
    }
    this.limitedSettings[collection].filter = false;
    return this.limitedSettings[collection];
  }

}
