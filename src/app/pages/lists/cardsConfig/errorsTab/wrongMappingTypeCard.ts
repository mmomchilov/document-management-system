import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { ExtractData } from '../../extractData';
import { Translation } from '../translation';
import { Tab } from '../tabDefinition';

export class WrongMappingTypeCardConfig {

    private static path = 'errorLst';
    private static fieldProperty = 'wrongMappingTypeLst';

    static getFieldLst(): string[] {
        return [
            'businessContext',
            'dataGroupLst',
            'calcMappingLst',
            'mapping'
        ];
    }

    static generate(wrongMappingTypeLst, collectionDefinitions, navigateFunc, translate): CardConfiguration {
        return {
            title: Translation.getCardTitleWithIcon('warning', this.fieldProperty, translate),
            isOpenedHeader: true,
            openCloseHeader: false, 
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(wrongMappingTypeLst, collectionDefinitions, navigateFunc, translate)
            }
        };
    }
    private static getLabelsDataTypesCard(wrongMappingTypeLst, collectionDefinitions, navigateFunc, translate)
        : WidgetConfiguration[][] {
        const wrongMappingTypeLstTmp = ExtractData
            .translateCollectionsAndProperties(wrongMappingTypeLst, collectionDefinitions, translate);
        const wrongMappingTypeLstTranslated = wrongMappingTypeLstTmp.map(elTmp => {
            const el = Object.assign(elTmp, {});
            el.expectedTypeLabel = this.translateDataType(el.expectedType, translate);
            el.fieldTypeLabel = this.translateDataType(el.fieldType, translate);
            return el;
        });

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
                items: wrongMappingTypeLstTranslated,
                columnSize: '12',
                settings: {
                    columns: {
                        dataGroup: Translation.getErrorColumn(this.fieldProperty, 'dataGroup'),
                        field: Translation.getErrorColumn(this.fieldProperty, 'field'),
                        fieldTypeLabel: Translation.getErrorColumn(this.fieldProperty, 'fieldType'),
                        arrow: Translation.getArrowColumn(this.fieldProperty),
                        collectionIdLabel: Translation.getErrorColumn(this.fieldProperty, 'collectionId'),
                        propertyLabel: Translation.getErrorColumn(this.fieldProperty, 'property'),
                        expectedTypeLabel: Translation.getErrorColumn(this.fieldProperty, 'expectedType')
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

    private static translateDataType(dataType, translate) {
        const localization = `localizationEnumValue.message-configuration.datatype.${dataType}.label`;
        const translated = translate.instant(localization);
        return translated;
    }
}
