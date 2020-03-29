import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { Translation } from '../translation';
import { Tab } from '../tabDefinition';

export class DuplicatingFieldsCardConfig {

    private static path = 'errorLst';
    private static fieldProperty = 'doublingFieldLst';

    static getFieldLst(): string[] {
        return [
            'dataGroupLst'
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
                        dataGroup: Translation.getErrorColumn(this.fieldProperty, 'dataGroup'),
                        field: Translation.getErrorColumn(this.fieldProperty, 'field')
                    },
                    actions: {
                        edit: false,
                        delete: false,
                        add: false,
                        custom: Translation.getCustomActions([Tab.DATA_GROUPS], translate)
                    }
                }
            }]
        ];
    }
}
