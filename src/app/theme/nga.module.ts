import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MyDatePickerModule } from 'mydatepicker';
// import { NgxEchartsModule } from 'ngx-echarts';
import { TabsModule } from 'ngx-bootstrap/tabs';

import {
  BaThemeConfig
} from './theme.config';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

import {
  //   FormatterAmount,
  //   BaBackTop,
  //   BaContentTop,
  BaCard,
  //   BaCard2,
  //   BaEChartFree,
  //   BaMenuItem,
  //   BaMenu,
  //   BaMsgCenter,
  //   BaPageTop,
  //   BaSidebar,
  //   SelectItems,
  //   SearchItems,
  //   TranslateCustomLoader,
  //   CustomCard,
  //   CardDetails,
  //   PageHeaderComponent,
  //   AppendiceCardDetails,
  //   PostalAddressHeaderComponent,
  //   PostalAddressBodyComponent,
  //   PostalAddressListComponent,
  //   CollectionDetails,
  //   AppendiceDetails,
  //   AppendiceHeaderComponent,
  //   Vignette,
  //   SubHeader,
  //   NotificationComponent,
  //   MonitoringComponent,
  //   MultiMonitoringComponent,
  //   ChronoTaskComponent,
  //   //dashboard free
  //   PortfolioExchangesFree,
  //   SynthesisInvestmentsFree,
  //   AgeStructureFree,
  //   ContractIndicatorFree,
  //   SynthesisExchangesFree,
  //   XchangeManagerTableFree,
  //   NbReceivedFilesFree,
  //   IntegratedFileProcessingFree,
  //   HoverTableFree,
  //   FinancialReportingFree,
  //   NbrContractsFree,
  //   DateFilterFree,
  //   BreakdownOfPensionBenefitsFree,
  //   ContributionsAndHealthRetirementPerQuarterFree,
  //   BreakdownOfReimbursementsByFamilyOfActsFree,
  //   ContributionsAndHealthBenefitsPerQuarterFree,
  //   PyramidFree,
  //   DemographyExchangesFree,
  //   ComponentDynamicEdit,
  //   ComponentDynamicList,
  //   DynamicCardListComponent,
  //   DynamicCardListCard,
  //   DynamicCardManageComponent,
  //   DynamicCardManageCard,
  //   DynamicCardManageCard2,
  //   BaCollectionDetails,
  //   BaCardDetails,
  //   ManageElementList,
  //   ManageElementListCardDetails,
  //   RejectionByTypology,
  //   DynamicCardCustomComponent,
  //   ///

  //   AddRemoveTableComponent,

  //   PeriodDetails,
  //   // Generic components
  //   ExpandCollapseComponent,
  //   PanelViewComponent,
  //   EntityViewTableComponent,
  //   ViewTableComponent,
  //   TreeViewComponent,
  //   TreeNodeComponent,
  //   TreeExplorerComponent,
  AddRemoveListComponent,
  CardContainerComponent,
  CardDetailComponent,
  //   // SimpleInputsComponent,
  SimpleInputComponent,
  ContentContainerComponent,
} from './components';

// import { CardContainerComponent } from './../theme/components/cardContainer';
// import { CardDetailComponent } from './../theme/components/cardDetail';
// import { SimpleInputComponent } from './../theme/components/SimpleInput';
// import { ContentContainerComponent } from './../theme/components/contentContainer';


import { BaCardBlur } from './components/baCard/baCardBlur.directive';
// import { CustomCardBlur } from './components/customCard/customCardBlur.directive';
// import { BaCardBlur2 } from './components/baCard2/baCardBlur2.directive';

// import {
//   BaScrollPosition,
//   BaSlimScroll,
//   BaThemeRun,
// } from './directives';

import {
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  KeysPipe,
  ReplaceSpecialCarPipe,
  MyCurrencyPipe,
  OrderBy
} from './pipes';

import {
  // BaImageLoaderService,
  // BaMenuService,
  // BaThemePreloader,
  // BaThemeSpinner,
  JsonPath,
  // ConfigLoaderService,
  // TranslationLoaderService,
  // UserPerfsService
} from './services/jsonPath';

import { CollectionService } from './components/cardDetail/collectionService';

const NGA_COMPONENTS = [
  // FormatterAmount,
  // BaBackTop,
  // BaContentTop,
  BaCard,
  // BaCard2,
  // BaEChartFree,
  // BaMenuItem,
  // BaMenu,
  // BaMsgCenter,
  // BaPageTop,
  // BaSidebar,
  // SelectItems,
  // SearchItems,
  // CustomCard,
  // CardDetails,
  // PageHeaderComponent,
  // AppendiceCardDetails,
  // PostalAddressHeaderComponent,
  // PostalAddressBodyComponent,
  // PostalAddressListComponent,
  // CollectionDetails,
  // AppendiceDetails,
  // AppendiceHeaderComponent,
  // Vignette,
  // SubHeader,
  // NotificationComponent,
  // MonitoringComponent,
  // MultiMonitoringComponent,
  // ChronoTaskComponent,

  // PortfolioExchangesFree,
  // SynthesisInvestmentsFree,
  // AgeStructureFree,
  // ContractIndicatorFree,
  // SynthesisExchangesFree,
  // XchangeManagerTableFree,
  // NbReceivedFilesFree,
  // IntegratedFileProcessingFree,
  // HoverTableFree,
  // FinancialReportingFree,
  // NbrContractsFree,
  // DateFilterFree,
  // BreakdownOfPensionBenefitsFree,
  // ContributionsAndHealthRetirementPerQuarterFree,
  // BreakdownOfReimbursementsByFamilyOfActsFree,
  // ContributionsAndHealthBenefitsPerQuarterFree,
  // PyramidFree,
  // DemographyExchangesFree,
  // RejectionByTypology,
  // //
  // ComponentDynamicEdit,
  // ComponentDynamicList,

  // DynamicCardListComponent,
  // DynamicCardListCard,
  // DynamicCardManageComponent,
  // DynamicCardManageCard,
  // DynamicCardManageCard2,
  // DynamicCardCustomComponent,

  // BaCollectionDetails,
  // BaCardDetails,
  // ManageElementList,
  // ManageElementListCardDetails,

  // AddRemoveTableComponent,

  // PeriodDetails,
  // // Generic components
  // ExpandCollapseComponent,
  // PanelViewComponent,
  // EntityViewTableComponent,
  // TreeViewComponent,
  // TreeNodeComponent,
  // TreeExplorerComponent,
  // ViewTableComponent,
  AddRemoveListComponent,
  CardContainerComponent,
  CardDetailComponent,
  SimpleInputComponent,
  ContentContainerComponent,
];

const NGA_DIRECTIVES = [
  // BaScrollPosition,
  // BaSlimScroll,
  // BaThemeRun,
  BaCardBlur,
  // BaCardBlur2,
  // CustomCardBlur
];

const NGA_PIPES = [
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  KeysPipe,
  ReplaceSpecialCarPipe,
  MyCurrencyPipe,
  OrderBy
];

const NGA_SERVICES = [
  // BaImageLoaderService,
  // BaThemePreloader,
  // BaThemeSpinner,
  // BaMenuService,
  TranslateService,
  // ConfigLoaderService,
  // TranslationLoaderService,
  // UserPerfsService,
  CollectionService,
  JsonPath
];

const NGA_VALIDATORS = [];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    MyDatePickerModule,
    Ng2SmartTableModule,
    // NgxEchartsModule,
    TabsModule,
    TabsModule.forRoot()
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
