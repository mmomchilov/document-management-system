import { WidgetConfiguration, DefaultValueRule } from './../../../../app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from '../storageConfig';
import { CustomEditorComponent } from './collections/tableRenders/customEditor';
import { Component } from '@angular/core';

@Component({
    templateUrl: './collections/tableRenders/customEditor.component.html',
})

export class ConcatenationEditorComponent extends CustomEditorComponent {


    database = StorageConfig.DATABASE;
    collectionId = StorageConfig.COLLECTION_ID;

    protected getFields(config): WidgetConfiguration[][] {
        const dataGroupLst = config.dataGroupLst;
        const fields = config.fields;
        return [
            [{
                field: 'type',
                label: this.getTitle('type'),
                type: 'select',
                defaultValueRule: DefaultValueRule.SINGLE_ITEM_LIST,
                options: () => [{ code: 'field', display: 'Field' }],
                storeData: (collection, newVal) => {
                    collection.type = newVal;
                    collection.value = {};
                },
                columnSize: 4
            },
            {
                field: 'dataGroup',
                path: 'value.',
                label: this.getTitle('dataGroup'),
                type: 'select',
                defaultValueRule: DefaultValueRule.SINGLE_ITEM_LIST,
                options: () => dataGroupLst,
                onChangeValue: [
                    {
                        field: 'field',
                        fieldVal: undefined,
                        options: dataGroup => fields[dataGroup]
                    }],
                hidden: (collection => collection.type !== 'field'),
                columnSize: 4
            },
            {
                field: 'field',
                path: 'value.',
                label: this.getTitle('field'),
                type: 'select',
                defaultValueRule: DefaultValueRule.SINGLE_ITEM_LIST,
                options: (collection) => {
                    const val = collection.value;
                    if (val && val.dataGroup) {
                        return fields[val.dataGroup];
                    }
                    return [];
                },
                hidden: (collection => collection.type !== 'field'),
                columnSize: 4
            }]
        ];
    }

    private getTitle(field) {
        return `localizationProperty.${this.database}.${this.collectionId}.calcDataLst.${field}.shortLabel`;
    }
}
