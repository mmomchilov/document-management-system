import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './lists.routes';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ListsComponent } from './lists.component';
import { CustomRenderModule } from './cardsConfig/collections/tableRenders/customRender.module';

@NgModule({
  imports: [
    CustomRenderModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    ModalModule.forRoot(),
    routing,
    Ng2SmartTableModule,
    TranslateModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    ListsComponent
  ],
 // entryComponents: [CustomRenderModule],
  providers: []
  // providers: [PartnerInfoService]
})

export class ListsModule { }
