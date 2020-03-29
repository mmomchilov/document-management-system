import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from '../storageConfig';
import { Translation } from './translation';

export class DataTypesCardConfig {

    private static database = StorageConfig.DATABASE;
    private static collectionId = StorageConfig.COLLECTION_ID;
    private static path = 'dataTypeLst';

    static getFieldLst(): string[] {
        return [this.path];
    }

    static generate(message, reloadFunction, displayMode, translate): CardConfiguration {
        return {
            title: Translation.getCartTitle(this.path),
            isOpenedHeader: true,
            columnSize: 9,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(message, reloadFunction, displayMode, translate)
            }
        };
    }
    private static getLabelsDataTypesCard(message, reloadFunction, displayMode, translate): WidgetConfiguration[][] {
        const allowEdit = displayMode !== 'r';
        message[this.path].forEach(el => {
            el.typeDisplay = this.getDataTypeTranslation(el.type, translate);
        });
        const alignmentList = [
            { value: 'left', title: 'Left' },
            { value: 'right', title: 'Right' }];
        const rightAlignment = {
            type: 'html',
            valuePrepareFunction: (cell, row) => {
                return `<span class="pull-right">${cell}</span>`;
            }
        };

        return [
            [{
                field: this.path,
                onUpdate: reloadFunction,
                type: 'editableTable',
                columnSize: '12',
                settings: {
                    columns: {
                        typeDisplay: {
                            filter: false,
                            sort: false,
                            title: this.getTitle('type'),
                            editable: false
                        },
                        decimal: {
                            filter: false,
                            sort: false,
                            title: this.getTitle('decimal'),
                            width: '10%',
                            ...rightAlignment
                        },
                        maxLength: {
                            filter: false,
                            sort: false,
                            title: this.getTitle('maxLength'),
                            width: '10%',
                            ...rightAlignment
                        },
                        format: {
                            filter: false,
                            sort: false,
                            title: this.getTitle('format'),
                            width: '60%',
                            ...rightAlignment
                        },
                        separator: {
                            filter: false,
                            sort: false,
                            title: this.getTitle('separator'),
                        },
                        position: {
                            title: this.getTitle('position'),
                            filter: false,
                            sort: false,
                            width: '20%',
                            type: 'html',
                            valuePrepareFunction: (cell, row) => {
                                const alignment = alignmentList.find(el => el.value === cell);
                                let alignmentDisplay = cell;
                                if (alignment) {
                                    alignmentDisplay = alignment.title;
                                }
                                return `<span class="pull-right">${alignmentDisplay}</span>`;
                            },
                            editor: {
                                type: 'list',
                                config: {
                                    list: alignmentList
                                }
                            }
                        },
                        filling: {
                            filter: false,
                            sort: false,
                            title: this.getTitle('filling')
                        },
                        unfilled: {
                            filter: false,
                            sort: false,
                            title: this.getTitle('unfilled')
                        }
                    },
                    edit: {
                        editButtonContent: '<i class="fa fa-edit fa-fw""></i>',
                        saveButtonContent: '<i class="fa fa-check fa-fw""></i>',
                        cancelButtonContent: '<i class="fa fa-close fa-fw""></i>',
                    },
                    actions: {
                        edit: allowEdit,
                        delete: false,
                        add: false
                    }
                }
            }]
        ];
    }
    private static getTitle(field) {
        return `localizationProperty.${this.database}.${this.collectionId}.${this.path}.${field}.shortLabel`;
    }

    private static getDataTypeTranslation(dataType, translate) {
        const localization = `localizationEnumValue.message-configuration.datatype.${dataType}.label`;
        const translated = translate.instant(localization);
        return translated;
    }
}
