import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomServerDataSource } from '../../../pages/search/custom.data-source';
import { SearchService } from '../../../theme/services/search';
// import { GlobalState } from '../../../global.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gen-view-table',
  templateUrl: './viewTable.component.html',
  styleUrls: ['./viewTable.component.scss'],
  providers: [CustomServerDataSource]
})

export class ViewTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() displayMode = 'r';
  @Input() id;
  @Input() data;
  @Input() database;
  @Input() collectionId;
  @Input() keyWord;
  @Input() limitPerPage;
  @Input() columnsListTofilter;
  @Input() settings;
  @Input() hasMonitoring: boolean = false;
  @Output() userRowClick = new EventEmitter();
  @Output() customAction = new EventEmitter();
  @Output() editConfirm = new EventEmitter();
  @Output() createConfirm = new EventEmitter();
  @Output() deleteConfirm = new EventEmitter();

  entityList: any = {};
  entitySource: any;
  private errorMessage: any = {};
  private titles;
  private subscription: Subscription;

  constructor(private http: HttpClient,
    private translate: TranslateService, private searchService: SearchService) {
    // console.log('this.settings???????????????????????', this.settings);
    // private _state: GlobalState

    // this.subscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   // this.updateSettings();
    //   this.settings = Object.assign({}, this.settings); // copy object to force reloading of smart table component
    // });
  }

  ngOnInit() {
    console.log('this.settings???????????????????????', this.settings);
    this.storeTitleKeys();
    // this.updateSettings();
    if (this.data || this.data === []) {
      this.entitySource = this.data;
    } else {
      this.loadEntities(this.keyWord);
    }
    // console.log('this.parentForm', this.parentForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.keyWord) {
      const keyWord: SimpleChange = changes.keyWord;
      if (keyWord.previousValue !== keyWord.currentValue) {
        this.loadEntities(keyWord.currentValue);
      }
    }
    if (changes.data) {
      this.entitySource = changes.data.currentValue;
    }
    if (changes.settings && changes.settings.currentValue && !changes.settings.firstChange) {
      this.settings = changes.settings.currentValue;
      this.updateSettings();
      this.settings = Object.assign({}, this.settings);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  edit(event) {
    this.editConfirm.emit(event);
  }

  addNew(event) {
    this.createConfirm.emit(event);
  }

  delete(event) {
    this.deleteConfirm.emit(event);
  }

  onCustomAction(event) {
    this.customAction.emit(event);
  }

  selectRow(convention: any) {
    this.userRowClick.emit(convention);
  }

  onRefresh(event: any) {
    if (this.entityList) {
      setTimeout(() => {
        this.search(this.keyWord);
        setTimeout(() => {
          this.onProcess(event);
        }, 500);
      }, 1000);
    }
  }

  onProcess(event: any) {
    this.updateRows(event, this.id, 'process-waiting');
  }

  private updateRows(event: any, idValue: string, className: string) {

    if (event && event.items && event.items.length > 0) {
      const spans: NodeListOf<HTMLSpanElement> = document.getElementById(idValue).querySelectorAll('span.hiddenColumn');
      for (let i = 0; i < spans.length; i++) {
        const buid = spans[i].innerHTML;
        if (event.items.filter(item => item.buid === buid).length > 0) {
          spans[i].closest('tr').classList.add(className);
        }
      }
    }
  }

  private updateSettings() {
    console.log('this.settings updateSettings', this.settings);
    const translatedSetting = this.translateLabels(this.settings);
    const modifiedInputSettings = this.addDefaultSetting(translatedSetting);
    this.addTechnicalColumn(modifiedInputSettings);

    this.settings = modifiedInputSettings;
  }

  private addTechnicalColumn(modifiedInputSettings: any) {
    if (this.hasMonitoring) {
      modifiedInputSettings.columns.technicalColumn = {
        title: '',
        type: 'html',
        valuePrepareFunction: (value, row) => `<span class="hiddenColumn">${row.BUID}</span>`,
        rank: modifiedInputSettings.length
      };
    }
  }

  /**
   * Store original titles to use for translation
   */
  private storeTitleKeys() {
    const columns = this.settings.columns;
    this.titles = {};
    Object.keys(columns).map(key => this.titles[key] = columns[key].title);
  }

  /**
   * Translate all labels and save them in titles
   * Number all properties with rank iterator to save the order.
   * @param settings Json with configurations
   * @return Updated setting file
   */
  private translateLabels(settings: any): any {
    const columns = this.settings.columns;
    let rankIterator = 1;
    Object.keys(columns).map(key => {
      const columnKey = columns[key];
      const labelCode = this.titles[key];
      columnKey.title = labelCode ? this.translate.instant(labelCode) : '';
      columnKey.rank = rankIterator++;

      this.translateEnum(columns, key);
    });
    settings[columns] = columns;

    return Object.assign(settings, { columns });
  }

  /**
   * Add default values of json table configuration if not exists
   * @param settings Json with configurations
   * @return Updated setting file
   */
  private addDefaultSetting(settings: any): any {
    let actionsDflt;
    let hideSubHeaderDflt: boolean;
    if (this.displayMode === 'r') {
      actionsDflt = { edit: false, delete: false, add: false };
      hideSubHeaderDflt = true;
    } else {
      actionsDflt = { edit: true, delete: true, add: true };
      hideSubHeaderDflt = false;
    }
    const defaultProperties = {
      noDataMessage: this.translate.instant('localizationResource.common.no_data_found.shortLabel'),
      isPaginationEnabled: true,
      pager: { perPage: this.limitPerPage },
      actions: actionsDflt,
      hideSubHeader: hideSubHeaderDflt
    };

    return Object.assign(defaultProperties, settings);
  }

  private translateEnum(columns: any, key: string) {
    const columnKey = columns[key];
    const enumIdent = columnKey.enum;
    if (enumIdent) {
      const enumLabel = columnKey.enumLabel;
      columnKey.valuePrepareFunction = (value, row) => {
        const enumLabelProperty = `localizationEnumValue.${this.database}.${enumIdent}.${row[key]}.label`;
        return this.translate.instant(enumLabelProperty);
      };
      delete columnKey.enum;
    }
  }

  loadEntities(keyWordNewValue: string) {

    // if (this.collectionId === 'information-delegate') {
    //   this.entitySource = FakeDelegateReportList.search();
    //   return;
    // } 

    // temporary code
    const columnsListTofilter: any[] = [];
    const bodyDlgn = {
      'collections': [this.collectionId],
      'page': 1,
      'limitPerPage': 1,
      'columnsListTofilter': columnsListTofilter
    };

    this.searchService.loadCollectionsPerPage(bodyDlgn).subscribe(
      collectionsList => {
        this.entityList = collectionsList[this.collectionId];
        if (this.entityList) {
          this.search(keyWordNewValue);
        }
      },
      error => this.errorMessage = <any>error
    );
  }

  search(keyWordNewValue: String) {
    this.entitySource = new CustomServerDataSource(this.http);
    this.entitySource.setCollectionId(this.collectionId);
    this.entitySource.setSearch(keyWordNewValue);
    this.entitySource.setColumnsListTofilter(this.columnsListTofilter);
  }
}
