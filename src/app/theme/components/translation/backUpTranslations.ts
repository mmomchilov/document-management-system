import { MessageConfiguration } from './tasks/messageConfiguration';
import { DelegateReport } from './tasks/delegateReport';
import { Agreement } from './tasks/agreement';
import { DocumentsTranslations } from './tasks/documents';
import { TransferSession } from './tasks/transfercession';
import { Enums } from './tasks/enums';

export class BackUpTranslations {
    static translations: any = {
        //  ...MessageConfiguration.translation(),
        //  ...DelegateReport.translation(),
        //  ...Agreement.translation(),
        ...DocumentsTranslations.translation(),
        //  ...TransferSession.translation(),
        ...Enums.translation(),

    };

    static translate(code: string, interpolateParams) {
        // console.log('translations', this.translations);
        // console.log('code', code);
        // console.log('interpolateParams', interpolateParams);
        let valueFromDemoTranslations = this.translations[code];
        if (valueFromDemoTranslations) {
            if (interpolateParams) {
                const keys = Object.keys(interpolateParams);
                keys.forEach(key => {
                    const param = `{{${key}}}`;
                    valueFromDemoTranslations = valueFromDemoTranslations.replace(param, interpolateParams[key]);
                });
            }
            return valueFromDemoTranslations;
        }
        if (code.substring(0, 12) === 'localization') {
            //  console.log('translations code ????????', code);
            const splitKey = code.split('.');
            return splitKey.length > 1 ? `${splitKey[splitKey.length - 2]} DFLT` : code;
        }
    }
}
