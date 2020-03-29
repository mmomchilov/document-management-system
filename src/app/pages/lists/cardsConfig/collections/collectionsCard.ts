import { CardConfiguration } from './../../../../theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from './../../../../theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from './../../storageConfig';
import { FieldRenderComponent } from './tableRenders/fieldRender';
import { FieldEditorComponent } from './tableRenders/fieldEditor';
import { MappingRenderComponent } from './tableRenders/mappingRender';
import { MappingEditorComponent } from './tableRenders/mappingEditor';
import { ExtractData } from '../../extractData';
import { Translation } from '../translation';

export class CollectionsCardConfig {

    static database = StorageConfig.DATABASE;
    static collectionId = StorageConfig.COLLECTION_ID;
    private static path = 'collectionLst';

    static databaseConfig = {
        database: StorageConfig.DATABASE,
        collectionId: StorageConfig.COLLECTION_ID,
        collection: { code: 'TEST' }
    };

    static getFieldLst(): string[] {
        return [
            'businessContext',
            'subBusinessContext',
            'dataGroupLst',
            'calcMappingLst',
            'mapping'
        ];
    }

    static generate(message, collections: any, selectedCollection, displayModeInput: string, updateMappingFunction) {
        return {
            title: Translation.getCartTitle(this.path),
            isOpenedHeader: true,
            columnSize: 12,
            content: {
                type: 'tree',
                tree: {
                    nodes: collections,
                    nodeToDisplay: selectedCollection, 
                    add: {
                        enableAddButton: false,
                        allowAddSubnodes: false
                    },
                    delete: {
                        allowDelete: false
                    },
                    hasChildNodes: this.hasChildNodes(collections),
                    customCSS: (node => node.mandatory ? { color: 'crimson' } : {}),
                    display: {
                        addNewNode: { title: ' ' },
                        config: this.card(message, displayModeInput, updateMappingFunction),
                        ...this.databaseConfig,
                        displayMode: displayModeInput
                    }
                }
            }
        };

    }

    static card(message, displayModeInput, updateMappingFunction): CardConfiguration {
        return {
            title: 'STM',
            isOpenedHeader: false,
            actions: { add: true, delete: true },
            columnSize: 4,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsCard(message, displayModeInput, updateMappingFunction)
            }
        };
    }

    private static getLabelsCard(message, displayModeInput, updateMappingFunction): WidgetConfiguration[][] {
        const editable = displayModeInput !== 'r';
        // Data group list in format [{code:'code', display:'display}...]
        const dataGroupLst = message.dataGroupLst;
        const format = { code: 'code', display: 'display' };
        const dataGroupLstOptions = ExtractData.getDataGroupLstOptions(dataGroupLst, format);

        // Data group fields object in format {'DataGroup': [{code:'code', display:'display}...]..}
        const fieldsConfig = {};
        for (const dataGroupOption of dataGroupLstOptions) {
            const dataGroupCode = dataGroupOption.code;
            const dataGroupFields = ExtractData.getFieldsForDataGroup(dataGroupCode, dataGroupLst, format);
            fieldsConfig[dataGroupCode] = dataGroupFields;
        }

        // Calculated mapping
        const calcMappingLst = message.calcMappingLst;
        const calculatedMappingLst = calcMappingLst
            ? calcMappingLst.map(el => {
                const label = el.label ? el.label : el.code;
                return ExtractData.format(el.code, label, format);
            })
            : [];

        return [
            [{
                field: 'fields',
                onUpdate: updateMappingFunction,
                type: 'editableTable',
                columnSize: '12',
                settings: {
                    columns: {
                        field: {
                            filter: false,
                            title: Translation.getColumnTitle('field', this.path),
                            type: 'custom',
                            renderComponent: FieldRenderComponent,
                            editor: {
                                type: 'custom',
                                component: FieldEditorComponent
                            }
                        },
                        mapping: {
                            filter: false,
                            title: Translation.getColumnTitle('mapping', this.path),
                            width: '70%',
                            type: 'custom',
                            renderComponent: MappingRenderComponent,
                            editor: {
                                type: 'custom',
                                config: {
                                    dataGroupLst: dataGroupLstOptions,
                                    fields: fieldsConfig,
                                    calculatedLst: calculatedMappingLst
                                },
                                component: MappingEditorComponent
                            }
                        }
                    },
                    pager: {
                        display: false
                    },
                    edit: {
                        editButtonContent: '<i class="fa fa-edit fa-fw"></i>',
                        saveButtonContent: '<i class="fa fa-check fa-fw"></i>',
                        cancelButtonContent: '<i class="fa fa-close fa-fw"></i>',
                        confirmSave: true
                    },
                    actions: {
                        edit: editable,
                        delete: false,
                        add: false
                    }
                }
            }]
        ];
    }

    private static hasChildNodes(collections) {
        return collections.some((node) => node.subNodes.length > 0);
    }
}
