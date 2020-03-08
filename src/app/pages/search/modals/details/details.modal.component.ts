import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RoutingService, CollectionDetailsService, MongoSearchService } from '../../../../theme';
import { BaMenuService } from '../../../../theme/services';
import { CustomServerDataSource } from '../../custom.data-source';
import { KeycloakService } from '../../../../../keycloak/keycloak.service';

@Component({
  selector: 'search-details-modal',
  styleUrls: ['details.modal.scss'],
  providers: [CustomServerDataSource],
  templateUrl: 'details.modal.html'
})

export class DetailsModal implements OnInit {

  @Input() detailsTitle: string;
  @Input() modalHeader: any;
  public settings: any = {};
  public dataSourceList: any = {};
  customCollectionDataSource: any;
  public errorMessage: string;
  public keyword: string;
  public selectedItemList: any[];
  private isCollectionReady: boolean = false;

  constructor(private activeModal: BsModalRef, private translate: TranslateService, 
    private collectionDetails: CollectionDetailsService,
    private router: Router, private routingService: RoutingService, private _service: BaMenuService,
    private mongoSearchService: MongoSearchService) {
  }

  ngOnInit() {
    // if (this.customCollectionDataSource){
    //   new Observable<boolean>( observer => {
    //     this.customCollectionDataSource.getCollectionReady().subscribe(response => {
    //       // this.isCollectionReady = this.customCollectionDataSource.getCollectionReady();
    //     });
    //   });
    // }
  }

  closeModal() {
    this.activeModal.hide();
  }

  getSettings(collection: any) {
    for (let key in (this.settings[collection].columns)) {
      let title = this.translate.instant((this.settings[collection].columns)[key].titleCode);
      (this.settings[collection].columns)[key].title = title;
    }
    return this.settings[collection];
  }

  navigateToEntityPage(selectedRow: any) {
    let menuItem: Array<any> = new Array<any>();
    menuItem.push({
      selected: true,
      title: "localizationResource.common." + selectedRow.data.collectionId + ".longLabel"
    });
    this._service.selectMenuItem(menuItem);


    if (selectedRow.data.collectionId === 'contract' || selectedRow.data.collectionId === 'organization') {
      this.routingService.data.selectedEntity = selectedRow.data;
      this.routingService.data.settings = this.settings;
      this.routingService.entityResult();
      let linkEntity = ['pages/entityFile'];
      this.router.navigate(linkEntity);
    } else if (selectedRow.data.collectionId === 'membership-insured') {
      this.routingService.data.selectedInsured = selectedRow.data;
      this.routingService.data.settings = this.settings;
      this.routingService.insuredResult();
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
    this.activeModal.hide();
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

    this.redirectTo('pages/agreementDetails');
  }

  redirectTo(uri: string) {
    // Fix to reload the current route - redirect to not existing url and right after that to the same.
    // because such '/dummyRefresh' address doesn't exist in the routing we haven't delays in the process.
    //
    // In Angular 5.1 there is a supported technique for route reloading.
    // This can be done using the onSameUrlNavigation configuration option as part of the built-in Angular router.
    // See https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2
    // But in our case this way causes side problems that are difficult to fix like:
    // (broken and not working search field, disappeared parameters and so on)
    this.router.navigateByUrl('/dummyRefresh', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
