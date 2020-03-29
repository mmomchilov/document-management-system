import { UtilCharts } from '../../pagesUtils/utilCharts';



export class DocumentLanguageTable {

    static generateColumns(translateService): any {
        return {

            shortLang: { title: 'shortLang', width: '5%' },
            languagename: { title: 'Languagename', width: '40%' },
            whoModified: { title: 'ModifiedBy', width: '30%' },
            whenModified: { title: 'Modified', width: '25%' },

        };

    }

    static getTranslation(translateService, value, formatFunction) { // = undefined
        if (value === 'infinity') {
            return UtilCharts.infinity;
        }

        if (formatFunction !== undefined) {
            return formatFunction(value, translateService);
        }

        return value;
    }

    static mockData(): any {
        return [
            {
                shortLang: 'Ger',
                languagename: 'german',
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortLang: 'En',
                languagename: 'english',
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortLang: 'Fr',
                languagename: 'french',
                whoModified: 'Capital',
                whenModified: '1/1/2020',
            },
            {
                shortLang: 'Bul',
                languagename: 'Bulgarian',
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortLang: 'It',
                languagename: 'Italian',
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortLang: 'Multi',
                languagename: 'Multilingual',
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },

        ];
    }

}
