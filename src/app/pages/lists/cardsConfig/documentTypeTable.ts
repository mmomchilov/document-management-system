import { UtilCharts } from '../../pagesUtils/utilCharts';
import { FieldEditorComponent } from './collections/tableRenders/fieldEditor';
import { FieldRenderComponent } from './collections/tableRenders/fieldRender';
import { MappingRenderComponent } from './collections/tableRenders/mappingRender';
import { MappingEditorComponent } from './collections/tableRenders/mappingEditor';
import { DeployButtonRenderComponent } from './collections/tableRenders/deployButtonRender';
import { CustomCheckboxRenderComponent } from './collections/tableRenders/customCheckboxRender.component';
import { CustomCheckboxEditorComponent } from './collections/tableRenders/customCheckboxEditor.component';

export class DocumentTypeTable {

    static generateColumns(translateService): any {
        return {
            shortType: {
                //  title: 'localizationResource.referential.dashboard.riskFamily.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[0],
                width: '5%'
                //   ${UtilCharts.translateLabel('typerisk', value, translateService)} 
            },
            descriptionType: {
                // title: 'localizationResource.referential.dashboard.srvcType.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[1],
                width: '65%'
            },
            enableColumn: {
                title: UtilCharts.translatedDocumentTypeTable[2],
                //  type: 'checkbox', // ?? renderer???
                width: '10%',
                type: 'custom',

                renderComponent: CustomCheckboxRenderComponent,
                editor: {
                    type: 'custom',
                    component: CustomCheckboxEditorComponent
                }

                // renderComponent: MappingRenderComponent,
                // editor: {
                //     type: 'custom',
                //     config: {
                //         dataGroupLst: null, // dataGroupLstOptions,
                //         fields: null, // fieldsConfig,
                //         calculatedLst: null// calculatedMappingLst
                //     },
                //     component: MappingEditorComponent
                // }
                //  renderComponent: DeployButtonRenderComponent // working!!!!S

            },
            whoModified: {
                // title: 'localizationResource.referential.dashboard.clmFldrNbr.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[3],
                width: '10%'
            },

            whenModified: {
                // title: 'localizationResource.referential.dashboard.opndClmFldrNbr.shortLabel',
                title: UtilCharts.translatedDocumentTypeTable[4],
                width: '10%'
            },

        };
    }
    static mockData(): any {
        return [
            {
                shortType: 'Ger',
                descriptionType: 'german',
                enableColumn: true,
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortType: 'En',
                descriptionType: 'english',
                enableColumn: false,
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            // {
            //     shortType: 'Fr',
            //     descriptionType: 'french',
            //     enable: true,
            //     whoModified: 'Capital',
            //     whenModified: '1/1/2020',
            // },
            // {
            //     shortType: 'Bul',
            //     descriptionType: 'Bulgarian',
            //     enable: true,
            //     whoModified: 'someone',
            //     whenModified: '1/1/2020',
            // },
            // {
            //     shortType: 'It',
            //     descriptionType: 'Italian',
            //     enable: true,
            //     whoModified: 'someone',
            //     whenModified: '1/1/2020',
            // },
            // {
            //     shortType: 'Multi',
            //     descriptionType: 'Multilingual',
            //     enable: true,
            //     whoModified: 'someone',
            //     whenModified: '1/1/2020',
            // },

        ];
    }
}
