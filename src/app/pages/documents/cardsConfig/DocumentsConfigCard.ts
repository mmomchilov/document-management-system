
// import { TabConfiguration } from 'app/theme/components/cardDetail/configurationClasses/tabConfigurationts';
import { RiskAndProtectChart1 } from './riskAndProtectChart1';
import { RiskAndProtectChart2 } from './riskAndProtectChart2';
import { RiskAndProtectTable1 } from './riskAndProtectTable1';
import { FinancialFlowsChart1 } from './financialFlowsChart1';
import { FinancialFlowsChart2 } from './financialFlowsChart2';
import { FinancialFlowsChart3 } from './financialFlowsChart3';
import { FinancialFlowsChart4 } from './financialFlowsChart4';
import { HealthChart1 } from './healthChart1';
import { HealthChart2 } from './healthChart2';
import { HealthTable1 } from './healthTable1';
import { UtilCharts } from './utilCharts';
import { TabConfiguration } from 'src/app/theme/components/cardDetail/configurationClasses/tabConfigurationts';

export class DocumentsConfig {

  static generateCard(result, optionalParams, selectedTab, translate): any {
    const me = UtilCharts.translatedTitleLabels['healthTable1'];
    // console.log('me', me);

    return {
      title: undefined, // remove card header
      isOpenedHeader: true,
      columnSize: 12,
      content:
      {
        type: 'simpleInputs',
        // tabs
        selectedTab,
        tabs: this.getTabsList(result),
        // fields in tabs
        fields: [

          [
            {
              filter: 'newFamilyMemberSelector',
              type: 'checkbox',
              field: 'changeEnum',
              // hideLabel: true,
              optionsName: 'changeEnum',
              // enum: 'delegateactvtycode',
              enum: 'changeEnum', // not implemented really
              splitSize: 12,
              columnSize: 12
            }],

          [
            {
              filter: 'newFamilyMemberSelector',
              field: 'class',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            }, {
              filter: 'newFamilyMemberSelector',
              field: 'year',
              type: 'input',
              disabledDisplayModes: 'r',
              // validators: {
              //   isRequired: true
              // },
              // onFocusOut: ExtractData.transformCode(),
              columnSize: 1
            },
            {
              filter: 'newFamilyMemberSelector',
              field: 'counter',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {
              filter: 'newFamilyMemberSelector',
              field: 'xtra',
              type: 'input',
              // disabledDisplayModes: 'r',
              // validators: {
              //   isRequired: true
              // },
              // onFocusOut: ExtractData.transformCode(),
              columnSize: 1
            },
            {
              filter: 'newFamilyMemberSelector',
              field: 'audience',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {
              filter: 'newFamilyMemberSelector',
              field: 'lang',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {
              filter: 'newFamilyMemberSelector',
              field: 'rev',
              type: 'input',
              // disabledDisplayModes: 'r',
              // validators: {
              //   isRequired: true
              // },
              // onFocusOut: ExtractData.transformCode(),
              columnSize: 1
            },
            {
              filter: 'newFamilyMemberSelector',
              field: 'number',
              type: 'input',
              // hideLabel: true,
              // disabledDisplayModes: 'r',
              // validators: {
              //   isRequired: true
              // },
              // onFocusOut: ExtractData.transformCode(),
              columnSize: 2
            }],
          [{
            filter: 'newFamilyMemberSelector',
            field: 'title',
            type: 'input',
            // disabledDisplayModes: 'r',
            // validators: {
            //   isRequired: true
            // },
            // onFocusOut: ExtractData.transformCode(),
            columnSize: 7
          },
          {
            filter: 'newFamilyMemberSelector',
            field: 'access',
            type: 'input',
            // hideLabel: true,
            // disabledDisplayModes: 'r',
            // validators: {
            //   isRequired: true
            // },
            // onFocusOut: ExtractData.transformCode(),
            columnSize: 2
          }],
          [{
            filter: 'newFamilyMemberSelector',
            field: 'date',
            type: 'input',
            // disabledDisplayModes: 'r',
            // validators: {
            //   isRequired: true
            // },
            // onFocusOut: ExtractData.transformCode(),
            columnSize: 2
          },
          {
            filter: 'newFamilyMemberSelector',
            field: 'docStatus',
            // path: ctgryFieldPath,
            //  labelPath: ctgryLabelPath,
            type: 'select',
            enum: 'currency',
            //   enumTransformation: this.sortEnumeration,
            columnSize: 2
          },
          {
            filter: 'newFamilyMemberSelector',
            field: 'resetData',
            label: 'Reset Data',
            // hideLabel: true,
            type: 'button',
            classCSS: 'button-link',
            // onClick: showDelegateInformationFunction,
            columnSize: 2
          }],
          [{
            filter: 'newFamilyMemberSelector',
            field: 'customer',
            // path: ctgryFieldPath,
            //  labelPath: ctgryLabelPath,
            type: 'select',
            enum: 'currency',
            //   enumTransformation: this.sortEnumeration,
            columnSize: 2
          },
          {
            filter: 'newFamilyMemberSelector',
            field: 'project',
            // path: ctgryFieldPath,
            //  labelPath: ctgryLabelPath,
            type: 'select',
            enum: 'currency',
            //   enumTransformation: this.sortEnumeration,
            columnSize: 2
          },
          {
            filter: 'newFamilyMemberSelector',
            field: 'subSystem',
            // path: ctgryFieldPath,
            //  labelPath: ctgryLabelPath,
            type: 'select',
            enum: 'currency',
            //   enumTransformation: this.sortEnumeration,
            columnSize: 2
          },
          {
            filter: 'newFamilyMemberSelector',
            field: 'createMember',
            label: 'Create member',
            // hideLabel: true,
            type: 'button',
            classCSS: 'button-link',
            // onClick: showDelegateInformationFunction,
            columnSize: 2
          }],

          // {
          //   field: 'delegateActivitiesLst',
          //   fieldCode: 'activityCode',
          //   path: 'delegateActivitiesLst[*].',
          //   labelCode: 'delegateActivitiesLst.activityCode',
          //   hideLabel: true,
          //   type: 'checkbox',
          //   enum: 'delegateactvtycode',
          //   disabledDisplayModes: 'r',
          // },


          [{
            filter: 'documentsSelector',
            type: 'editableTable',
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
          }],

          [{
            type: 'editableTable',
            filter: 'newFamilyMemberSelector',
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
          }]
        ]
      }
    };
  }

  private static getTabsList(result): TabConfiguration[] {
    // console.log(UtilCharts.translatedTitleLabels);
    return [
      {
        field: 'documentTab',
        filterName: 'documentsSelector',
        // label: `${UtilCharts.translatedTitleLabels['financialFlowsTab'][0]} ${result.currentYearOption}`
        label: `This Document`
        // 'localizationResource.referential.financialFlows.shortLabel'
      },
      {
        field: 'newDocumentTab',
        filterName: 'newDocumentSelector',
        label: 'New Document ' // `${UtilCharts.translatedTitleLabels['healthDashboardsTab'][0]}`
        // 'localizationResource.referential.healthDashboards.shortLabel'
      },
      {
        field: 'newFamilyMemberTab',
        filterName: 'newFamilyMemberSelector',
        label: 'New Family member' // `${UtilCharts.translatedTitleLabels['riskDashboardsTab'][0]}`
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
