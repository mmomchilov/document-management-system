
// import { TabConfiguration } from 'app/theme/components/cardDetail/configurationClasses/tabConfigurationts';
import { RiskAndProtectChart1 } from '../cardsConfig/riskAndProtectChart1';
import { RiskAndProtectChart2 } from '../cardsConfig/riskAndProtectChart2';
import { RiskAndProtectTable1 } from '../cardsConfig/riskAndProtectTable1';
import { FinancialFlowsChart1 } from '../cardsConfig/financialFlowsChart1';
import { FinancialFlowsChart2 } from '../cardsConfig/financialFlowsChart2';
import { FinancialFlowsChart3 } from '../cardsConfig/financialFlowsChart3';
import { FinancialFlowsChart4 } from '../cardsConfig/financialFlowsChart4';
import { HealthChart1 } from '../cardsConfig/healthChart1';
import { HealthChart2 } from '../cardsConfig/healthChart2';
import { HealthTable1 } from '../cardsConfig/healthTable1';
import { UtilCharts } from './utilCharts';
import { TabConfiguration } from 'src/app/theme/components/cardDetail/configurationClasses/tabConfigurationts';

export class MonitoringIndicatorsConfig {

  static generateCard(result, optionalParams, selectedTab, translate): any {
    const me = UtilCharts.translatedTitleLabels['healthTable1'];
    console.log('me', me);

    return {
      title: undefined, // remove card header
      isOpenedHeader: true,
      columnSize: 12,
      content: {
        type: 'simpleInputs',
        // tabs
        selectedTab,
        tabs: this.getTabsList(result),
        // fields in tabs
        fields: [
          [{
            filter: 'structureSelector',
            field: 'categoryCode',
            labelCode: 'agreementAppendiceLst.categoryCode',
            type: 'select',
            enum: 'insrncecatgry',
            onChangeValue: {
              field: 'branchCode'
            },
            disabledDisplayModes: 'u',
            validators: {
              isRequired: true
            },
            columnSize: 4
          },

          {
            type: 'editableTable',
            filter: 'structureSelector',
            columnSize: 12,
            settings: {
              tableTitle: 'Seccond tab table title '
              // tableTitle: `${UtilCharts.translatedTitleLabels
              // ['healthTable1'][0]} ${UtilCharts.translatedTitleLabels
              // ['healthTable1'][1]} ${result.currentYearOption} ${
              //   UtilCharts.translatedTitleLabels
              //   ['healthTable1'][2]
              //   }`
              ,
              // 'localizationResource.referential.dashboard.processedData.shortLabel',
              hideSubHeader: true,
              columns: HealthTable1.chart(translate),
              rowClassFunction: (row) => {
                return this.getBoundariesColorClass(row, optionalParams);
              }
            },
            items: result.healthitems
          },

          {
            type: 'editableTable',
            filter: 'trashSelector',
            columnSize: 12,
            settings: {
              tableTitle: 'THIRD tab Table title'
              // tableTitle: `${UtilCharts.translatedTitleLabels
              // ['riskAndProtectTable1'][0]} ${UtilCharts.translatedTitleLabels
              // ['riskAndProtectTable1'][1]} ${result.currentYearOption} ${
              //   UtilCharts.translatedTitleLabels
              //   ['riskAndProtectTable1'][2]
              //   }`
              ,
              hideSubHeader: true,
              columns: RiskAndProtectTable1.chart(translate)
            },
            items: result.RiskAndProtectTable1
          }
          ]
        ]
      }
    };
  }

  private static getTabsList(result): TabConfiguration[] {
    console.log(UtilCharts.translatedTitleLabels);
    return [
      {
        field: 'documentsTab',
        filterName: 'documentsSelector',
        // label: `${UtilCharts.translatedTitleLabels['financialFlowsTab'][0]} ${result.currentYearOption}`
        label: `Documents`
        // 'localizationResource.referential.financialFlows.shortLabel'
      },
      {
        field: 'structureTab',
        filterName: 'structureSelector',
        label: 'Structure ' // `${UtilCharts.translatedTitleLabels['healthDashboardsTab'][0]}`
        // 'localizationResource.referential.healthDashboards.shortLabel'
      },
      {
        field: 'trashTab',
        filterName: 'trashSelector',
        label: 'Trash' // `${UtilCharts.translatedTitleLabels['riskDashboardsTab'][0]}`
        // 'localizationResource.referential.riskDashboards.shortLabel'
      },
      {
        field: 'listsTab',
        filterName: 'listsSelector',
        label: 'Lists' // `${UtilCharts.translatedTitleLabels['riskDashboardsTab'][0]}`
        // 'localizationResource.referential.riskDashboards.shortLabel'
      },
      {
        field: 'settingsTab',
        filterName: 'settingsSelector',
        label: 'Settings' // `${UtilCharts.translatedTitleLabels['riskDashboardsTab'][0]}`
        // 'localizationResource.referential.riskDashboards.shortLabel'
      }
    ];
  }

  private static getBoundariesColorClass(row, optionalParams) {
    if (optionalParams && optionalParams.healthitems && optionalParams.healthitems.boundaries) {
      const boundaries = optionalParams.healthitems.boundaries;
      if (row.data.totalDelegatePayment === boundaries.min) {
        return 'text-success';
      } else if (row.data.totalDelegatePayment === boundaries.max) {
        return 'text-danger';
      }
    }
  }
}
