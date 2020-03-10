import { UtilCharts } from './utilCharts';
export class RiskAndProtectChart1 {
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
                    `${UtilCharts.translatedLegendLabels['riskAndProtectChart1'][0]} ${results.currentYearOption - 1}`,
                    `${UtilCharts.translatedLegendLabels['riskAndProtectChart1'][0]} ${results.currentYearOption}`
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
            'series': [

            ],
            'color': [
                '#4573c4',
                '#ed7d31'
            ],
            'title': {
                'text': `${UtilCharts.translatedTitleLabels
                ['riskAndProtectChart1'][0]} ${results.currentYearOption} ${UtilCharts.translatedTitleLabels
                ['riskAndProtectChart1'][1]}`,
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };
        if (UtilCharts.checkDataExist(results.settlement.risk[0]) ||
            UtilCharts.checkDataExist(results.settlement.risk[1])) {

            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    name: `${UtilCharts.translatedLegendLabels
                    ['riskAndProtectChart1'][0]} ${results.currentYearOption - 1}`,
                    // 'localizationResource.referential.dashboard.riskBenefits.shortLabel' + ' YYYY-1',
                    type: 'bar',
                    barGap: 0,
                    label: 'labelOption',
                    data: results.settlement.risk[1] // 0 = selected year 1=previous year..
                },
                {
                    name: `${UtilCharts.translatedLegendLabels
                    ['riskAndProtectChart1'][0]} ${results.currentYearOption}`,
                    // 'localizationResource.referential.dashboard.riskBenefits.shortLabel' + ' YYYY',
                    type: 'bar',
                    label: 'labelOption',
                    data: results.settlement.risk[0] // 0 = selected year 1=previous year..
                }];
        }
        return conf;
    }
}
