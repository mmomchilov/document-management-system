export class UtilCharts {
    static thisYear = (new Date()).getFullYear();
    static thisMonth = (new Date()).getMonth() + 1;
    static strThisMonth = (`0${UtilCharts.thisMonth}`).slice(-2);
    static thisDay = (new Date()).getDate();
    static strThisDay = (`0${UtilCharts.thisDay}`).slice(-2);
    static valByMonthsInit = Array(12).fill(0);
    static translatedMonths = [];
    static translatedTitleLabels = {};
    static translatedLegendLabels: {};
    static translatedRiskTypeLabels: {};
    static infinity = '';
    static translatedHealthTable1Columns = [];
    static translatedRPTable1Columns = [];

    static months = ['localizationResource.referential.dashboard.january.shortLabel',
        'localizationResource.referential.dashboard.february.shortLabel',
        'localizationResource.referential.dashboard.march.shortLabel',
        'localizationResource.referential.dashboard.april.shortLabel',
        'localizationResource.referential.dashboard.may.shortLabel',
        'localizationResource.referential.dashboard.june.shortLabel',
        'localizationResource.referential.dashboard.july.shortLabel',
        'localizationResource.referential.dashboard.august.shortLabel',
        'localizationResource.referential.dashboard.september.shortLabel',
        'localizationResource.referential.dashboard.october.shortLabel',
        'localizationResource.referential.dashboard.november.shortLabel',
        'localizationResource.referential.dashboard.december.shortLabel'];

    static titleLabels = {
        'financialFlowsChart1': ['localizationResource.referential.dashboard.premSttlmntChart.shortLabel'],
        'financialFlowsChart2': ['localizationResource.referential.dashboard.remunerationChart.shortLabel'],
        'financialFlowsChart3': ['localizationResource.referential.dashboard.premiumByRiskChart.shortLabel'],
        'financialFlowsChart4': ['localizationResource.referential.dashboard.settlementByRiskChart.shortLabel'],
        'healthChart1': ['localizationResource.referential.dashboard.paidAmounts.shortLabel',
            'localizationResource.referential.dashboard.previousYear.shortLabel'],
        'healthChart2': ['localizationResource.referential.dashboard.paidAmountsByEffectDate.shortLabel'],
        'healthTable1': ['localizationResource.referential.dashboard.processedData.shortLabel',
            'localizationResource.referential.dashboard.accountingYear.shortLabel',
            'localizationResource.referential.dashboard.previousYear.shortLabel'],
        'riskAndProtectChart1': ['localizationResource.referential.dashboard.paidAmounts.shortLabel',
            'localizationResource.referential.dashboard.previousYear.shortLabel'
        ],
        'riskAndProtectChart2': ['localizationResource.referential.dashboard.claimFoldersNumber.shortLabel'],
        'riskAndProtectTable1': ['localizationResource.referential.dashboard.processedData.shortLabel',
            'localizationResource.referential.dashboard.accountingYear.shortLabel',
            'localizationResource.referential.dashboard.previousYear.shortLabel'],
        'financialFlowsTab': ['localizationResource.referential.dashboard.financialFlows.shortLabel'],
        'healthDashboardsTab': ['localizationResource.referential.dashboard.healthBenefits.shortLabel'],
        'riskDashboardsTab': ['localizationResource.referential.dashboard.riskBenefits.shortLabel'],
    };

    static legendLabels = {
        'financialFlowsChart1': ['localizationResource.referential.dashboard.group_billing.shortLabel',
            'localizationResource.referential.dashboard.benefits.shortLabel'],
        'financialFlowsChart2': ['localizationResource.referential.dashboard.compensation.shortLabel'],
        'financialFlowsChart3': ['localizationResource.referential.dashboard.healthBilling.shortLabel',
            'localizationResource.referential.dashboard.riskBilling.shortLabel'],
        'financialFlowsChart4': ['localizationResource.referential.dashboard.healthBenefits.shortLabel',
            'localizationResource.referential.dashboard.riskBenefits.shortLabel'],
        'healthChart1': ['localizationResource.referential.dashboard.healthBenefits.shortLabel',
            'localizationResource.referential.dashboard.accountingYear.shortLabel',
            'localizationResource.referential.dashboard.previousYear.shortLabel'],
        'healthChart2': ['localizationResource.referential.dashboard.settlement_year.shortLabel'],
        'riskAndProtectChart1': ['localizationResource.referential.dashboard.riskBenefits.shortLabel'],
        'riskAndProtectChart2': ['localizationEnumValue.portfolio.riskcode.incapcty.label',
            'localizationEnumValue.portfolio.riskcode.disablty.label',
            'localizationEnumValue.portfolio.riskcode.death.label'],
        'riskAndProtectTable1': ['localizationResource.referential.dashboard.processedData.shortLabel',
            'localizationResource.referential.dashboard.accountingYear.shortLabel',
            'localizationResource.referential.dashboard.previousYear.shortLabel']
    };

    static riskType = {
        'death': ['localizationEnumValue.portfolio.risktype.death.label'],
    };

    static settlementType = [
        'localizationEnumValue.portfolio.substtlmntfldr.annuity.label',
        'localizationEnumValue.portfolio.substtlmntfldr.dailyallw.label',
        'localizationEnumValue.portfolio.substtlmntfldr.lumpsum.label',
        'localizationEnumValue.portfolio.substtlmntfldr.medfees.label',
        'localizationEnumValue.portfolio.substtlmntfldr.mensu.label',
        'localizationEnumValue.portfolio.substtlmntfldr.othr.label',
    ];

    static healthTable1Columns = [
        'ratio',
        'actNbr',
        'realCharges',
        'nationalRefund',
        'amcSettlement',
        'otherRefund',
        'excess',
        'insuredNbr'
    ];

    static rPTableColumns = [
        'riskFamily', 'srvcType', 'clmFldrNbr', 'opndClmFldrNbr', 'sttlmntFldrNbr',
        'beneficiaryNbr', 'paidAmount', 'avrgCost', 'avrgDuration'
    ];

    static translateHealthTable1Columns(translateService) {
        this.translatedHealthTable1Columns = this.healthTable1Columns.map((columnName) => {
            return translateService.instant(`localizationResource.referential.dashboard.${columnName}.shortLabel`);
        });
    }

    static translateRPTable1Columns(translateService) {
        this.translatedRPTable1Columns = this.rPTableColumns.map((columnName) => {
            return translateService.instant(`localizationResource.referential.dashboard.${columnName}.shortLabel`);
        });
    }

    static translateInfinity(translateService) {
        this.infinity = translateService.instant('localizationResource.common.dashboard.infinity.shortLabel');
    }

    static translateTitlesList(translateService) {
        // to revise soon!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // this.translatedTitleLabels = {};
        // Object.keys(this.titleLabels).
        //     forEach(el => {
        //         this.translatedTitleLabels[el] = this.titleLabels[el]
        //             .map(translationCode => translateService.instant(translationCode));
        //     });
        console.log('this.titleLabels', this.titleLabels);
        this.translatedTitleLabels = this.titleLabels;
        console.log(UtilCharts.translatedTitleLabels);
    }

    static translateLegendList(translateService) {

        this.translatedLegendLabels = {};
        Object.keys(this.legendLabels).
            map(el => {
                this.translatedLegendLabels[el] = [];
            });
        Object.keys(this.legendLabels).
            map(el => {
                this.legendLabels[el].
                    forEach((element) => this.translatedLegendLabels[el].push(translateService.instant(element)));
            });
    }

    static translateRiskTypeTitles(translateService) {

        this.translatedRiskTypeLabels = {};
        Object.keys(this.riskType).
            map(el => {
                this.translatedRiskTypeLabels[el] = [];
            });
        Object.keys(this.riskType).
            map(el => {
                this.riskType[el].
                    forEach((element) => this.translatedRiskTypeLabels[el].push(translateService.instant(element)));
            });
    }
    static translateLabel(group, value, translateService) {
        if (value) {
            return translateService.instant(`localizationEnumValue.portfolio.${group}.${value}.label`);
        }
        return UtilCharts.getNotApplicable(translateService);
    }
    static getNotApplicable(translateService) {
        return translateService.instant(`localizationResource.referential.dashboard.dashboardinfinity.shortLabel`);
    }

    // static translateLabelsList(lst, translateService) {
    //     return lst.map(el => translateService.instant(el.month));
    // }

    static translateMonths(translateService) {
        this.translatedMonths = [];
        this.months.forEach((el) => this.translatedMonths.push(translateService.instant(el)));
    }

    static getValuesByMonth(response: any, riskType: String) {
        const valByMonths = this.valByMonthsInit;
        if (response && riskType) {
            response.filter(resp => resp.risk === riskType)
                .map(el => {
                    valByMonths[el.unit - 1] = el.amount;
                });
        } else if (response) {
            response.map(el => {
                valByMonths[el.unit - 1] = el.amount;
            });
        }
        return valByMonths;
    }

    static getValuesByMonthAction(responseIn: any, curAction: string, riskType: string) {
        const valuesByMonths = [];
        if (responseIn && responseIn[curAction]) {
            const valueCount = responseIn[curAction].length;
            for (let index = 0; index < valueCount; index++) {
                valuesByMonths[index] = this.getAmountsByYear(responseIn, curAction, index, riskType);
            }
        }

        return valuesByMonths;
    }

    static getValuesByMonthClaimFldRisk(responseIn: any, curAction: string, riskType: string) {
        const valByMonthsYear = [];
        let valByMonthsYearRisk = {};
        const curIndex = 0;
        if (responseIn && responseIn[curAction]) {
            valByMonthsYear[curIndex] = this.getAmountsByYearClaimFldRisk(responseIn, curAction, curIndex, riskType);
            valByMonthsYearRisk = valByMonthsYear;
        }
        return valByMonthsYearRisk;
    }

    static getAmountsByYearClaimFldRisk(responseIn, curAction, curIndex, riskType) {
        const valByMonths = Array(12).fill(0);
        const response = responseIn[curAction][curIndex] ? responseIn[curAction][curIndex].data : undefined;
        if (response && riskType) {
            //  const me = response.filter(resp => resp.claimFldRisk === riskType);
            response.filter(resp => resp.claimFldRisk === riskType).
                forEach(el => {
                    valByMonths[el.unit - 1] = valByMonths[el.unit - 1] + el.claimFldNb;
                });
        }
        return valByMonths;
    }

    static getAmountsByYear(responseIn, curAction, curIndex, riskType) {
        const valByMonths = Array(12).fill(0);
        const response = responseIn[curAction][curIndex] ? responseIn[curAction][curIndex].data : undefined;
        if (response && riskType) {
            response.filter(resp => resp.risk === riskType)
                .map(el => {
                    valByMonths[el.unit - 1] = el.amount;
                });
        } else if (response) {
            response.map(el => {
                valByMonths[el.unit - 1] = el.amount;
            });
        }
        return valByMonths;
    }

    static checkUndefinedResponse(response, el) {
        if (response && response[el]) {
            return true;
        } else {
            return false;
        }
    }

    static checkPartnerResponse(response) {
        if (response && (response[0] || response[1])) {
            return true;
        } else {
            return false;
        }
    }

    static formattedValue(value: number, translateService: any) {
        if (isNaN(value)) {
            value = 0;
        }
        const formatter = new Intl.NumberFormat(UtilCharts.toLocale(translateService.currentLang), {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return formatter.format(value);
    }

    static formattedValueWithFractionDigits(value: number, translateService: any) {
        if (isNaN(value)) {
            value = 0;
        }
        const formatter = new Intl.NumberFormat(UtilCharts.toLocale(translateService.currentLang), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return formatter.format(value);
    }
    static toEuro(money: any) {
        const formatter = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const res = formatter.format(money);
        return res;
    }

    static formattedPercentWithFractionDigits(value: number, translateService: any) {
        const formatter = new Intl.NumberFormat(UtilCharts.toLocale(translateService.currentLang), {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });

        return formatter.format(value);
    }

    static jsonParser(year: number, risk: string, json) {
        if (json.find(x => x.year === year)) {
            const a = json.find(x => x.year === year);
            if (risk === '') {
                return a.data[0] ? a.data[0].amount : 0;
            } else {
                return a.data.find(x => x.risk === risk) ? a.data.find(x => x.risk === risk).amount : 0;
            }
        } else { return 0; }
    }

    static toLocale(lang: string) {
        switch (lang) {
            case 'en_EN': return 'en-EN';
            default: return 'fr-FR';
        }
    }

    static arraysSum(array1, array2) {
        const result = [];
        let ctr = 0;
        let x = 0;

        if (array1.length === 0) { array1 = this.valByMonthsInit; }
        if (array2.length === 0) { array2 = this.valByMonthsInit; }

        while (ctr < array1.length && ctr < array2.length) {
            result.push(array1[ctr] + array2[ctr]);
            ctr++;
        }

        if (ctr === array1.length) {
            for (x = ctr; x < array2.length; x++) {
                result.push(array2[x]);
            }
        } else {
            for (x = ctr; x < array1.length; x++) {
                result.push(array1[x]);
            }
        }
        return result;
    }
    static prevYear(label): string {
        return `${label} N-1`;
    }

    static checkDataExist(arr): boolean {
        let res = false;
        if (arr) {
            arr.some(el => {
                if (el !== 0) {
                    res = true;
                }
            });
        }
        return res;
    }

    // static compareTranslatedValuesRP(direction: any, a: any, b: any, translateService: any, path: any) {
    //     const translatedA = translateService.instant(`${path}.${a}.label`);
    //     const translatedB = translateService.instant(`${path}.${b}.label`);
    //     if (translatedA < translatedB) {
    //         return -1 * direction;
    //     }
    //     if (translatedA > translatedB) {
    //         return direction;
    //     }
    //     return 0;
    // }
}
