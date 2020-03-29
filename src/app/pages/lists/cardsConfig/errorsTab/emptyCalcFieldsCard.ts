import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { Translation } from '../translation';
import { Tab } from '../tabDefinition';

export class EmptyCalcFieldsCardConfig {

    private static path = 'errorLst';
    private static fieldProperty = 'emptyCalcFieldLst';

    static getFieldLst(): string[] {
        return [
            'calcMappingLst'
        ];
    }

    static generate(translate, navigateFunc): CardConfiguration {
        return {
            title: Translation.getCardTitleWithIcon('severe', this.fieldProperty, translate),
            isOpenedHeader: true,
            openCloseHeader: false,
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsDataTypesCard(translate, navigateFunc)
            }
        };
    }
    private static getLabelsDataTypesCard(translate, navigateFunc): WidgetConfiguration[][] {
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
                columnSize: '12',
                settings: {
                    columns: {
                        code: Translation.getErrorColumn(this.fieldProperty, 'code')
                        // code: {
                        //     filter: false,
                        //     sort: false,
                        //     title:Translation.getColumnTitle('code', this.fieldProperty),
                        //     editable: false
                        // }
                    },
                    actions: {
                        edit: false,
                        delete: false,
                        add: false,
                        custom: Translation.getCustomActions([Tab.CALCULATED_FIELDS], translate)
                    }
                }
            }]
        ];
    }
}
