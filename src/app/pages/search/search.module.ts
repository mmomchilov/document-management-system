import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SearchService, CollectionDetailsService } from '../../theme';
import { TranslateModule } from '@ngx-translate/core';
import { SearchComponent } from './search.component';
import { routing }       from './search.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    ModalModule.forRoot(),
    routing,
    Ng2SmartTableModule,
    TranslateModule
  ],
  declarations: [
    SearchComponent
  ],
  providers: [SearchService, CollectionDetailsService]
})
export class SearchModule {}
