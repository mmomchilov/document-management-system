import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/pages/homeFree/homeFree.module#HomeFreeModule' },
      { path: 'search', loadChildren: 'app/pages/search/search.module#SearchModule' },
      { path: 'notification', loadChildren: 'app/pages/allNotification/allNotification.module#AllNotificationModule' },
      { path: 'transferCession/:viewContext', loadChildren: 'app/pages/transferCession/transferCession.module#TransferCessionModule' },
      { path: 'contractDetails', loadChildren: 'app/pages/policy-ident/contractDetails/contractDetails.module#ContractDetailsModule' },
      { path: 'updateContractDetails', loadChildren: 'app/pages/policy-ident/contractDetails/contractDetails.module#ContractDetailsModule' },
      { path: 'policy', loadChildren: 'app/pages/policy-ident/contractsList/contractsList.module#ContractsListModule' },
      { path: 'rejection/:viewContext', loadChildren: 'app/pages/rejection/rejection.module#RejectionModule' },
      { path: 'e52e7ce4ac2458867d05eaad577560db', loadChildren: 'app/pages/administration/administration.module#AdministrationModule' },
      { path: 'maintenance6', loadChildren: 'app/pages/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'entityFile', loadChildren: 'app/pages/entityFile/entityFile.module#EntityFileModule' },
      { path: 'insuredFile', loadChildren: 'app/pages/insuredFile/insuredFile.module#InsuredFileModule' },
      { path: 'maintenance', loadChildren: 'app/pages/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'maintenance2', loadChildren: 'app/pages/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'maintenance3', loadChildren: 'app/pages/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'maintenance4', loadChildren: 'app/pages/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'maintenance5', loadChildren: 'app/pages/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'extractData', loadChildren: 'app/pages/extractData/extractData.module#ExtractDataModule' },

      { path: 'messageConfig', loadChildren: 'app/pages/messageConfiguration/messageConfigurationList/messageConfigurationList.module#MessageConfigurationListModule' },
      { path: 'messageConfigurationDetails', loadChildren: 'app/pages/messageConfiguration/messageConfiguraitonDetails/messageConfigurationDetails.module#MessageConfigurationDetailsModule' },
      { path: 'updateMessageConfigurationDetails', loadChildren: 'app/pages/messageConfiguration/messageConfiguraitonDetails/messageConfigurationDetails.module#MessageConfigurationDetailsModule' },
      { path: 'applicationManagement', loadChildren: 'app/pages/messageConfiguration/messageConfiguraitonDetails/applicationManagementList/applicationManagementList.module#ApplicationManagementListModule' },
      { path: 'applicationManagementDetails', loadChildren: 'app/pages/messageConfiguration/messageConfiguraitonDetails/applicationManagementDetails/applicationManagementDetails.module#ApplicationManagementDetailsModule' },
      { path: 'updateApplicationManagementDetails', loadChildren: 'app/pages/messageConfiguration/messageConfiguraitonDetails/applicationManagementDetails/applicationManagementDetails.module#ApplicationManagementDetailsModule' },
      { path: 'multiprDefinition', loadChildren: 'app/pages/multiprDefinition/multiprDefinitionList/multiprDefinitionList.module#MultiprDefinitionListModule' },
      { path: 'multiprDefinitionDetails', loadChildren: 'app/pages/multiprDefinition/multiprDefinitionDetails/multiprDefinitionDetails.module#MultiprDefinitionDetailsModule' },
      { path: 'updateMultiprDefinitionDetails', loadChildren: 'app/pages/multiprDefinition/multiprDefinitionDetails/multiprDefinitionDetails.module#MultiprDefinitionDetailsModule' },
      { path: 'compensations', loadChildren: 'app/pages/compensations/compensations.module#CompensationsModule' },
      { path: 'agreementsNew', loadChildren: 'app/pages/agreementNew/agreementsList/agreementsList.module#AgreementsListModule' },
      { path: 'juridicalEntity', loadChildren: 'app/pages/juridicalEntity/juridicalEntityList/juridicalEntityList.module#JuridicalEntityListModule' },
      { path: 'agreementAppendice', loadChildren: 'app/pages/agreementNew/agreementAppendice/agreementAppendice.module#AgreementAppendiceModule' },
      { path: 'agreementDetails', loadChildren: 'app/pages/agreementNew/agreementDetails/agreementDetails.module#AgreementDetailsModule' },
      { path: 'juridicalEntityDetails', loadChildren: 'app/pages/juridicalEntity/juridicalEntityDetails/juridicalEntityDetails.module#JuridicalEntityDetailsModule' },
      { path: 'updateJuridicalEntityDetails', loadChildren: 'app/pages/juridicalEntity/juridicalEntityDetails/juridicalEntityDetails.module#JuridicalEntityDetailsModule' },
      { path: 'delegateReportManagement', loadChildren: 'app/pages/delegateReport/delegateReportManagement/delegateReportManagement.module#DelegateReportManagementModule' },
      { path: 'delegateReportDetails', loadChildren: 'app/pages/delegateReport/delegateReportDetails/delegateReportDetails.module#DelegateReportDetailsModule' },
      { path: 'updateDelegateReportDetails', loadChildren: 'app/pages/delegateReport/delegateReportDetails/delegateReportDetails.module#DelegateReportDetailsModule' },
      { path: 'associatedContracts', loadChildren: 'app/pages/agreementNew/associatedContracts/associatedContracts.module#AssociatedContractsModule' },
      { path: 'updateAgreementDetails', loadChildren: 'app/pages/agreementNew/agreementDetails/agreementDetails.module#AgreementDetailsModule' },
      { path: 'agreementCompensations', loadChildren: 'app/pages/agreementNew/agreementCompensations/agreementCompensations.module#AgreementCompensationsModule' },
      { path: 'contractCompensations', loadChildren: 'app/pages/policy-ident/contractCompensations/contractCompensations.module#ContractCompensationsModule' },
      { path: '42b13851c8e04658a5c2', loadChildren: 'app/pages/user/listUser/listUser.module#ListUserModule' },
      //  { path: 'fc4d79250df94b9097c4', loadChildren: 'app/pages/user/detailUser/detailUser.module#DetailUserModule' },
      { path: 'partner', loadChildren: 'app/pages/partner/partnerList/partnerList.module#PartnerListModule' },
      { path: 'partnerDetails', loadChildren: 'app/pages/partner/partnerDetails/partnerDetails.module#PartnerDetailsModule' },
      { path: 'monitoringIndicators', loadChildren: 'app/pages/monitoringIndicators/monitoringIndicators.module#MonitoringIndicatorsModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
