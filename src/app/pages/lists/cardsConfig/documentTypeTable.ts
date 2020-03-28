import { UtilCharts } from '../../pagesUtils/utilCharts';
import { FieldRenderComponent } from '../../cardsConfig/collections/tableRenders/fieldRender';
import { FieldEditorComponent } from '../../cardsConfig/collections/tableRenders/fieldEditor';
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
                // title: 'lllllllllllllll',
                type: 'custom',
                renderComponent: FieldRenderComponent,
                // editor: {
                //     type: 'custom',
                //     component: FieldEditorComponent
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
                enable: true,
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortType: 'En',
                descriptionType: 'english',
                enable: true,
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortType: 'Fr',
                descriptionType: 'french',
                enable: true,
                whoModified: 'Capital',
                whenModified: '1/1/2020',
            },
            {
                shortType: 'Bul',
                descriptionType: 'Bulgarian',
                enable: true,
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortType: 'It',
                descriptionType: 'Italian',
                enable: true,
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },
            {
                shortType: 'Multi',
                descriptionType: 'Multilingual',
                enable: true,
                whoModified: 'someone',
                whenModified: '1/1/2020',
            },

        ];
    }
}
