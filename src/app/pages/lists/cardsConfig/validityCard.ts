import { DateComparatorEnum } from '../../../common/components/common/validation';
import { DateUtils } from '../../../../pages/common/components/utils/data-utils';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { Translation } from './translation';

export class ValidityCardConfig {

    static getFieldLst(): string[] {
        return [
            'status',
            'startDate',
            'terminationDate',
            'statusDate'
        ];
    }

    static generate(userTitle: string): CardConfiguration {
        return {
            title: Translation.getCartTitle('validation'),
            isOpenedHeader: true,
            columnSize: 4,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsValidationPeriodCard(userTitle)
            }
        };
    }

    private static getLabelsValidationPeriodCard(userTitle: string): WidgetConfiguration[][] {
        return [
            [{
                field: 'status',
                type: 'select',
                enum: 'status',
                onChangeValue: [{
                    field: 'statusDate',
                    fieldVal: (newStatus => DateUtils.getCurrentMongoDate())
                }],
                validators: {
                    isRequired: true
                },
                columnSize: '12'
            }],
            [{
                field: 'startDate',
                type: 'date',
                validators: {
                    isRequired: true
                },
                columnSize: '12'
            }],
            [{
                field: 'terminationDate',
                type: 'date',
                validators: {
                    isRequired: true,
                    date: {
                        otherDate: 'startDate',
                        dateComparator: DateComparatorEnum.LowerOrEqual
                    }
                },
                columnSize: '12'
            }],
            [
                {
                    field: 'statusDate',
                    type: 'date',
                    disabledDisplayModes: 'cu',
                    columnSize: '10'
                },
                {
                    type: 'user',
                    label: 'user',
                    isNotVisible: true,
                    title: userTitle
                }
            ]
        ];
    }


}
