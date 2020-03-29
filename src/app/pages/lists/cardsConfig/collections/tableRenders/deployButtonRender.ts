import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ValidationComponent } from './../../../../../../app/pages/common/components/common/validation';
import { MessageConfigurationService } from './../../../../../../app/theme/services/messageConfiguration/messageConfigurationService.service';

@Component({
    template: `
    <button type="button"
            class="btn btn-success header"
            (click)="deploy($event)">{{deployLabel}}
    </button>
  `,
    styleUrls: ['./customStyle.scss'],
    providers: [MessageConfigurationService]
})
export class DeployButtonRenderComponent extends ValidationComponent implements ViewCell, OnInit {
    @Input() value;
    @Input() rowData: any;

    deployLabel;
    constructor(protected translate: TranslateService,
        protected _messageConfigurationService: MessageConfigurationService) {
        super(translate);
        this.deployLabel = this.translate.instant('localizationResource.message-configuration.message-conf-mapping.deploy.shortLabel');
    }

    ngOnInit() { }

    deploy(event) {
        if (this.rowData && this.rowData['BUID']) {
            this._messageConfigurationService.generateMessageTechnicalFile(this.rowData['BUID'])
                .subscribe(res => { console.log('Result from deploy ', res); });
            event.stopPropagation();
        }
    }
}
