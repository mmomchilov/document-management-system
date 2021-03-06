import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './structure.routes';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StructureComponent } from './structure.component';
// import { PartnerInfoService } from '../../theme/services/partnerInfo';

@NgModule({
  imports: [
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
    StructureComponent
  ],
  entryComponents: [],
  providers: []
  // providers: [PartnerInfoService]
})

export class StructureModule { }
