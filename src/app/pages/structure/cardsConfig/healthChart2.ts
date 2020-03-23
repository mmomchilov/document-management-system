import { UtilCharts } from './utilCharts';
export class HealthChart2 {
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
                    `${UtilCharts.translatedLegendLabels['healthChart2'][0]} ${results.currentYearOption - 2}`,
                    `${UtilCharts.translatedLegendLabels['healthChart2'][0]} ${results.currentYearOption - 1}`,
                    `${UtilCharts.translatedLegendLabels['healthChart2'][0]} ${results.currentYearOption}`
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY-2',
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY-1',
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY'
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
                '#ffc000',
                '#70ad47',
                '#9e480e'
            ],
            'title': {
                'text': `${UtilCharts.translatedTitleLabels
                ['healthChart2'][0]} ${results.currentYearOption}`,
                // 'localizationResource.referential.dashboard.paidAmountsByEffectDate.shortLabel',
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };
        if (UtilCharts.checkDataExist(results.heatlthSettlementsFiscalYear[2]) ||
            UtilCharts.checkDataExist(results.heatlthSettlementsFiscalYear[1]) ||
            UtilCharts.checkDataExist(results.heatlthSettlementsFiscalYear[0])) {

            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    'name': `${UtilCharts.translatedLegendLabels['healthChart2'][0]} ${results.currentYearOption - 2}`,
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY-2',
                    'type': 'bar',
                    'stack': 'all',
                    data: results.heatlthSettlementsFiscalYear[2] // 0 = current year 1=previous year..
                },
                {
                    'name': `${UtilCharts.translatedLegendLabels['healthChart2'][0]} ${results.currentYearOption - 1}`,
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY-1',
                    'type': 'bar',
                    'stack': 'all',
                    data: results.heatlthSettlementsFiscalYear[1] // 0 = current year 1=previous year...
                },
                {
                    'name': `${UtilCharts.translatedLegendLabels['healthChart2'][0]} ${results.currentYearOption}`,
                    // 'localizationResource.referential.dashboard.healthBenefits.shortLabel' + ' YYYY',
                    'type': 'bar',
                    'stack': 'all',
                    data: results.heatlthSettlementsFiscalYear[0] // 0=current year
                }];
        }
        return conf;
    }
}
