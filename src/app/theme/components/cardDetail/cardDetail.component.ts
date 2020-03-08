import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ValidationComponent } from '../../../pages/common/components/common/validation';
import { JsonPath } from './../../services/jsonPath';
import { CardContentConfiguration } from './configurationClasses/cardContentConfiguration';
import { Subscription } from 'rxjs';
import { ContainerCommunication } from '../contentContainer/containerCommunication.service';

@Component({
  selector: 'gen-card-detail',
  templateUrl: './cardDetail.component.html',
  styleUrls: ['./cardDetail.component.scss']
})

export class CardDetailComponent extends ValidationComponent implements OnInit, OnDestroy {

  @Input() parentId = '';
  @Input() locale = 'fr';
  @Input() displayMode: string;
  @Input() title: string;
  @Input() openCloseHeader: boolean = true;
  @Input() actions: any;
  @Input() content: CardContentConfiguration;
  @Input() database: string;
  @Input() collectionId: string;
  @Input() collection: any;
  @Input() originalCollection: any;
  @Input() columnSize: number;
  @Input() cards: FormArray;
  @Input() cardClass: string;
  @Input() isOpenedHeader: boolean = true;
  @Input() id: string = 'card';
  @Input() communicationService: ContainerCommunication;

  @Output() onAction = new EventEmitter();
  @Output() selectedNode = new EventEmitter();
  @Output() onShowDetails: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() tabsChange = new EventEmitter();
  @Output() onChange = new EventEmitter();
  private subscription: Subscription;
  private subscriptionTrad: Subscription;

  constructor(protected translate: TranslateService, private fb: FormBuilder, private jsonPath: JsonPath) {
    super(translate);
    this.subscriptionTrad = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang) {
        this.locale = event.lang.split('_')[0];
      }
    });
  }

  ngOnInit() {
    if (!this.communicationService) {
      this.communicationService = new ContainerCommunication();
    }
    if (this.communicationService) {
      this.subscription = this.communicationService.updatesForId(this.id)
        .subscribe(configUpdate => {
          const changeData = configUpdate.changeData;
          const newValue = configUpdate.newValue;
          if (changeData.cardClass) {
            this.cardClass = changeData.cardClass(newValue, { collection: this.collection });
          }
          if (changeData.isOpenedHeader) {
            this.isOpenedHeader = changeData.isOpenedHeader(newValue, { collection: this.collection });
          }
        }
        );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionTrad) {
      this.subscriptionTrad.unsubscribe();
    }
  }

  handleAction(action) {
    this.onAction.emit(action.action);
  }

  showHideDetails() {
    this.isOpenedHeader = !this.isOpenedHeader;
  }

  showDetails(event: any) {
    this.onShowDetails.emit(event);
  }

  handleSelectedNode(event) {
    this.selectedNode.emit(event);
  }

  update(event) {
    this.onChange.emit(event);
  }

  tabsChangeEmit(event) {
    this.tabsChange.emit(event);
  }
}
