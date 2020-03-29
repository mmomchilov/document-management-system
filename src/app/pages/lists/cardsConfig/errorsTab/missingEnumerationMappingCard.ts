import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { ExtractData } from '../../extractData';
import { Translation } from '../translation';
import { Tab } from '../tabDefinition';

export class MissingEnumerationMappingCardConfig {

    private static path = 'errorLst';
    private static fieldProperty = 'missingEnumerationMappingLst';

    static getFieldLst(): string[] {
        return [
            'businessContext',
            'dataGroupLst',
            'calcMappingLst',
            'mapping'
        ];
    }

    static generate(missingEnumerationMappingLst, collectionDefinitions, navigateFunc, translate): CardConfiguration {
        return {
            title: Translation.getCardTitleWithIcon('warning', this.fieldProperty, translate),
            isOpenedHeader: true,
            openCloseHeader: false, 
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(missingEnumerationMappingLst, collectionDefinitions,
                    navigateFunc, translate)
            }
        };
    }
    private static getLabelsDataTypesCard(missingEnumerationMappingLst, collectionDefinitions, navigateFunc, translate)
        : WidgetConfiguration[][] {
        const missingEnumerationMappingLstTmp = ExtractData
            .translateCollectionsAndProperties(missingEnumerationMappingLst, collectionDefinitions, translate);
        const missingEnumerationMappingLstTranslated = ExtractData
            .translateEnumerations(missingEnumerationMappingLstTmp, collectionDefinitions, translate);
        return [
            [{
                field: 'description',
                label: Translation.getShortDescription(this.fieldProperty),
                type: 'label',
                columnSize: 12
            }],
            [{
                field: 'steps',
                label: Translation.getLongDescription(this.fieldProperty),
                type: 'label',
                customCSS: Translation.getLongDescriptionStyle(),
                columnSize: 12
            }],
            [{
                field: this.fieldProperty,
                path: `${this.path}.`,
                type: 'editableTable',
                onUpdate: navigateFunc,
                items: missingEnumerationMappingLstTranslated,
                columnSize: '12',
                settings: {
                    columns: {
                        collectionIdLabel: {
                            filter: false,
                            sort: false,
                            title: Translation.getColumnTitle('collectionId', this.fieldProperty),
                            editable: false
                        },
                        propertyLabel: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('property', this.fieldProperty),
                        },
                        expectedEnumerationLabel: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('expectedEnumeration', this.fieldProperty),
                        },
                        dataGroup: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('dataGroup', this.fieldProperty),
                        },
                        field: {
                            filter: false,
                            sort: false,
                            editable: false,
                            title: Translation.getColumnTitle('field', this.fieldProperty),
                        }
                    },
                    edit: {
                        editButtonContent: '<i class="fa fa-edit"></i>',
                        saveButtonContent: '<i class="fa fa-check"></i>',
                        cancelButtonContent: '<i class="fa fa-close"></i>',
                    },
                    actions: {
                        edit: false,
                        delete: false,
                        add: false,
                        custom: Translation.getCustomActions([Tab.COLLECTIONS, Tab.DATA_GROUPS, Tab.ENUMERATIONS], translate)
                    }
                }
            }]
        ];
    }
}
