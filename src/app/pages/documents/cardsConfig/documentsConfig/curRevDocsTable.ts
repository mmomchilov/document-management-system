import { UtilCharts } from './utilCharts';
export class CurRevDocsTable {

    static genColumns(translateService): any {
        return {
            riskFamily: {
                //  title: 'localizationResource.referential.dashboard.riskFamily.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[0],
                width: '10%',
                type: 'html',
                // compareFunction: (direction: any, a: any, b: any) => UtilCharts.compareTranslatedValuesRP(
                //     direction, a, b, translateService, 'localizationEnumValue.portfolio.typerisk'),
                valuePrepareFunction: (value) => {
                    return `<div class="left"> ${value} </div>`;
                }
                //   ${UtilCharts.translateLabel('typerisk', value, translateService)} 
            },
            srvcType: {
                // title: 'localizationResource.referential.dashboard.srvcType.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[1],
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<div class="left"> ${value} </div>`;
                }
            },
            clmFldrNbr1: {
                title: UtilCharts.prevYear(UtilCharts.translatedRPTable1Columns[2]),
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            clmFldrNbr: {
                // title: 'localizationResource.referential.dashboard.clmFldrNbr.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[2],
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            opndClmFldrNbr: {
                // title: 'localizationResource.referential.dashboard.opndClmFldrNbr.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[3],
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            sttlmntFldrNbr1: {
                // title: 'localizationResource.referential.dashboard.sttlmntFldrNbr.shortLabel',
                title: UtilCharts.prevYear(UtilCharts.translatedRPTable1Columns[4]),

                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            sttlmntFldrNbr: {
                // title: 'localizationResource.referential.dashboard.sttlmntFldrNbr.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[4],
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            beneficiaryNbr1: {
                // title: 'localizationResource.referential.dashboard.beneficiaryNbr.shortLabel',
                title: UtilCharts.prevYear(UtilCharts.translatedRPTable1Columns[5]),
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            beneficiaryNbr: {
                // title: 'localizationResource.referential.dashboard.beneficiaryNbr.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[5],
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            paidAmount1: {
                // title: 'localizationResource.referential.dashboard.paidAmount.shortLabel',
                title: UtilCharts.prevYear(UtilCharts.translatedRPTable1Columns[6]),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            paidAmount: {
                // title: 'localizationResource.referential.dashboard.paidAmount.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[6],
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            avrgCost: {
                // title: 'localizationResource.referential.dashboard.avrgCost.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[7],
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            avrgDuration: {
                // title: 'localizationResource.referential.dashboard.avrgDuration.shortLabel',
                title: UtilCharts.translatedRPTable1Columns[8],
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            }
        };
    }
}
