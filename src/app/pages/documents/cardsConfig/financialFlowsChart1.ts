import { UtilCharts } from './utilCharts';
export class FinancialFlowsChart1 {

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
                    `${UtilCharts.translatedLegendLabels['financialFlowsChart1'][0]}`,
                    `${UtilCharts.translatedLegendLabels['financialFlowsChart1'][1]}`
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
                'x': 70,
                'y': 50,
                'x2': 0,
                'y2': 70
            },
            'xAxis': [
                {
                    'type': 'category',
                    'axisTick': { show: false },
                    'data': UtilCharts.translatedMonths,
                    'axisLabel': { rotate: 45 },
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
                'text': UtilCharts.translatedTitleLabels['financialFlowsChart1'][0], // 'Premiums-Settlements',
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };
        const sum1 = UtilCharts.arraysSum(results['CA'].health[0], results['CA'].risk[0]);
        const sum2 = UtilCharts.arraysSum(results.settlement.health[0], results.settlement.risk[0]);
        const check1 = UtilCharts.checkDataExist(sum1);
        const check2 = UtilCharts.checkDataExist(sum2);
        if (check1 || check2) {
            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    'name': `${UtilCharts.translatedLegendLabels['financialFlowsChart1'][0]}`,
                    type: 'bar',
                    barGap: 0,
                    label: 'labelOption',
                    'data': UtilCharts.arraysSum(results['CA'].health[0], results['CA'].risk[0])
                    // 0 = current year 1=previous year...
                },
                {
                    name: `${UtilCharts.translatedLegendLabels['financialFlowsChart1'][1]}`,
                    type: 'bar',
                    label: 'labelOption',
                    'data': UtilCharts.arraysSum(results.settlement.health[0], results.settlement.risk[0])
                    // 0 = current year
                }];
        }
        return conf;
    }
}
