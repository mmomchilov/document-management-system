import { Component, AfterViewInit, Output, OnInit } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
import { EventEmitter } from 'events';
import { WidgetConfiguration } from './../../../../../../app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { FormArray } from '@angular/forms';
import { ContentConfiguration } from './../../../../../../app/theme/components/contentContainer/contentConfiguration';

@Component({
    templateUrl: './customEditor.component.html',
})
export class CustomEditorComponent extends DefaultEditor implements AfterViewInit, OnInit {

    collection;
    originalCollection;
    config: ContentConfiguration;
    cards = new FormArray([]);
    displayMode = 'u';
    database;
    collectionId;

    @Output() valueChanged = new EventEmitter();

    constructor() {
        super();
    }

    ngOnInit() {
        this.collection = Object.assign({}, this.cell.getValue());
        this.originalCollection = Object.assign({}, this.cell.getValue());
        const config = this.cell.getColumn().getConfig();

        this.config = { list: this.getFields(config) };
    }

    ngAfterViewInit() {
        if (this.cell.newValue) {
            this.collection = Object.assign({}, this.cell.newValue);
        }
    }

    update(input) {
        this.cell.newValue = input.collection;
    }

    protected getFields(config): WidgetConfiguration[][] {
        return [];
    }

}
