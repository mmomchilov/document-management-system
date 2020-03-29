import { CardConfiguration } from './../../../../app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from './../../../../app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from '../storageConfig';
import { Translation } from './translation';

export class FileFormatCardConfig {

    static getFieldLst(): string[] {
        return ['formatFile'];
    }

    static generate(fileFormat, reloadFunction): CardConfiguration {

        return {
            title: Translation.getCartTitle('fileFormat'),
            isOpenedHeader: true,
            columnSize: 3,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsFileFormatCard(fileFormat, reloadFunction)
            }
        };
    }
    private static getLabelsFileFormatCard(fileFormat, reloadFunction): WidgetConfiguration[][] {
        return [
            [{
                field: 'fileFormatType',
                path: 'formatFile.',
                type: 'select',
                enum: 'fileFormatType',
                validators: {
                    isRequired: true
                },
                onChangeValue: [
                    {
                        field: 'fileSeparator',
                        validators: newFileFormatType => this.fileSeparatorValidators(newFileFormatType)
                    }
                ],
                customOnChangeValue: reloadFunction,
                disabled: (collection => collection.fileType === 'csv'),
                columnSize: 12
            }],
            [{
                field: 'fileSeparator',
                path: 'formatFile.',
                type: 'input',
                hidden: (collection => {
                    const fileFormatType = collection.formatFile ? collection.formatFile.fileFormatType : undefined;
                    return !this.isFileSeparatorApplicable(fileFormatType);
                }),
                validators: this.fileSeparatorValidators(fileFormat),
                columnSize: 12
            }],
            [{
                field: 'fileStructure',
                path: 'formatFile.',
                type: 'select',
                enum: 'fileStructure',
                validators: {
                    isRequired: true
                },
                columnSize: 12
            }],
            [{
                field: 'fileColumnHeader',
                path: 'formatFile.',
                type: 'select',
                enum: 'yesno',
                columnSize: 12
            }],
            [{
                field: 'separatorOR',
                path: 'formatFile.',
                type: 'input',
                columnSize: 12
            }],
            [{
                field: 'separatorAND',
                path: 'formatFile.',
                type: 'input',
                columnSize: 12
            }]
        ];
    }

    private static fileSeparatorValidators(fileFormatType: string) {
        return {
            isRequired: this.isFileSeparatorApplicable(fileFormatType)
        };
    }

    private static isFileSeparatorApplicable(fileFormatType: string): boolean {
        return fileFormatType === 'variableLength';
    }
}
