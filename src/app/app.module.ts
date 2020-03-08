import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgaModule } from './theme/nga.module';

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateCustomLoader } from './theme/components';
import { CustomMissingTranslationHandler } from './theme/components/';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    NgaModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    TranslateModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateCustomLoader },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomMissingTranslationHandler }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
