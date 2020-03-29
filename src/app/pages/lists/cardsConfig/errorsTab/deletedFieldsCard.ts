import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { ExtractData } from '../../extractData';
import { Translation } from '../translation';
import { Tab } from '../tabDefinition';

export class DeletedFieldsCardConfig {

    private static path = 'errorLst';
    private static fieldProperty = 'deletedFieldLst';

    static getFieldLst(): string[] {
        return [
            'dataGroupLst'
        ];
    }

    static generate(deletedFieldLst, collectionDefinitions, translate, navigateFunc): CardConfiguration {
        return {
            title: Translation.getCardTitleWithIcon('severe', this.fieldProperty, translate),
            isOpenedHeader: true,
            openCloseHeader: false,
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(deletedFieldLst, collectionDefinitions, translate, navigateFunc)
            }
        };
    }
    private static getLabelsDataTypesCard(deletedFieldLst, collectionDefinitions, translate, navigateFunc)
        : WidgetConfiguration[][] {
        const deletedFieldLstTranslated = ExtractData
            .translateCollectionsAndProperties(deletedFieldLst, collectionDefinitions, translate);
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
                items: deletedFieldLstTranslated,
                columnSize: '12',
                settings: {
                    columns: {
                        dataGroup: Translation.getErrorColumn(this.fieldProperty, 'dataGroup'),
                        field: Translation.getErrorColumn(this.fieldProperty, 'field'),
                        mapOn: Translation.getArrowColumn(this.fieldProperty),
                        collectionIdLabel: Translation.getErrorColumn(this.fieldProperty, 'collectionId'),
                        propertyLabel: Translation.getErrorColumn(this.fieldProperty, 'property'),
                        // calculationCode: {
                        //     filter: false,
                        //     sort: false,
                        //     editable: false,
                        //     title: Translation.getColumnTitle('code', this.fieldProperty),
                        // }
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
                        custom: Translation.getCustomActions([Tab.DATA_GROUPS, Tab.COLLECTIONS], translate)
                    }
                }
            }]
        ];
    }
}
