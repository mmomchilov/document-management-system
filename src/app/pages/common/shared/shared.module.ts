import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
	imports: [ CommonModule, RouterModule, HttpClientModule, TranslateModule.forRoot() ],
	declarations: [],
	exports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, TranslateModule ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: []
		};
	}
}
