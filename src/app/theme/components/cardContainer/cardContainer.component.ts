import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CardConfiguration } from '../cardDetail/configurationClasses/cardConfiguration';
import { ContainerCommunication } from '../contentContainer/containerCommunication.service';
import { NgaModule } from '../../../theme/nga.module';

@Component({
  selector: 'gen-card-container',
  templateUrl: './cardContainer.component.html',
  styleUrls: ['./cardContainer.component.scss']
})
export class CardContainerComponent implements OnInit, OnChanges {
  @Input() displayMode: any;
  @Input() database: any;
  @Input() collectionId: any;
  @Input() collection: any;
  @Input() configs: CardConfiguration[];
  @Input() parentForm: FormGroup;
  @Input() id: string = 'cards';
  @Input() communicationService: ContainerCommunication;
  @Output() onShowDetails = new EventEmitter();
  @Output() selectedNode = new EventEmitter();
  @Output() tabsChange = new EventEmitter();

  panelInTheMiddle: any;
  originalCollection: any;
  cards: FormArray = new FormArray([]);

  constructor() { }

  ngOnInit() {
    if (!this.communicationService) {
      this.communicationService = new ContainerCommunication();
    }
    this.originalCollection = Object.assign({}, this.collection);
    if (this.parentForm) {
      this.parentForm.removeControl(this.id);
      this.parentForm.addControl(this.id, this.cards);
    }
  }

  allowExpandCollapse(config) {
    if (config.openCloseHeader === false) {
      return false;
    }
    return true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configs && this.parentForm) {
      this.cards = new FormArray([]);
      console.log('this.id', this.id);
      console.log('this.parentForm', this.parentForm);
      this.parentForm.removeControl(this.id);
      this.parentForm.addControl(this.id, this.cards);
    }
  }

  getCardId(config, i) {
    const configId = config.id;
    if (configId) {
      return configId;
    }
    return `${i}`;
  }

  showDetails(value: any) {
    this.onShowDetails.emit({ value });
  }

  handleSelectedNode(event) {
    this.selectedNode.emit(event);
  }
  handleTabs(event) {
    this.tabsChange.emit(event);
  }
}
