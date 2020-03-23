import { UtilCharts } from './utilCharts';
export class RiskAndProtectChart2 {
    static chart(results): any {
        const conf = {
            'tooltip': {
                'trigger': 'item',
                'formatter': '{a} : {c}',
                'axisPointer': {
                    'type': 'shadow'
                }
            },
            'legend': {
                'y': 'bottom',
                'x': 'center',
                'show': true,
                'data': [
                    // 'Incapacity',
                    // 'Invalidity',
                    // 'Death'
                    `${UtilCharts.translatedLegendLabels['riskAndProtectChart2'][0]}`,
                    `${UtilCharts.translatedLegendLabels['riskAndProtectChart2'][1]}`,
                    `${UtilCharts.translatedLegendLabels['riskAndProtectChart2'][2]}`
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
                '#ed7d31',
                '#a5a5a5'
            ],
            'title': {
                'text': `${UtilCharts.translatedTitleLabels['riskAndProtectChart2'][0]}`,
                // 'localizationResource.referential.dashboard.claimFoldersNumber.shortLabel',
                'textStyle': {
                    'fontFamily': 'Roboto,sans-serif',
                    'fontSize': 18,
                    'fontWeight': 500,
                    'color': 'rgb(98, 98, 98)'
                }
            }
        };
        if (UtilCharts.checkDataExist(results.risksettlements.incapcty[0]) ||
            UtilCharts.checkDataExist(results.risksettlements.disablty[0]) ||
            UtilCharts.checkDataExist(results.risksettlements.death[0])) {

            conf.yAxis[0].show = true;
            conf.xAxis[0].show = true;
            conf.series = [
                {
                    'name': `${UtilCharts.translatedLegendLabels['riskAndProtectChart2'][0]}`,
                    // 'Incapacity'
                    'type': 'bar',
                    'stack': 'all',
                    data: results.risksettlements.incapcty[0]// 0 = current year 1=previous year..
                },
                {
                    'name': `${UtilCharts.translatedLegendLabels['riskAndProtectChart2'][1]}`,
                    // 'Invalidity'
                    'type': 'bar',
                    'stack': 'all',
                    data: results.risksettlements.disablty[0] // 0 = current year 1=previous year..
                },
                {
                    'name': `${UtilCharts.translatedLegendLabels['riskAndProtectChart2'][2]}`,
                    // 'Death'
                    'type': 'bar',
                    'stack': 'all',
                    data: results.risksettlements.death[0]  // 0 = current year 1=previous year..
                }];
        }
        return conf;
    }
}
