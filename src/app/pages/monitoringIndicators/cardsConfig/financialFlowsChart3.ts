import { UtilCharts } from './utilCharts';
export class FinancialFlowsChart3 {

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
                    UtilCharts.translatedLegendLabels['financialFlowsChart3'][0],
                    UtilCharts.translatedLegendLabels['financialFlowsChart3'][1]
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
                'text': UtilCharts.translatedTitleLabels['financialFlowsChart3'][0],
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };

        if (UtilCharts.checkDataExist(results['CA'].risk[0]) || UtilCharts.checkDataExist(results['CA'].health[0])) {

            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    'name': UtilCharts.translatedLegendLabels['financialFlowsChart3'][0],
                    'type': 'bar',
                    'stack': 'all',
                    data: results['CA'].health[0] // 0 = current year 1=previous year...
                },
                {
                    'name': UtilCharts.translatedLegendLabels['financialFlowsChart3'][1],
                    'type': 'bar',
                    'stack': 'all',
                    data: results['CA'].risk[0] // 0 = current year 1=previous year...
                },
            ];
        }
        return conf;
    }
}
