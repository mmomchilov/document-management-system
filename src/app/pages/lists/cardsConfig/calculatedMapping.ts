import { CardConfiguration } from './../../../../app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration, DefaultValueRule } from './../../../../app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from '../storageConfig';
import { ExtractData } from '../extractData';
import { ConcatenationEditorComponent } from './concatenationEditor';
import { ConcatenationRenderComponent } from './concatenationRender';
import { ComboBoxItem } from './../../../../app/theme/components/cardDetail/configurationClasses/comboBoxItem';
import { Translation } from './translation';

export class CalculatedMappingCardConfig {
    private static database = StorageConfig.DATABASE;
    private static collectionId = StorageConfig.COLLECTION_ID;
    private static path = 'calcDataLst';
    private static formulaDtlPath = 'formulaDtl.';

    static getFieldLst(): string[] {
        return ['calcMappingLst', 'dataGroupLst', 'fileType', 'businessContext', 'mapping'];
    }

    static generate(message: any, displayModeInput: string, translationEnumerations,
        confirmNodeDelete, selectedCalculationField) {

        const groups = message && message.calcMappingLst ? message.calcMappingLst : [];
        const calculatedStart = 'CalculatedField_';
        const newLabel = Translation.getButtonTitle('addNew', this.path);

        return {
            title: Translation.getCartTitle(this.path),
            isOpenedHeader: true,
            columnSize: 12,
            content: {
                type: 'tree',
                tree: {
                    nodes: groups,
                    nodeToDisplay: selectedCalculationField,
                    add: {
                        enableAddButton: true,
                        allowAddSubnodes: false,
                        newNode: (newNode, nodes) => Object.assign(newNode,
                            { type: 'string', code: ExtractData.getNextItem(calculatedStart, nodes) })
                    },
                    delete: {
                        allowDelete: true,
                        confirmDelete: confirmNodeDelete
                    },
                    display: {
                        addNewNode: { title: newLabel },
                        config: this.card(message, displayModeInput, translationEnumerations),
                        ...this.databaseConfig,
                        displayMode: displayModeInput
                    }
                }
            }
        };

    }

    static databaseConfig = {
        database: StorageConfig.DATABASE,
        collectionId: StorageConfig.COLLECTION_ID,
        collection: { code: 'TEST' }
    };

    static card(message, displayModeInput, translationEnumerations): CardConfiguration {
        return {
            title: '',
            isOpenedHeader: false,
            actions: { add: true, delete: true },
            columnSize: 4,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsCard(message, displayModeInput, translationEnumerations)
            }
        };
    }

    private static getLabelsCard(message, displayModeInput, translationEnumerations): WidgetConfiguration[][] {
        const editable = displayModeInput !== 'r';
        // Data group list in format [{code:'code', display:'display}...]
        const dataGroupLst = message.dataGroupLst;
        const format = { code: 'code', display: 'display' };
        const dataGroupLstOptions: ComboBoxItem[] = ExtractData.getDataGroupLstOptions(dataGroupLst, format);

        // Data group fields object in format {'DataGroup': [{code:'code', display:'display}...]..}
        const fieldsConfig = {};
        for (const dataGroupOption of dataGroupLstOptions) {
            const dataGroupCode = dataGroupOption.code;
            const dataGroupFields: ComboBoxItem[] = ExtractData.getFieldsForDataGroup(dataGroupCode,
                dataGroupLst, format);
            fieldsConfig[dataGroupCode] = dataGroupFields;
        }

        // Calculated mapping
        const constantLst = [{ code: 'date', label: '$Date' }];
        const calculatedMappingLst = constantLst
            .map(el => {
                const label = el.label ? el.label : el.code;
                return ExtractData.format(el.code, label, format);
            });

        // Calculated fields - for summation formula type
        // const summationFields = StorageConfig.getCalculationFields(message.fileType, message.businessContext);
        let summationFields = [];
        let summationFieldsOptions = [];
        if (message.fileType === 'csv') {
            const businessContextSumFields = translationEnumerations[this.database][`${message.subBusinessContext}-formulaType-sum`] || {};
            summationFields = Object.keys(businessContextSumFields);
            summationFieldsOptions = summationFields.map(el => ExtractData.format(el, businessContextSumFields[el].label, format));
        }

        let summationCode;
        if (summationFields.length > 0) {
            summationCode = summationFields[0];
        }

        return [
            [{
                field: 'code',
                labelPath: this.path,
                type: 'input',
                validators: {
                    isRequired: true
                },
                onFocusOut: ExtractData.transformCode(),
                columnSize: 6
            },
            {
                field: 'label',
                labelPath: this.path,
                type: 'input',
                columnSize: 6
            }
            ],
            [
                {
                    field: 'formulaType',
                    labelPath: this.path,
                    type: 'select',
                    defaultValueRule: DefaultValueRule.FIRST_ITEM,
                    enum: 'formulaType',
                    enumTransformation: (enumLst) => {
                        if (summationCode) {
                            return enumLst;
                        } else {
                            return enumLst.filter(el => el.code !== 'sum');
                        }
                    },
                    columnSize: 6,
                    onChangeValue: [
                        {
                            field: 'sumField',
                            fieldVal: (newVal, input) => newVal === 'sum' && summationCode
                                ? summationCode
                                : undefined
                        },
                        {
                            field: 'concatenationLst',
                            fieldVal: () => [],
                            items: (newFormulaType, collection) =>
                                newFormulaType === 'concatenation' ? collection.formulaDtl.concatenationLst : []
                        },
                        {
                            field: 'dataGroup',
                            fieldVal: (newVal, input) => newVal !== 'sum'
                                ? undefined
                                : input.collection.formulaDtl.dataGroup
                        },
                        {
                            field: 'field',
                            fieldVal: (newVal, input) => newVal !== 'sum'
                                ? undefined
                                : input.collection.formulaDtl.field
                        },
                        {
                            field: 'formulaTypeDescription',
                            labelCode: newVal => this.getFormulaTypeDescription(newVal)
                        }
                    ]
                },
                {
                    field: 'formulaTypeDescription',
                    path: this.formulaDtlPath,
                    labelPath: this.path,
                    labelCode: collection => this.getFormulaTypeDescription(collection.formulaType),
                    type: 'label',
                    columnSize: 6
                }
            ],
            [
                {
                    field: 'sumField',
                    path: this.formulaDtlPath,
                    labelPath: this.path,
                    type: 'select',
                    options: () => summationFieldsOptions,
                    hidden: this.isHidden('sum'),
                    columnSize: 6
                }
            ],
            [
                this.getConcatenationTable(editable, dataGroupLstOptions, fieldsConfig, calculatedMappingLst)
            ],
            [{
                field: 'dataGroup',
                path: this.formulaDtlPath,
                labelPath: this.path,
                type: 'select',
                options: () => dataGroupLstOptions,
                hidden: this.isHidden('sum'),
                onChangeValue: [
                    {
                        field: 'field',
                        fieldVal: undefined,
                        options: dataGroup => fieldsConfig[dataGroup]
                    }],
                columnSize: 6
            },
            {
                field: 'field',
                path: this.formulaDtlPath,
                labelPath: this.path,
                type: 'select',
                options: (collection) => {
                    if (collection.formulaDtl) {
                        const dataGroup = collection.formulaDtl.dataGroup;
                        if (dataGroup) {
                            return fieldsConfig[dataGroup];
                        }
                    }
                    return [];
                },
                hidden: this.isHidden('sum'),
                columnSize: 6
            },
            {
                field: 'defaultValue',
                path: this.formulaDtlPath,
                labelPath: this.path,
                type: 'input',
                hidden: this.isHidden('constant'),
                columnSize: 6
            }
            ]
        ];
    }

    private static getFormulaTypeDescription(formulaType) {
        let labelCode = '';
        switch (formulaType) {
            case 'concatenation':
                labelCode = 'calcfield_formula_type_concat_desc';
                break;
            case 'sum':
                labelCode = 'calcfield_formula_type_sum_desc';
                break;
            case 'constant':
                labelCode = 'calcfield_formula_type_constant_desc';
                break;
        }
        return labelCode;
    }
    private static isHidden(formulaType) {
        return collection => {
            const type = collection.formulaType;
            return type !== formulaType;
        };
    }

    private static getConcatenationTable(editable, dataGroupLstOptions, fieldsConfig, calculatedMappingLst) {
        return {
            field: 'concatenationLst',
            path: this.formulaDtlPath,
            type: 'editableTable',
            columnSize: '12',
            hidden: this.isHidden('concatenation'),
            settings: {
                columns: {
                    value: {
                        filter: false,
                        title: this.getTitle('value'),
                        type: 'custom',
                        width: '90%',
                        renderComponent: ConcatenationRenderComponent,
                        editor: {
                            type: 'custom',
                            config: {
                                dataGroupLst: dataGroupLstOptions,
                                fields: fieldsConfig,
                                constantLst: calculatedMappingLst
                            },
                            component: ConcatenationEditorComponent
                        }
                    }
                },
                add: {
                    addButtonContent: '<i class="fa fa-plus fa-fw"></i>',
                    createButtonContent: '<i class="fa fa-check fa-fw"></i>',
                    cancelButtonContent: '<i class="fa fa-close fa-fw"></i>'
                },
                edit: {
                    editButtonContent: '<i class="fa fa-edit fa-fw"></i>',
                    saveButtonContent: '<i class="fa fa-check fa-fw"></i>',
                    cancelButtonContent: '<i class="fa fa-close fa-fw"></i>'
                },
                delete: {
                    deleteButtonContent: '<i class="fa fa-remove fa-fw"></i>'
                },
                actions: {
                    edit: editable,
                    delete: editable,
                    add: editable
                }
            }
        };
    }

    private static getTitle(field) {
        return `localizationProperty.${this.database}.${this.collectionId}.${this.path}.${field}.shortLabel`;
    }

}
