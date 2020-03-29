import { InformationCardConfig } from './informationCard';
import { ValidityCardConfig } from './validityCard';
import { FileFormatCardConfig } from './fileFormatCard';
import { DataTypesCardConfig } from './dataTypesCard';
import { EnumerationsCardConfig } from './enumerationsCard';
import { DataGroupsCardConfig } from './dataGroups';
import { ModificationHistoryCardConfig } from './modificationHistoryCard';
import { CalculatedMappingCardConfig } from './calculatedMapping';
import { CollectionsCardConfig } from './collections/collectionsCard';
import { OrderingDescriptionCardConfig } from './orderDescCard';
import { MissingMappingCardConfig } from './errorsTab/missingMappingCard';
import { Tab } from './tabDefinition';

export class TabsConfig {

    static getFieldsForTab(tabId: string): string[] {
        let fields: string[] = [];
        switch (tabId) {
            case Tab.DESCRIPTION:
                fields = fields.concat(InformationCardConfig.getFieldLst());
                fields = fields.concat(ValidityCardConfig.getFieldLst());
                break;
            case Tab.FORMAT:
                fields = fields.concat(FileFormatCardConfig.getFieldLst());
                fields = fields.concat(DataTypesCardConfig.getFieldLst());
                break;
            case Tab.ENUMERATIONS:
                fields = fields.concat(EnumerationsCardConfig.getFieldLst());
                break;
            case Tab.DATA_GROUPS:
                fields = fields.concat(DataGroupsCardConfig.getFieldLst());
                break;
            case Tab.CALCULATED_FIELDS:
                fields = fields.concat(CalculatedMappingCardConfig.getFieldLst());
                break;
            case Tab.COLLECTIONS:
                fields = fields.concat(CollectionsCardConfig.getFieldLst());
                break;
            case Tab.ORDERING_DESCRIPTION:
                fields = fields.concat(OrderingDescriptionCardConfig.getFieldLst());
                break;
            case Tab.ERRORS:
                fields = fields.concat(MissingMappingCardConfig.getFieldLst());
                break;
            case Tab.HISTORY:
                fields = fields.concat(ModificationHistoryCardConfig.getFieldLst());
        }
        return fields;
    }
}
