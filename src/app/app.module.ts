import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgaModule } from './theme/nga.module';

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateCustomLoader } from './theme/components';
import { CustomMissingTranslationHandler } from './theme/components/';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './pages/documents/documents.component';
import { GlobalState } from './global.state';
import { Structure } from './pages/structure';

const appRoutes: Routes = [


  { path: 'pages/documents', component: DocumentsComponent },
  { path: 'pages/structure', component: Structure },
  // { path: 'pages/structure', component: Structure },
  // { path: 'pages/structure', component: Structure },
  // { path: 'pages/structure', component: Structure },
  // { path: 'pages/structure', component: Structure },

  { path: '', redirectTo: 'pages/documents', pathMatch: 'full' },
  { path: '**', component: DocumentsComponent }
];


@NgModule({
  declarations: [
    DocumentsComponent,
    Structure,
    AppComponent
  ],
  imports: [
    HttpClientModule,
    NgaModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
      //  ,{ enableTracing: true } // <-- debugging purposes only
    ),
    TranslateModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateCustomLoader },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomMissingTranslationHandler }
    }),
  ],
  providers: [GlobalState],
  bootstrap: [AppComponent]
})
export class AppModule { }
