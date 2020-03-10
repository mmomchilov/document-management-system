export class FinancialFlowsTable1 {

    static chart(): any {
        return {

            riskFamily: { title: 'Risk family', width: '20%' },
            srvcType: { title: 'Settlement type', width: '20%' },
            clmFldrNbr: { title: 'Claim folders number N', width: '20%' },
            clmFldrNbr1: { title: 'Claim folders number N-1', width: '20%' },
            opndClmFldrNbr: { title: 'Opened claim folders number', width: '20%' },
            sttlmntFldrNbr: { title: 'Settlement folder number N-1', width: '20%' },
            sttlmntFldrNbr1: { title: 'Settlement folder number N', width: '20%' },
            beneficiaryNbr: { title: 'Beneficiary number N-1', width: '20%' },
            beneficiaryNbr1: { title: 'Beneficiary number N', width: '20%' },
            paidAmount: { title: 'Paid amounts N-1', width: '20%' },
            paidAmount1: { title: 'Paid amounts N', width: '20%' },
            avrgCost: { title: 'Average cost', width: '20%' },
            avrgDuration: { title: 'Average duration', width: '20%' }
        };
    }

    static mockData(): any {
        return [
            {
             'riskFamily': 'Incapacity',
            'srvcType': 'Rent',
            'clmFldrNbr': 256,
            'clmFldrNbr1': 347,
            'opndClmFldrNbr': 121,
            'sttlmntFldrNbr': 1457,
            'sttlmntFldrNbr1': 1673,
            'beneficiaryNbr': 1536,
            'beneficiaryNbr1': 1613,
            'paidAmount': 2450000.89,
            'paidAmount1': 4567888.01,
            'avrgCost': 1578.63,
            'avrgDuration': 34
            },
            {
                'riskFamily': 'Death',
                'srvcType': 'Rent',
                'clmFldrNbr': 125,
                'clmFldrNbr1': 169,
                'opndClmFldrNbr': 111,
                'sttlmntFldrNbr': 375,
                'sttlmntFldrNbr1': 394,
                'beneficiaryNbr': 375,
                'beneficiaryNbr1': 394,
                'paidAmount': 101062.5,
                'paidAmount1': 106115.63,
                'avrgCost': 627,
                'avrgDuration': 452
            },
            {
                'riskFamily': 'Invalidity',
                'srvcType': 'Capital',
                'clmFldrNbr': 230,
                'clmFldrNbr1': 177,
                'opndClmFldrNbr': 121,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 65,
                'beneficiaryNbr': 45,
                'beneficiaryNbr1': 65,
                'paidAmount': 123400,
                'paidAmount1': 100000,
                'avrgCost': 1085.51,
                'avrgDuration': 186
            },
            {
                'riskFamily': 'Incapacity',
                'srvcType': 'Rent',
                'clmFldrNbr': 5,
                'clmFldrNbr1': 7,
                'opndClmFldrNbr': 21,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 13,
                'beneficiaryNbr': 13,
                'beneficiaryNbr1': 16,
                'paidAmount': 2450000,
                'paidAmount1': 4567888,
                'avrgCost': 15,
                'avrgDuration': 1
            },
            {
                'riskFamily': 'Incapacity',
                'srvcType': 'Rent',
                'clmFldrNbr': 5,
                'clmFldrNbr1': 7,
                'opndClmFldrNbr': 21,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 13,
                'beneficiaryNbr': 13,
                'beneficiaryNbr1': 16,
                'paidAmount': 2450000,
                'paidAmount1': 4567888,
                'avrgCost': 15,
                'avrgDuration': 1
            },
            {
                'riskFamily': 'Incapacity',
                'srvcType': 'Rent',
                'clmFldrNbr': 5,
                'clmFldrNbr1': 7,
                'opndClmFldrNbr': 21,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 13,
                'beneficiaryNbr': 13,
                'beneficiaryNbr1': 16,
                'paidAmount': 2450000,
                'paidAmount1': 4567888,
                'avrgCost': 15,
                'avrgDuration': 1
            },
            {
                'riskFamily': 'Incapacity',
                'srvcType': 'Rent',
                'clmFldrNbr': 5,
                'clmFldrNbr1': 7,
                'opndClmFldrNbr': 21,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 13,
                'beneficiaryNbr': 13,
                'beneficiaryNbr1': 16,
                'paidAmount': 2450000,
                'paidAmount1': 4567888,
                'avrgCost': 15,
                'avrgDuration': 1
            },
            {
                'riskFamily': 'Incapacity',
                'srvcType': 'Rent',
                'clmFldrNbr': 5,
                'clmFldrNbr1': 7,
                'opndClmFldrNbr': 21,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 13,
                'beneficiaryNbr': 13,
                'beneficiaryNbr1': 16,
                'paidAmount': 2450000,
                'paidAmount1': 4567888,
                'avrgCost': 15,
                'avrgDuration': 1
            },
            {
                'riskFamily': 'Incapacity',
                'srvcType': 'Rent',
                'clmFldrNbr': 5,
                'clmFldrNbr1': 7,
                'opndClmFldrNbr': 21,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 13,
                'beneficiaryNbr': 13,
                'beneficiaryNbr1': 16,
                'paidAmount': 2450000,
                'paidAmount1': 4567888,
                'avrgCost': 15,
                'avrgDuration': 1
            },
            {
                'riskFamily': 'Incapacity',
                'srvcType': 'Rent',
                'clmFldrNbr': 5,
                'clmFldrNbr1': 7,
                'opndClmFldrNbr': 21,
                'sttlmntFldrNbr': 45,
                'sttlmntFldrNbr1': 13,
                'beneficiaryNbr': 13,
                'beneficiaryNbr1': 16,
                'paidAmount': 2450000,
                'paidAmount1': 4567888,
                'avrgCost': 15,
                'avrgDuration': 1
            }
        ];
    }
}
