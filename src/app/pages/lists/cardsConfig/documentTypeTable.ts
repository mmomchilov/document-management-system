import { UtilCharts } from '../../pagesUtils/utilCharts';
import { FieldEditorComponent } from './collections/tableRenders/fieldEditor';
import { FieldRenderComponent } from './collections/tableRenders/fieldRender';
import { MappingRenderComponent } from './collections/tableRenders/mappingRender';
import { MappingEditorComponent } from './collections/tableRenders/mappingEditor';
import { DeployButtonRenderComponent } from './collections/tableRenders/deployButtonRender';

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
            enable: {
                title: UtilCharts.translatedDocumentTypeTable[2],
                //  type: 'checkbox', // ?? renderer???
                width: '10%',
                type: 'custom',
                //  renderComponent: DeployButtonRenderComponent // working!!!!S



                // title: 'lllllllllllllll',
                // type: 'custom',
                renderComponent: MappingRenderComponent,
                // editor: {
                //     type: 'custom',
                //     config: {
                //        // dataGroupLst: ['dataGroupLstOptions'],
                //         fields: [ [
                //             {
                //               filter: 'newFamilyMemberSelector',
                //               type: 'checkbox',
                //               field: 'changeEnum',
                //               // hideLabel: true,
                //               optionsName: 'changeEnum',
                //               // enum: 'delegateactvtycode',
                //               enum: 'changeEnum', // not implemented really
                //               splitSize: 12,
                //               columnSize: 12
                //             }]],
                //       //  calculatedLst: calculatedMappingLst
                //     },
                //     component: MappingEditorComponent
                // }
                //  type: 'html',
                // valuePrepareFunction: (value) => {
                //     return `<label class="checkbox-inline custom-checkbox nowrap">
                //     <input type="checkbox"
                //            name="{{config.field}}"
                //            id="{{parentId+config.field}}"
                //            value="{{value}}"
                //            [checked]=true
                //           />
                //     <span></span>
                //   </label>`;
                // },
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
                enable: {
                    type: 'calculated',
                    value: {
                        code: 'ne]o si',
                        type: 'calculated'
                    },
                    //               field: 'changeEnum'


                },
                whoModified: 'someone',
                whenModified: '1/1/2020',
            }
            // {
            //     shortType: 'En',
            //     descriptionType: 'english',
            //     enable: true,
            //     whoModified: 'someone',
            //     whenModified: '1/1/2020',
            // },
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
