import { UtilCharts } from '../../pagesUtils/utilCharts';
export class DocumentStatusTable {

    static generateColumns(translateService): any {
        return {

            documentStatus: { title: 'documentStatus', width: '33%' },
            whoModified: { title: 'ModifiedBy', width: '33%' },
            whenModified: { title: 'Modified', width: '33%' },

        };
    }

    static mockData(): any {
        return [
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 256,
            },
            {
                documentStatus: 'Death',
                whoModified: 'Rent',
                whenModified: 125,
            },
            {
                documentStatus: 'Invalidity',
                whoModified: 'Capital',
                whenModified: 230,
            },
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 5,
            },
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 5,
            },
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 5,
            },
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 5,
            },
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 5,
            },
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 5
            },
            {
                documentStatus: 'Incapacity',
                whoModified: 'Rent',
                whenModified: 5
            }
        ];
    }
}
