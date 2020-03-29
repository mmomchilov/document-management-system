import { StorageConfig } from '../storageConfig';
import { TabsDefinition, Tab } from './tabDefinition';

export class Translation {

    private static database = StorageConfig.DATABASE;
    private static collectionId = StorageConfig.COLLECTION_ID;

    static getCartTitle(code) {
        return this.getFromResource(code);
    }

    static getButtonTitle(code, path = undefined) {
        return this.getFromResource(code, path);
    }

    static getColumnTitle(code, path = undefined) {
        return this.getFromProperty(code, path);
    }

    static getCardTitleWithIcon(type, code, translate) {
        const title = translate.instant(Translation.getCartTitle(code));
        let level;
        if (type === 'severe') {
            level = 'error';
        } else {
            level = 'warning';
        }
        return `<span>${title}</span>
        <i class="pull-left ${level} fa fa-exclamation-triangle"></i>`;
    }

    static getLongDescriptionStyle() {
        return node => {
            return {
                color: 'green', 'font-style': 'italic', 'white-space': 'pre-line',
                'padding-top': '0.5em', 'padding-bottom': '1em'
            };
        };
    }

    static getArrowColumn(path) {
        return {
            filter: false,
            sort: false,
            editable: false,
            title: this.getFromProperty('mapOn', path),
            type: 'html',
            valuePrepareFunction: (cell, row) => {
                return '<div class="align-center"><i class="fa fa-exchange" aria-hidden="true"></i></div>';
            }
        };
    }

    static getCustomActions(actions: Tab[], translate) {
        return actions.map(type => ({ name: type, title: this.getIcon(type, translate) }));
    }

    static getIcon(type: Tab, translate) {
        const tabDefinitionLst = TabsDefinition.getTabs();
        const tabDefinition = tabDefinitionLst.find(el => el.id === type);
        const tooltip = translate.instant(tabDefinition.title);
        const icon = `<i title="${tooltip}" class="d-inline pr-2 ${tabDefinition.icon}"></i>`;
        return icon;
    }

    static getErrorColumn(path, field, hasContent = true) {
        let type = 'destination';
        const sourceProperties = ['field', 'dataGroup', 'fieldUnknow', 'dataGroupUnknow',
            'fieldType', 'code', 'enumeration', 'enumerationRefId'];
        if (sourceProperties.includes(field)) {
            type = 'source';
        }
        return {
            filter: false,
            sort: false,
            editable: false,
            title: this.getColumnTitle(field, path),
            type: 'html',
            valuePrepareFunction: (cell, row) => {
                const content = hasContent ? cell : '?';
                return `<span class=${type}>${content}</span>`;
            }
        };
    }

    static getShortDescription(code) {
        return `localizationResource.${this.database}.${this.collectionId}.${code}.shortDescription`;
    }

    static getLongDescription(code) {
        return `localizationResource.${this.database}.${this.collectionId}.${code}.longDescription`;
    }

    private static getFromResource(code, path = undefined) {
        return this.getLocalization('localizationResource', code, path);
    }

    private static getFromProperty(code, path = undefined) {
        return this.getLocalization('localizationProperty', code, path);
    }

    private static getLocalization(from, code, path) {
        let property = code;
        if (path) {
            property = `${path}.${code}`;
        }
        return `${from}.${this.database}.${this.collectionId}.${property}.shortLabel`;
    }
}
