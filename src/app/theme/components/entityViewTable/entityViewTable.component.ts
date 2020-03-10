import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CustomServerDataSource } from '../../../pages/search/custom.data-source';

@Component({
  selector: 'gen-entity-view-table',
  templateUrl: './entityViewTable.component.html',
  styleUrls: ['./entityViewTable.component.scss'],
  providers: [CustomServerDataSource]
})

export class EntityViewTableComponent implements OnInit {
  @Input() database: string;
  @Input() collectionId: string;
  @Input() limitPerPage;
  @Input() columnsListTofilter;
  @Input() buttonLabel: string;
  @Input() buttonHide: boolean;
  @Input() settings;
  @Input() id: string;
  @Input() hasPageHeader: boolean = true;
  @Input() hasSearchBar: boolean = true;
  @Output() onClickButton = new EventEmitter();
  @Output() onRowSelection = new EventEmitter();

  keyWord: String = null;
  keyWordComplete: String = null;

  constructor() {
  }

  ngOnInit() {
  }

  clickButton() {
    this.onClickButton.emit({});
  }

  selectRow(convention: any) {
    this.onRowSelection.emit({ convention });
  }

  loadEntities() {
    this.keyWordComplete = this.keyWord;
  }
}
