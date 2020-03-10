import { UtilCharts } from './utilCharts';
export class FinancialFlowsChart2 {

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
                    `${UtilCharts.translatedLegendLabels['financialFlowsChart2'][0]}`
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
                '#4573c4'
            ],
            'title': {
                'text': UtilCharts.translatedTitleLabels['financialFlowsChart2'][0], // 'Commissions',
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };

        if (UtilCharts.checkDataExist(results['calculatedRemunerations'][0])) {
            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    name: `${UtilCharts.translatedLegendLabels['financialFlowsChart2'][0]}`, // Compensation
                    type: 'bar',
                    barGap: 0,
                    label: 'labelOption',
                    data: results['calculatedRemunerations'][0] // current year 
                }
            ];
        }
        return conf;
    }
}
