import { UtilCharts } from '../../pagesUtils/utilCharts';
export class DocumentTypeTable {

    static generateColumns(translateService): any {
        return {
            shortType: {
                //  title: 'localizationResource.referential.dashboard.riskFamily.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[0],
                width: '5%'
                //   ${UtilCharts.translateLabel('typerisk', value, translateService)} 
            },
            descriptionType: {
                // title: 'localizationResource.referential.dashboard.srvcType.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[1],
                width: '65%'
            },
            enable: {
                title: UtilCharts.translatedDocumentTypeTable[2],
                width: '10%'
            },
            whoModified: {
                // title: 'localizationResource.referential.dashboard.clmFldrNbr.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[3],
                width: '10%'
            },

            whenModified: {
                // title: 'localizationResource.referential.dashboard.opndClmFldrNbr.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[4],
                width: '10%'
            },

        };
    }
}
