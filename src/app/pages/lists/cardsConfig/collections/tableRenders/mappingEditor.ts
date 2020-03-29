import { AfterViewInit, OnInit } from '@angular/core';
import { WidgetConfiguration } from './../../../../../../app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from '../../../storageConfig';
import { CustomEditorComponent } from './customEditor';

export class MappingEditorComponent extends CustomEditorComponent implements AfterViewInit, OnInit {

    database = StorageConfig.DATABASE;
    collectionId = StorageConfig.COLLECTION_ID;

    protected getFields(config): WidgetConfiguration[][] {
        const dataGroupLst = config.dataGroupLst;
        const fields = config.fields;
        const calculatedFields = config.calculatedLst;
        return config;
    }

    private getTitle(field) {
        return `localizationProperty.${this.database}.${this.collectionId}.collectionLst.${field}.shortLabel`;
    }
}
