import { NgModule } from '@angular/core';
import { FieldRenderComponent } from './fieldRender';
import { FieldEditorComponent } from './fieldEditor';
import { NgaModule } from './../../../../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { MappingEditorComponent } from './mappingEditor';
import { MappingRenderComponent } from './mappingRender';
import { ConcatenationEditorComponent } from '../../concatenationEditor';
import { ConcatenationRenderComponent } from '../../concatenationRender';
import { CustomEditorComponent } from './customEditor';
import { DeployButtonRenderComponent } from './deployButtonRender';
import { CustomCheckboxRenderComponent } from './customCheckboxRender.component';
import { CustomCheckboxEditorComponent } from './customCheckboxEditor.component';
import { CustomInputEditorComponent } from './customInputEditor.component';

@NgModule({
    imports: [
        NgaModule,
        CommonModule
    ],
    declarations: [
        CustomCheckboxRenderComponent,
        CustomCheckboxEditorComponent,
        CustomInputEditorComponent,
        FieldRenderComponent,
        FieldEditorComponent,
        MappingRenderComponent,
        MappingEditorComponent,
        ConcatenationEditorComponent,
        ConcatenationRenderComponent,
        CustomEditorComponent,
        DeployButtonRenderComponent
    ],
    entryComponents: [
        CustomCheckboxRenderComponent,
        CustomCheckboxEditorComponent,
        CustomInputEditorComponent,
        FieldRenderComponent,
        FieldEditorComponent,
        MappingRenderComponent,
        MappingEditorComponent,
        ConcatenationEditorComponent,
        ConcatenationRenderComponent,
        CustomEditorComponent,
        DeployButtonRenderComponent
    ]
})
export class CustomRenderModule { }
