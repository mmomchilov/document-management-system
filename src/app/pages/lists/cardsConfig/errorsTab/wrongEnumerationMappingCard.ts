import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { ExtractData } from '../../extractData';
import { Translation } from '../translation';
import { Tab } from '../tabDefinition';

export class WrongEnumerationMappingCardConfig {

    private static path = 'errorLst';
    private static fieldProperty = 'wrongEnumerationMappingLst';

    static getFieldLst(): string[] {
        return [
            'businessContext',
            'dataGroupLst',
            'calcMappingLst',
            'mapping'
        ];
    }

    static generate(wrongEnumerationMappingLst, collectionDefinitions, enumerationLst, navigateFunc, translate)
        : CardConfiguration {
        return {
            title: Translation.getCardTitleWithIcon('severe', this.fieldProperty, translate),
            isOpenedHeader: true,
            openCloseHeader: false,
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(wrongEnumerationMappingLst, collectionDefinitions,
                    enumerationLst, navigateFunc, translate)
            }
        };
    }
    private static getLabelsDataTypesCard(wrongEnumerationMappingLst, collectionDefinitions, enumerationLst,
        navigateFunc, translate)
        : WidgetConfiguration[][] {
        const wrongEnumerationMappingLstTmp = ExtractData
            .translateCollectionsAndProperties(wrongEnumerationMappingLst, collectionDefinitions, translate);
        const wrongEnumerationMappingLstExpectedEnumTranslated = ExtractData
            .translateEnumerations(wrongEnumerationMappingLstTmp, collectionDefinitions, translate);
        const wrongEnumerationMappingLstTranslated = wrongEnumerationMappingLstExpectedEnumTranslated
            .map(el => {
                const enumerationCode = el.enumeration;
                const enumeration = enumerationLst.find(enumDef => enumDef.code === enumerationCode);
                let translatedEnumeration = el.enumerationRefId;
                if (enumeration && enumeration.mapping) {
                    const enumRef = enumeration.mapping.enumReference || {};
                    const database = enumRef.database;
                    if (database) {
                        const databaseEnumCode = enumRef.enumId;
                        const labelPath = `localizationEnumRef.${database}.${databaseEnumCode}.label`;
                        translatedEnumeration = translate.instant(labelPath);
                    }
                }
                el.enumerationRefIdLabel = translatedEnumeration;
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
                items: wrongEnumerationMappingLstTranslated,
                columnSize: '12',
                settings: {
                    columns: {
                        dataGroup: Translation.getErrorColumn(this.fieldProperty, 'dataGroup'),
                        field: Translation.getErrorColumn(this.fieldProperty, 'field'),
                        enumerationRefIdLabel: Translation.getErrorColumn(this.fieldProperty, 'enumerationRefId'),
                        arrow: Translation.getArrowColumn(this.fieldProperty),
                        collectionIdLabel: Translation.getErrorColumn(this.fieldProperty, 'collectionId'),
                        propertyLabel: Translation.getErrorColumn(this.fieldProperty, 'property'),
                        expectedEnumerationLabel: Translation.getErrorColumn(this.fieldProperty, 'expectedEnumeration')
                    },
                    actions: {
                        edit: false,
                        delete: false,
                        add: false,
                        custom: Translation.getCustomActions([Tab.DATA_GROUPS, Tab.COLLECTIONS, Tab.ENUMERATIONS],
                            translate)
                    }
                }
            }]
        ];
    }
}
