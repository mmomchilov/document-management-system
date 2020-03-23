import { UtilCharts } from './utilCharts';
export class HealthChart1 {
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
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY-1',
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY'
                    `${UtilCharts.translatedLegendLabels['healthChart1'][0]} ${results.currentYearOption - 1}`,
                    `${UtilCharts.translatedLegendLabels['healthChart1'][0]} ${results.currentYearOption}`,
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
                'text': `${UtilCharts.translatedTitleLabels
                ['healthChart1'][0]} ${results.currentYearOption} ${UtilCharts.translatedTitleLabels
                ['healthChart1'][1]}`,
                // 'localizationResource.referential.dashboard.paidAmounts.shortLabel' +
                //     ' YYYY' + 'localizationResource.referential.dashboard.previousYear.shortLabel',
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };
        if (UtilCharts.checkDataExist(results.settlement.health[1]) ||
            UtilCharts.checkDataExist(results.settlement.health[0])) {
            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    name: `${UtilCharts.translatedLegendLabels['healthChart1'][0]} ${results.currentYearOption - 1}`,
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY-1',
                    type: 'bar',
                    barGap: 0,
                    label: 'labelOption',
                    data: results.settlement.health[1] // 0 = current year 1=previous year...
                },
                {
                    name: `${UtilCharts.translatedLegendLabels['healthChart1'][0]} ${results.currentYearOption}`,
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY',
                    type: 'bar',
                    label: 'labelOption',
                    data: results.settlement.health[0] // 0 = current year 1=previous year...
                },
            ];
        }
        return conf;
    }
}
