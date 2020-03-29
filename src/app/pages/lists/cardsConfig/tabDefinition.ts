import { StorageConfig } from '../storageConfig';

export enum Tab {
    DESCRIPTION = 'description',
    FORMAT = 'format',
    ENUMERATIONS = 'enumerations',
    DATA_GROUPS = 'data groups',
    CALCULATED_FIELDS = 'calculatedMapping',
    COLLECTIONS = 'collections',
    ORDERING_DESCRIPTION = 'orderingDescriptionLst',
    ERRORS = 'errors',
    HISTORY = 'history'
}
export class TabsDefinition {

    private static collectionId = StorageConfig.COLLECTION_ID;
    private static database = StorageConfig.DATABASE;

    static getTabs(displayMode: string = 'r', selectedTab: string = '') {
        const tabLst = [
            { id: Tab.DESCRIPTION, title: 'tabTitleDescriptions', collectionId: undefined, icon: '' },
            { id: Tab.FORMAT, title: 'tabTitleFormats', icon: '' },
            { id: Tab.ENUMERATIONS, title: 'tabTitleEnumartions', icon: 'fa fa-list-ol' },
            { id: Tab.DATA_GROUPS, title: 'tabTitleDataMapping', icon: 'fa fa-sitemap' },
            { id: Tab.CALCULATED_FIELDS, title: 'tabCalculatedMapping', icon: 'fa fa-gears' },
            { id: Tab.COLLECTIONS, icon: 'fa fa-arrows-h' },
            { id: Tab.ORDERING_DESCRIPTION, icon: 'fa fa-sort-numeric-asc' },
            { id: Tab.ERRORS, icon: '' }
        ];
        // hide Historical changes tab
        // if (displayMode !== 'c') {
        //     tabLst.push({
        //         id: Tab.HISTORY,
        //         collectionId: 'message-history-configuration',
        //         title: 'tabHistoricalChangesTitle'
        //     });
        // }
        return tabLst.map(tab => {
            const tabId = tab.id;
            let titleCode = tab.title;
            if (!titleCode) {
                const tabIdUppercase = tabId.charAt(0).toUpperCase() + tabId.slice(1);
                titleCode = `tabTitle${tabIdUppercase}`;
            }

            const result = {
                title: this.getTabTitle(titleCode),
                id: tabId,
                icon: tab.icon,
                content: []
            };
            if (selectedTab === tabId) {
                result['active'] = true;
            }
            return result;
        });
    }

    static getTabTitle(key) {
        return `localizationResource.${this.database}.${this.collectionId}.${key}.shortLabel`;
    }
}
