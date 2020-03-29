import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { ExtractData } from '../extractData';
import { Translation } from './translation';

export class OrderingDescriptionCardConfig {

    private static path = 'orderingDescriptionLst';

    static getFieldLst(): string[] {
        return [
            this.path,
            'businessContext',
            'subBusinessContext',
            'calcMappingLst',
            'mapping'
        ];
    }

    static generate(displayMode, orderingDescriptionLst, translate): CardConfiguration {
        return {
            title: Translation.getCartTitle(this.path),
            isOpenedHeader: true,
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(displayMode, orderingDescriptionLst, translate)
            }
        };
    }
    private static getLabelsDataTypesCard(displayMode, orderingDescriptionLst, translate): WidgetConfiguration[][] {
        const editAllowed = displayMode !== 'r';
        const translatedOrderingDescriptionLst = this.translateList(orderingDescriptionLst, translate);
        return [
            [{
                field: this.path,
                items: translatedOrderingDescriptionLst,
                type: 'editableTable',
                columnSize: '12',
                settings: {
                    columns: {
                        collectionIdLabel: {
                            filter: false,
                            sort: false,
                            title: Translation.getColumnTitle('collectionId', this.path),
                            editable: false
                        },
                        parentLabel: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('parent', this.path),
                        },
                        depth: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('depth', this.path),
                        },
                        sequence: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('sequence', this.path),
                        },
                        permission: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('permission', this.path),
                        },
                        segmentIdSource: {
                            title: Translation.getColumnTitle('segmentIdSource', this.path),
                            filter: false,
                            sort: false
                        }
                    },
                    edit: {
                        editButtonContent: '<i class="fa fa-edit fa-fw"></i>',
                        saveButtonContent: '<i class="fa fa-check fa-fw"></i>',
                        cancelButtonContent: '<i class="fa fa-close fa-fw"></i>',
                    },
                    actions: {
                        edit: editAllowed,
                        delete: false,
                        add: false
                    }
                }
            }]
        ];
    }

    private static translateList(orderingDescriptionLst, translate) {
        return orderingDescriptionLst
            .sort((a, b) => {
                if (a.collectionId === 'slip-message') {
                    return -1;
                }
                if (['transfercession', 'transfercessionflowin', 'rejection', 'rejection-detail', 'credit-application']
                    .includes(a.collectionId)) {
                    return 1;
                }
                if (a.depth === b.depth) {
                    return a.sequence - b.sequence;
                } else {
                    return a.depth - b.depth;
                }
            })
            .map(el => {
                const collectionId = el.collectionId;
                const database = this.getDatabase(el);
                el.collectionIdLabel = ExtractData.translateCollectionId(database, collectionId, translate);

                const parentCollectionId = el.parent;
                if (parentCollectionId) {
                    const parenDatabase = this.getDatabase({ collectionId: parentCollectionId });
                    el.parentLabel = ExtractData.translateCollectionId(parenDatabase, parentCollectionId, translate);
                }
                return el;
            });
    }

    private static getDatabase(collection) {
        let database = collection.database;
        const collectionId = collection.collectionId;
        if (!database) {
            database = this.defaultDatabase[collectionId];
            if (!database) {
                database = 'portfolio';
            }
        }
        return database;
    }

    private static defaultDatabase = {
        'slip-message': 'message-information',
        'credit-application': 'accounting',
        'transfercession': 'exchange-si',
        'transfercessionflowin': 'exchange-si',
        'rejection': 'portfolio',
        'rejection-detail': 'portfolio'
    };
}
