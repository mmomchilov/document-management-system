import { Component, OnInit, ChangeDetectorRef, DoCheck, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
// import { RoutingService, CollectionDetailsService } from '../../theme/services';
// import { BaMenuService } from '../../theme';
// import { GlobalState } from '../../global.state';
// import { AppState } from '../../app.service';
import { ValidationComponent } from '../common/components/common/validation';
import { DocumentsConfig } from './cardsConfig/documentsConfig/documentsConfigCard';
import { CardConfiguration } from '../../theme/components/cardDetail/configurationClasses/cardConfiguration';
import { Subscription } from 'rxjs';
// import { PartnerInfoService } from 'app/theme/services/partnerInfo';
import { UtilCharts } from './cardsConfig/documentsConfig/utilCharts';
import { FiltersDocumentConfig } from './cardsConfig/filtersDocument/filtersDocumentConfig';
import { RadioSectionConfig } from './cardsConfig/radioSectionConfig/radioSectionConfig';
import { CollectionDetailsService } from 'src/app/theme/services';

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers: [CollectionDetailsService]

})
export class DocumentsComponent extends ValidationComponent implements OnInit, DoCheck, OnDestroy {
  database = 'database'; // agreement
  collectionId = 'cards'; //
  collection = {}; // ??
  juridicalEntity: any;
  private juridicalCache: any = [];
  title: any = '';
  private navTitle: string = '';
  private navTitleLabel: string = undefined;
  private navTitleEntityCode: string = undefined;
  private subscription: Subscription;
  configs: CardConfiguration[] = [];
  buttons: any;
  currentYearOption = (new Date()).getFullYear();
  currentRiskBearerId: any = 'All';
  thisMonth = (new Date()).getMonth() + 1;
  strThisMonth = (`0${this.thisMonth}`).slice(-2);
  thisDay = (new Date()).getDate();
  strThisDay = (`0${this.thisDay}`).slice(-2);
  selectedTab = 'documentsSelector';
  riskCarrierOptions: any = [];
  subscribed = {};
  documents;

  constructor(// private routing: RoutingService,
    private router: Router, protected translate: TranslateService,
    private fb: FormBuilder, private ref: ChangeDetectorRef,
    // public detailService: CollectionDetailsService, private baMenuService: BaMenuService,
    // private _appState: AppState, private _state: GlobalState, private partnerInfoService: PartnerInfoService
    private collectionDetails: CollectionDetailsService) {
    super(translate);

    // if (this.routing.data.juridicalEntity) {
    //   this.juridicalEntity = this.routing.data.juridicalEntity;

    //   this.subscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //     this.manageTitle();
    //     UtilCharts.translateMonths(this.translate);
    //     UtilCharts.translateTitlesList(this.translate);
    //     UtilCharts.translateInfinity(this.translate);
    //     UtilCharts.translateLegendList(this.translate);
    //     UtilCharts.translateHealthTable1Columns(this.translate);
    //     UtilCharts.translateRPTable1Columns(this.translate);
    this.setCardsConfig();
    //   });

    //   if (this._appState) {
    //     const juridicalsConfig = this._appState.get('config.juridicals');
    //     if (juridicalsConfig) {
    //       this.updateJuridicalCache(juridicalsConfig);
    //     }
    //     var juConfig = (config) => {
    //       this.updateJuridicalCache(config);
    //     }
    //     this._state.subscribe('config.juridicals', 'monitoringJUConf', juConfig);
    //     this.subscribed['config.juridicals'] = 'monitoringJUConf';
    //     var filter = (config) => {
    //       this.currentYearOption = config.year === 'All' ? UtilCharts.thisYear : config.year;
    //       this.currentRiskBearerId = config.riskBearerId;
    //       this.setCardsConfig();
    //     }
    //     this._state.subscribe('edi.filter', 'monitoringFilter', filter);
    //     this.subscribed['edi.filter'] = 'monitoringFilter';
    //   }

    // } else { this.router.navigate(['pages/partner']); }

  }

  ngOnInit() {

    this.documents = this.collectionDetails.loadDetails('collectionId', 'url');
    console.log('collectionDetails', this.documents);
    // .subscribe(
    //   collectionDetails => {
    //     console.log('collectionDetails', collectionDetails);
    //     //  this.showPartner(collectionDetails[collectionId][0], true);
    //   }
    // );
    // if (this.routing.data.navTitle) {
    //   this.navTitle = this.routing.data.navTitle;
    // }
    //  this.initDisplayButtons();
    // if (this.juridicalEntity) {
    //   this.manageTitle();
    UtilCharts.translateMonths(this.translate);
    UtilCharts.translateTitlesList(this.translate);
    UtilCharts.translateInfinity(this.translate);
    //   UtilCharts.translateLegendList(this.translate);
    UtilCharts.translateHealthTable1Columns(this.translate);
    UtilCharts.translateRPTable1Columns(this.translate);
    this.setFormGroup(this.fb.group({}));
    // console.log('formGroup formGroup formGroup', this.formGroup);
    // this.riskCarrierOptions = this.routing.data.riskCarrierOptions;
    this.setCardsConfig();
    // } else { this.router.navigate(['pages/partner']); }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // Object.keys(this.subscribed).forEach(eventId => {
    //   this._state.unsubscribe(eventId, this.subscribed[eventId]);
    // });
  }

  ngDoCheck() {
    this.ref.detectChanges();
  }

  initDisplayButtons() {
    this.buttons = {
      'showBackButton': true
    };
  }

  private getTitle(entityCode: string): string {
    const titleOnly: string = `localizationResource.common.documents.shortLabel`;
    return titleOnly;
  }

  private getJuridicalEntityCode() {
    return this.juridicalEntity ? this.juridicalEntity.code : '';
  }

  private updateJuridicalCache(config: any) {
    this.juridicalCache = [];
    for (const juridical of config) {
      this.juridicalCache.push({
        code: juridical._id,
        display: juridical.legalName
      });
    }
  }

  private setCardsConfig() {
    this.loadChartData1('this.routing.data.juridicalEntity.BUID');
    // }

    // goBack() {
    //   this.router.navigate([this.routing.previousUrl]);
    // }

    // private manageTitle() {
    //   const item = Object.assign({}, this.baMenuService.getCurrentItem());
    //   const entityCode = this.getJuridicalEntityCode();
    //   const titleLabel = this.getTitle(entityCode);

    //   if (this.routing.data.navTitle || this.navTitleLabel) {
    //     this.navTitleLabel = this.routing.data.navTitleLabel;
    //     this.navTitleEntityCode = this.routing.data.navTitleEntityCode;
    //     this.routing.data.navTitle = undefined;
    //   }
    //   if (this.navTitleLabel) {
    //     item.title = `${this.translate.instant(this.navTitleLabel)} ${this.navTitleEntityCode}`;
    //     this.title = titleLabel;
    //   } else {
    //     item.title = titleLabel;
    //   }
    //   this._state.notifyDataChanged('menu.activeLink', item);
  }

  loadChartData1(buId: string) {
    const actionsLst = ['CA', 'settlement', 'commission', 'healthitems', 'risksettlements',
      'calculatedRemunerations', 'heatlthSettlementsFiscalYear'];
    const riskTypeLst = ['risk', 'health'];
    const claimRiskTypeLst = ['incapcty', 'disablty', 'death'];
    const resultsLst = ['RiskAndProtectTable1'];
    const actionsResultsLst = actionsLst.concat(resultsLst);
    let toDate;
    const fromDate = `${this.currentYearOption - 2}-01-01T00:00:00Z`;
    if (this.currentYearOption === UtilCharts.thisYear) {
      toDate = `${this.currentYearOption}-${UtilCharts.strThisMonth}-${UtilCharts.strThisDay}T00:00:00Z`;
    } else { toDate = `${this.currentYearOption}-12-31T00:00:00Z`; }

    // const filters = {
    //   'riskCarrier': this.currentRiskBearerId,
    //   'from': fromDate,
    //   'to': toDate,
    //   'year': this.currentYearOption,
    //   'unitTime': 'month',
    //   'actions': ['All']
    // };
    // console.log('filters', filters);
    // this.partnerInfoService.loadCollections(filters, `/partner/keys/${buId}`)
    //   .subscribe(
    //     response => {
    //       console.log('response', response);
    const results = {
      currentYearOption: this.currentYearOption
    };
    const optionalParams = {};
    for (const curAction of actionsResultsLst) {
      results[curAction] = {};

      //         switch (curAction) {
      //           case 'CA':
      //           case 'settlement':
      //             for (const riskType of riskTypeLst) {
      //               const curActionResult = UtilCharts.checkPartnerResponse(response[curAction]) ? // check if any result
      //                 UtilCharts.getValuesByMonthAction(response, curAction, riskType) :
      //                 [UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit];
      //               results[curAction][riskType] = curActionResult;
      //             }
      //             break;
      //           case 'healthitems': {
      //             const healthData = response[curAction];
      //             results[curAction] = healthData;
      //             this.setBoundaries(curAction, healthData, optionalParams);
      //           }
      //             break;
      //           case 'risksettlements': {
      //             for (const riskType of claimRiskTypeLst) {
      //               const curActionResult = UtilCharts.checkPartnerResponse(response[curAction]) ? // check if any result
      //                 UtilCharts.getValuesByMonthClaimFldRisk(response, curAction, riskType) :
      //                 UtilCharts.valByMonthsInit;
      //               results[curAction][riskType] = curActionResult;
      //             }
      //           }
      //             break;
      //           case 'RiskAndProtectTable1': {
      //             // to do - move getTableResults to the backend
      //             results[curAction] = this.getTableResults(response.RiskAndProtectTable1, this.currentYearOption);

      //           }
      //             break;
      //           case 'commission': {
      //             const curActionResult =
      //               UtilCharts.checkPartnerResponse(response[curAction]) ? // check if any result
      //                 UtilCharts.getValuesByMonthAction(response, curAction, undefined) :
      //                 [UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit];
      //             results[curAction] = curActionResult;
      //           }
      //             break;
      //           case 'calculatedRemunerations': {
      //             const curActionResult =
      //               UtilCharts.checkPartnerResponse(response[curAction]) ? // check if any result
      //                 UtilCharts.getValuesByMonthAction(response, curAction, undefined) :
      //                 [UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit];
      //             results[curAction] = curActionResult;
      //           }
      //             break;
      //           case 'heatlthSettlementsFiscalYear': {
      //             const curActionResult =
      //               UtilCharts.checkPartnerResponse(response[curAction]) ? // check if any result
      //                 UtilCharts.getValuesByMonthAction(response, curAction, undefined) :
      //                 [UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit, UtilCharts.valByMonthsInit];
      //             results[curAction] = curActionResult;
      //           }
      //             break;
      //           default:
      //             // default block statement;
      //             break;
    }
    //       }
    // console.log('results!', results);
    //       this.configs =
    //         [DocumentsConfig.generateCard(results, optionalParams, this.selectedTab, this.translate)];
    //       console.log('this.configs', this.configs);
    //     });

    results['RiskAndProtectTable1'] =
      [{
        riskFamily: "Incapacity",
        srvcType: "Medical Fees",
        clmFldrNbr: 0,
        clmFldrNbr1: 6,
        opndClmFldrNbr: 12,
        sttlmntFldrNbr: 44,
        sttlmntFldrNbr1: 6,
        beneficiaryNbr: 22,
        beneficiaryNbr1: 6,
        paidAmount: 0,
        paidAmount1: 6823.389999999999,
        avrgCost: 77,
        avrgDuration: 6
      }];


    this.configs =
      [FiltersDocumentConfig.generateCard(results, {}, this.selectedTab, this.translate),
      DocumentsConfig.generateCard(results, {}, this.selectedTab, this.translate),
      RadioSectionConfig.generateCard(results, {}, this.selectedTab, this.translate)];



    // console.log('this.configs', this.configs);

  }

  setBoundaries(curAction, healthData, optionalParams) {
    if (healthData.length > 1) {
      const propName = 'totalDelegatePayment';
      const sortedListByAmcSettlement = healthData.sort((a, b) => (a[propName] > b[propName]) ? 1 : -1);
      optionalParams[curAction] = {
        boundaries: {
          min: sortedListByAmcSettlement[0][propName],
          max: sortedListByAmcSettlement[sortedListByAmcSettlement.length - 1][propName]
        }
      };
    }
  }
  tabsChange(event) {
    this.selectedTab = event;
  }

  makeTableData(curYearResults, lastYearResults, claimFldRiskType) {
    const data = [];
    const claimFldRiskTypeKeysList = Object.keys(claimFldRiskType);
    for (const obj of claimFldRiskTypeKeysList) {
      for (const sType of claimFldRiskType[obj]) {
        const thisYearResult = curYearResults[0] ? curYearResults[0].data.filter(el =>
          el.claimFldRisk === obj && el.claimFldType === sType) : {};
        const prevYearResult = lastYearResults[0] ? lastYearResults[0].data.filter(el =>
          el.claimFldRisk === obj && el.claimFldType === sType) : {};

        data.push({
          'riskFamily': this.translate.instant(`localizationEnumValue.portfolio.typerisk.${obj}.label`),
          'srvcType': this.translate.instant(`localizationEnumValue.portfolio.substtlmntfldr.${sType}.label`),
          'clmFldrNbr': thisYearResult[0] ? thisYearResult[0].claimFldNb : 0,
          'clmFldrNbr1': prevYearResult[0] ? prevYearResult[0].claimFldNb : 0, // last year
          'opndClmFldrNbr': thisYearResult[0] ? thisYearResult[0].openedClaimFldNb : 0,
          'sttlmntFldrNbr': thisYearResult[0] ? thisYearResult[0].settlementFldNb : 0,
          'sttlmntFldrNbr1': prevYearResult[0] ? prevYearResult[0].settlementFldNb : 0, // last year
          'beneficiaryNbr': thisYearResult[0] ? thisYearResult[0].beneficiaryFldNb : 0,
          'beneficiaryNbr1': prevYearResult[0] ? prevYearResult[0].beneficiaryFldNb : 0, // last year
          'paidAmount': thisYearResult[0] ? thisYearResult[0].totalDisbursementAmount : 0,
          'paidAmount1': prevYearResult[0] ? prevYearResult[0].totalDisbursementAmount : 0, // last year

          'avrgCost': this.averageAnualCost(thisYearResult[0] ? thisYearResult[0].totalDisbursementAmount : 0,
            thisYearResult[0] ? thisYearResult[0].claimFldNb : 0),
          'avrgDuration': this.averagDuration([thisYearResult[0] ? thisYearResult[0].avrgDuration : 0,
          prevYearResult[0] ? prevYearResult[0].avrgDuration : 0])
        });
      }
    }
    // console.log('data', data);
    return data;
  }
  averageAnualCost(paidAmount, clmFldrNbr) { return clmFldrNbr === 0 ? 0 : paidAmount / clmFldrNbr; } // ?? formula fix
  averagDuration(avrgDurationsList) {
    const filteredDdurations = avrgDurationsList.filter(el => el !== 0);
    const res = filteredDdurations.reduce((acc, cur) => acc + cur, 0) / filteredDdurations.length;
    return res;
  }

  makecombinations(results, claimFldRiskType) {
    if (results[0] && results[0].data) {
      for (const obj of results[0].data) {
        claimFldRiskType[obj.claimFldRisk] = [];
        for (const obj1 of results[0].data.filter(el => el.claimFldRisk === obj.claimFldRisk)) {
          if (claimFldRiskType[obj.claimFldRisk].includes(obj1.claimFldType)) { } else {
            claimFldRiskType[obj.claimFldRisk].push(obj1.claimFldType);
          }
        }
      }
    }
    return claimFldRiskType;
  }

  getTableResults(items, selectedYear) {
    const curYearResults = items.filter(result => result.year === selectedYear);
    const lastYearResults = items.filter(result => result.year === selectedYear - 1);

    const claimFldRiskTypeTmp = this.makecombinations(curYearResults, {});
    const claimFldRiskType = this.makecombinations(lastYearResults, claimFldRiskTypeTmp);

    return this.makeTableData(curYearResults, lastYearResults, claimFldRiskType);
  }

  getDurationDays(dateTo, dateFrom) {
    return ((new Date(dateTo).valueOf() - new Date(dateFrom).valueOf()) / (1000 * 3600 * 24));
  }
}
