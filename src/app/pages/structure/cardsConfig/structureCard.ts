
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

export class StructureConfig {

  static generateCard(result, optionalParams, selectedTab, translate): any {
    // const me = UtilCharts.translatedTitleLabels['healthTable1'];
    // console.log('me', me);

    return {
      title: 'StructureComponent', // 'localizationResource.common.dashboard.keyNumbers.shortLabel',
      isOpenedHeader: true,
      columnSize: 12,
      minContentHeight: 'content-minimum-medium',
      content: {
          type: 'simpleInputs',
          fields: [
              [
                  {
                      type: 'editableTable',
                      columnSize: 4,
                      settings: {
                          pager: { display: false },
                          actions: { edit: false, delete: false, add: false },
                          hideSubHeader: true,
                          columns: {
                              revenue: {
                                  title: 'name',
                                  width: '50%',
                                  //  type: 'html',
                                  // valuePrepareFunction: (value) => {
                                  //     let icon: string = '';
                                  //     if (value[0] === 'healthRevenue') { icon = 'fa fa-plus fa-2x green'; }
                                  //     if (value[0] === 'riskRevenue') { icon = 'fa fa-umbrella fa-2x blue'; }
                                  //     return `<div class="left">${value[1]} <span class="${icon}"></span></div>`;
                                  // },
                              },
                              curYearColumn: { title: 'sort', width: '25%' },
                              
                              increase: {
                                  title: 'Repos',
                                  width: '25%', type: 'html',
                              }
                          },
                      },
                   //   items: data[0]
                  },
                  {
                      type: 'editableTable',
                      columnSize: 4,
                      settings: {
                          pager: { display: false },
                          actions: { edit: false, delete: false, add: false },
                          hideSubHeader: true,
                          columns: {
                              settlementAmount: {
                                  title: 'project',
                                  width: '40%', type: 'html',
                                  valuePrepareFunction: (value) => {
                                      let icon: string = '';
                                      if (value[0] === 'healthSettlementAmount') {
                                          icon = 'fa fa-plus fa-2x green';
                                      }
                                      if (value[0] === 'riskSettlementAmount') {
                                          icon = 'fa fa-umbrella fa-2x blue';
                                      }
                                      return `<div class="left">${value[1]} <span class="${icon}"></span></div>`;
                                  }
                              },
                              curYearColumn: { title: (2020).toString(), width: '20%' },
                              lastYearColumn: { title: (2019).toString(), width: '20%' },
                              riskRevenue: {
                                  title: 'shortLabel',
                                  width: '20%'
                              }
                          }
                      },
                     // items: data[1]
                  }
              ,
              
                  {
                      type: 'editableTable',
                      columnSize: 4,
                      settings: {
                          pager: { display: false },
                          actions: { edit: false, delete: false, add: false },
                          hideSubHeader: true,
                          columns: {
                              compensationAmount: {
                                  title: 'subsystem',
                                  width: '40%', type: 'html',
                                  valuePrepareFunction: (value) => {
                                      return `<div class="left">${value}</div>`;
                                  }
                              },
                              curYearColumn: {
                                  title: (2002).toString(), width: '20%'
                              },
                              lastYearColumn: {
                                  title: (2019).toString(), width: '20%'
                              },
                              riskRevenue: {
                                  title: 'shortLabel',
                                  width: '20%'
                              }
                          }
                      },
                     // items: data[2]
                  }
              ]
          ]
      }
  };
}
}
