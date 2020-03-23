import { UtilCharts } from './utilCharts';
export class FinancialFlowsChart4 {
    static chart(results): any {
        const conf = {
            'tooltip': {
                'trigger': 'item',
                'formatter': (params) => `${params.seriesName} : ${UtilCharts.toEuro(params.value)}`,
                'axisPointer': {
                    'type': 'shadow'
                }
            },
            'legend': {
                'y': 'bottom',
                'x': 'center',
                'show': true,
                'data': [
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel',
                    // 'localizationResource.referential.dashboard.riskBenefits.shortLabel'
                    `${UtilCharts.translatedLegendLabels['financialFlowsChart4'][0]}`,
                    `${UtilCharts.translatedLegendLabels['financialFlowsChart4'][1]}`,
                ],
                'padding': [40, 0, 0, 0]
            },
            'toolbox': {
                'show': true,
                'feature': {
                    'mark': {
                        'show': true
                    },
                    'dataView': {
                        'show': true,
                        'readOnly': true,
                        'title': 'liste données',
                        'lang': [
                            'Liste des données',
                            'fermer',
                            'actualiser'
                        ]
                    },
                    'magicType': {
                        'show': true,
                        'type': [
                            'pie',
                            'funnel'
                        ]
                    }
                }
            },
            'grid': {
                'x': 50,
                'y': 50,
                'x2': 0,
                'y2': 70
            },
            'xAxis': [
                {
                    type: 'category',
                    axisTick: { show: false },
                    data: UtilCharts.translatedMonths,
                    axisLabel: { rotate: 45 },
                    'show': false
                }
            ],
            'yAxis': [
                {
                    'type': 'value',
                    'show': false
                }
            ],
            'series': [],

            'color': [
                '#4573c4',
                '#ed7d31'
            ],
            'title': {
                'text': UtilCharts.translatedTitleLabels['financialFlowsChart4'][0],
                // 'localizationResource.referential.dashboard.settlementByRiskChart.shortLabel',
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };

        if (UtilCharts.checkDataExist(results.settlement.health[0]) ||
            UtilCharts.checkDataExist(results.settlement.risk[0])) {
            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    'name': `${UtilCharts.translatedLegendLabels['financialFlowsChart4'][0]}`,
                    //'localizationResource.referential.dashboard.healthBenefits.shortLabel',
                    'type': 'bar',
                    'stack': 'all',
                    data: results.settlement.health[0] // 0 = current year 1=previous year...
                },
                {
                    'name': `${UtilCharts.translatedLegendLabels['financialFlowsChart4'][1]}`,
                    // 'localizationResource.referential.dashboard.riskBenefits.shortLabel',
                    'type': 'bar',
                    'stack': 'all',
                    data: results.settlement.risk[0] // 0 = current year 1=previous year...
                }
            ];
        }
        return conf;
    }
}
