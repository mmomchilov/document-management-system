import { CardConfiguration } from './../../../../app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from './../../../../app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from '../storageConfig';
import { Translation } from './translation';
import { ExtractData } from '../extractData';

export class InformationCardConfig {

    static getFieldLst(): string[] {
        return [
            'subBusinessContext',
            'code',
            'category',
            'label',
            'direction',
            'comment',
            'fileType',
            'normalizedFlowPRDG',
            'version',
            'updatedVersion'
        ];
    }

    static generate(fileType: string, changeDataTypesFunction): CardConfiguration {
        return {
            title: Translation.getCartTitle('information'),
            isOpenedHeader: true,
            columnSize: 8,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsInformationCard(fileType, changeDataTypesFunction)
            }
        };
    }
    private static getLabelsInformationCard(fileType, changeDataTypesFunction): WidgetConfiguration[][] {

        return [
            [ // Row 1
                {
                    field: 'subBusinessContext',
                    labelCode: 'businessContext',
                    type: 'select',
                    enum: 'subBusinessContext',
                    validators: {
                        isRequired: true
                    },
                    storeData: ((collection, newValue) => {
                        const context = StorageConfig.getBusinessContext(newValue);
                        collection.businessContext = context.businessContext;
                        collection.subBusinessContext = context.subBusinessContext;
                    }),
                    columnSize: 6
                },
                {
                    field: 'code',
                    type: 'input',
                    disabledDisplayModes: 'u',
                    validators: {
                        isRequired: true
                    },
                    onFocusOut: ExtractData.transformCode(),
                    columnSize: 6
                }
            ],
            [ // Row 2
                {
                    field: 'category',
                    type: 'select',
                    enum: 'category',
                    validators: {
                        isRequired: true
                    },
                    columnSize: 6
                },
                {
                    field: 'label',
                    type: 'input',
                    validators: {
                        isRequired: true
                    },
                    columnSize: 6
                }
            ],
            [ // Row 3
                {
                    field: 'direction',
                    type: 'select',
                    enum: 'direction',
                    validators: {
                        isRequired: true
                    },
                    columnSize: 6
                },
                {
                    field: 'comment',
                    type: 'input',
                    columnSize: 6
                }
            ],
            [ // Row 4
                {
                    field: 'fileType',
                    labelCode: 'fileNormType',
                    type: 'select',
                    enum: 'filenormtype',
                    validators: {
                        isRequired: true
                    },
                    customOnChangeValue: changeDataTypesFunction,
                    onChangeValue: [
                        {
                            field: 'versionPRDG',
                            validators: newFileType => this.prdgDetailsValidator(newFileType)
                        },
                        {
                            field: 'connectPrdg',
                            validators: newFileType => this.prdgDetailsValidator(newFileType)
                        }
                    ],
                    columnSize: 6
                },
                {
                    field: 'versionPRDG',
                    fieldCode: 'version',
                    path: 'normalizedFlowPRDG.',
                    type: 'input',
                    hidden: (collection => !this.isPRDG(collection.fileType)),
                    validators: this.prdgDetailsValidator(fileType),
                    storeData: ((collection, newValue) => collection.normalizedFlowPRDG
                        ? collection.normalizedFlowPRDG.version = newValue
                        : collection.normalizedFlowPRDG = { version: newValue }),
                    columnSize: 3
                },
                {
                    field: 'connectPrdg',
                    path: 'normalizedFlowPRDG.',
                    type: 'select',
                    enum: 'yesno',
                    hidden: (collection => !this.isPRDG(collection.fileType)),
                    validators: this.prdgDetailsValidator(fileType),
                    storeData: ((collection, newValue) => collection.normalizedFlowPRDG
                        ? collection.normalizedFlowPRDG.connectPrdg = newValue
                        : collection.normalizedFlowPRDG = { connectPrdg: newValue }),
                    columnSize: 3
                }
            ],
            [ // Row 5
                {
                    field: 'version',
                    type: 'input',
                    columnSize: 3
                },
                {
                    field: 'updatedVersion',
                    type: 'input',
                    disabledDisplayModes: 'cu',
                    columnSize: 3
                }
            ]
        ];
    }

    private static prdgDetailsValidator(fileType: string) {
        return {
            isRequired: this.isPRDG(fileType)
        }
    }

    private static isPRDG(fileType: string) {
        return fileType === 'prdg';
    }
}
