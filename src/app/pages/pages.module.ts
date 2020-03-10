import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import {
  // RoutingService,
  // SearchService,
  // CollectionDetailsService,
  // NotificationService,
  // MonitoringService,
  // //dashboard
  // PortfolioExchangesService,
  // XchangeManagerService,
  // SynthesisInvestmentsService,
  // SynthesisExchangesService,
  // PyramidService,
  // BreakdownOfPensionBenefitsService,
  // ContributionsAndHealthRetirementPerQuarterService,
  // AgeStructureService,
  // BreakdownOfReimbursementsByFamilyOfActsService,
  // ContributionsAndHealthBenefitsPerQuarterService,
  // ContractIndicatorService,
  // NbReceivedFilesService,
  // IntegratedFileProcessingService,
  // BasicTablesService,
  // FinancialReportingService,
  // DemographyExchangesService,
  // RejectionByTypologyService,
  // MongoSearchService,
  // FillComboBoxService,
  // JsonListService,
  // MultiprService,
  ////////////////
} from '../theme';
import { Pages } from './pages.component';
import { SearchComponent, SearchModule } from './search';
// import { EntityFileModule } from './entityFile';
// import { InsuredFileModule } from './insuredFile';

import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DetailsModal } from './search/modals/details/details.modal.component';
// import { ConfirmCancelModal } from './agreementNew/modals/confirm-cancel/confirm-cancel.modal.component';
// import { InfoModal } from './agreementNew/modals/info/info.modal.component';
// import { TreeManager } from '../theme/components/treeView/treeManager';
// import { TreeNodeManager } from '../theme/components/tree/treeNode/treeNodeManager';
// import { AlertModal, CancelModal } from '../theme/components/modals';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    ModalModule.forRoot(),
    TranslateModule,
    TabsModule.forRoot(),
    routing,
    Ng2SmartTableModule,
    SearchModule,
    // EntityFileModule,
    // InsuredFileModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Pages,
    DetailsModal,
    // ConfirmCancelModal,
    // InfoModal,
    // AlertModal,
    // CancelModal
  ],
  entryComponents: [
    DetailsModal,
    // ConfirmCancelModal,
    // InfoModal,
    // AlertModal,
    // CancelModal
  ],
  providers: [
    // RoutingService,
    // SearchService,
    SearchComponent,
    // CollectionDetailsService,
    // NotificationService,
    // MonitoringService,
    // //dashboard
    // PortfolioExchangesService,
    // XchangeManagerService,
    // SynthesisInvestmentsService,
    // SynthesisExchangesService,
    // PyramidService,
    // BreakdownOfPensionBenefitsService,
    // ContributionsAndHealthRetirementPerQuarterService,
    // AgeStructureService,
    // BreakdownOfReimbursementsByFamilyOfActsService,
    // ContributionsAndHealthBenefitsPerQuarterService,
    // ContractIndicatorService,
    // NbReceivedFilesService,
    // IntegratedFileProcessingService,
    // BasicTablesService,
    // FinancialReportingService,
    // DemographyExchangesService,
    // JsonListService,
    // RejectionByTypologyService,
    // /////////////
    // MongoSearchService,
    // FillComboBoxService,
    // TreeNodeManager,
    // TreeManager,
    // MultiprService
  ]
})
export class PagesModule {
}
