
// import { TabConfiguration } from 'app/theme/components/cardDetail/configurationClasses/tabConfigurationts';

// import { RiskAndProtectTable1 } from './riskAndProtectTable1';

import { DocumentLanguageTable } from './documentLanguageTable';
import { UtilCharts } from '../../pagesUtils/utilCharts';
import { TabConfiguration } from 'src/app/theme/components/cardDetail/configurationClasses/tabConfigurationts';
import { DocumentTypeTable } from './documentTypeTable';
import { DocumentStatusTable } from './documentStatusTable';

export class ListsConfig {

    static generateCard(result, optionalParams, selectedTab, translate): any {
        // const me = UtilCharts.translatedTitleLabels['healthTable1'];
        // console.log('me', me);

        return {
            title: 'listsCard', // 'localizationResource.common.dashboard.keyNumbers.shortLabel',
            isOpenedHeader: true,
            columnSize: 12,
            minContentHeight: 'content-minimum-medium',
            content: {
                type: 'simpleInputs',
                fields: [
                    [
                        {
                            type: 'editableTable',
                            columnSize: 4,
                            settings: {
                                pager: { display: false },
                                actions: { edit: false, delete: false, add: false },
                                hideSubHeader: true,
                                columns: DocumentTypeTable.generateColumns(translate)

                            },
                            //   items: data[0]
                        },
                        {
                            type: 'editableTable',
                            columnSize: 4,
                            settings: {
                                pager: { display: false },
                                actions: { edit: false, delete: false, add: false },
                                hideSubHeader: true,
                                columns: DocumentStatusTable.generateColumns(translate)
                            },
                             items: DocumentStatusTable.mockData()
                        }
                        ,

                        {
                            type: 'editableTable',
                            columnSize: 4,
                            settings: {
                                pager: { display: false },
                                actions: { edit: false, delete: false, add: false },
                                hideSubHeader: true,
                                columns: DocumentLanguageTable.generateColumns(translate)
                            },
                            items: DocumentLanguageTable.mockData()
                        }
                    ]
                ]
            }
        };
    }
}
