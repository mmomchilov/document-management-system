import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ba-card',
  templateUrl: './baCard.html',
  styleUrls: ['./customStyle.scss'],
})
export class BaCard {
  @Input() title: String;
  @Input() baCardClass: String;
  @Input() cardType: String;
  @Input() bgColor: String;
  @Input() titleBgColor: String;
  @Input() fadeIn: boolean;
  @Input() icon: String;
  @Input() iconColor: String = 'green';
  @Input() collectionHeader: boolean;
  @Input() openCloseHeader: boolean;
  @Input() openedHeader: boolean;
  @Input() actions = { delete: false, add: false };
  @Input() selectedItem: any;
  @Output() onClickEvent = new EventEmitter();
  @Output() onAction = new EventEmitter();
  centerTitle: boolean = false;


  constructor() { }

  ngOnInit() {
    if (this.baCardClass && this.baCardClass.includes('text-center')) {
      this.centerTitle = true;
    } else {
      this.centerTitle = false;
    }
  }

  handleClick(item: any) {
    this.onClickEvent.emit(this.selectedItem);
  }

  handleAction(action: string) {
    this.onAction.emit({ action });
  }

}
