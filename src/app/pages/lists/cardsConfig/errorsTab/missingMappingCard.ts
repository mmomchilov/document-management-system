import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { ExtractData } from '../../extractData';
import { Translation } from '../translation';
import { Tab } from '../tabDefinition';

export class MissingMappingCardConfig {

    private static path = 'errorLst';
    private static fieldProperty = 'missingMappingLst';

    static getFieldLst(): string[] {
        return [
            'businessContext',
            'dataGroupLst',
            'calcMappingLst',
            'enumerationLst',
            'mapping',
            'errorLst'
        ];
    }

    static generate(missingMappingLst, collectionDefinitions, translate, navigateFunc): CardConfiguration {
        return {
            title: Translation.getCardTitleWithIcon('severe', this.fieldProperty, translate),
            isOpenedHeader: true,
            openCloseHeader: false,
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(missingMappingLst, collectionDefinitions, navigateFunc, translate)
            }
        };
    }
    private static getLabelsDataTypesCard(missingMappingLst, collectionDefinitions, navigateFunc, translate)
        : WidgetConfiguration[][] {
        const missingMappingLstTranslated = ExtractData
            .translateCollectionsAndProperties(missingMappingLst, collectionDefinitions, translate);

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
                items: missingMappingLstTranslated,
                columnSize: '12',
                settings: {
                    columns: {
                        dataGroup: Translation.getErrorColumn(this.fieldProperty, 'dataGroupUnknow', false),
                        field: Translation.getErrorColumn(this.fieldProperty, 'fieldUnknow', false),
                        arrow: Translation.getArrowColumn(this.fieldProperty),
                        collectionIdLabel: Translation.getErrorColumn(this.fieldProperty, 'collectionId'),
                        propertyLabel: Translation.getErrorColumn(this.fieldProperty, 'property')
                    },
                    actions: {
                        edit: false,
                        delete: false,
                        add: false,
                        custom: Translation.getCustomActions([Tab.COLLECTIONS], translate)
                    }
                }
            }]
        ];
    }
}
