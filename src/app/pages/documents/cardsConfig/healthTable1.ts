import { UtilCharts } from './utilCharts';

export class HealthTable1 {

    static chart(translateService): any {
        return {
            medicalreimbursementDateFamlyLabel: {
                title: translateService.instant('localizationResource.referential.dashboard.actFamily.shortLabel'),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<div class="left">${value}</div>`;
                }
            },
            numberOfActsPY: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[1], '-1'),
                width: '4%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            numberOfActs: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[1]),
                width: '4%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            numberOfActsRatio: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[0], '/N-1'),
                width: '5%',
                valuePrepareFunction: (value) => {
                    return this.getTranslation(translateService, value, UtilCharts.formattedPercentWithFractionDigits);
                }
            },
            totalRealChargesPY: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[2], '-1'),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            totalRealCharges: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[2]),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            totalSSReimbursementPY: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[3], '-1'),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            totalSSReimbursement: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[3]),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            totalDelegatePaymentPY: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[4], '-1'),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            totalDelegatePayment: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[4]),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            totalDelegatePaymentRatio: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[0], '/N-1'),
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<div class="right">${this.getTranslation(translateService, value, UtilCharts.formattedPercentWithFractionDigits)}</div>`;
                }
            },
            totalOtherReimbursementPY: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[5], '-1'),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            totalOtherReimbursement: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[5]),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            excessPY: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[6], '-1'),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            excess: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[6]),
                width: '10%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValueWithFractionDigits(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            excessRatio: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[0], '/N-1'),
                width: '5%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<div class="right">${this.getTranslation(translateService, value, UtilCharts.formattedPercentWithFractionDigits)}</div>`;
                }
            },
            insuredUsersNumberPY: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[7], '-1'),
                width: '4%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
            insuredUsersNumber: {
                title: this.addYear(UtilCharts.translatedHealthTable1Columns[7]),
                width: '4%',
                type: 'html',
                valuePrepareFunction: (value) => {
                    const formattedVal = UtilCharts.formattedValue(value, translateService);
                    return `<div class="right">${formattedVal}</div>`;
                }
            },
        };
    }

    static getTranslation(translateService, value, formatFunction = undefined) {
        if (value === 'infinity') {
            return UtilCharts.infinity;
        }

        if (formatFunction !== undefined) {
            return formatFunction(value, translateService);
        }

        return value;
    }

    static addYear(label, year = '') {
        return `${label} N${year}`;
    }
}
