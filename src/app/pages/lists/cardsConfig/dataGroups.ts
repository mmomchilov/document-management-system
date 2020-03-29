import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { ElementConfiguration } from 'app/theme/components/cardDetail/configurationClasses/elementConfiguration';
import { StorageConfig } from '../storageConfig';
import { TabConfiguration } from 'app/theme/components/cardDetail/configurationClasses/tabConfigurationts';
import { ExtractData } from '../extractData';
import { Translation } from './translation';

export class DataGroupsCardConfig {

  static enumCodeSeparator = '.';
  static database = StorageConfig.DATABASE;
  static collectionId = StorageConfig.COLLECTION_ID;
  private static path = 'dataGroupLst';
  private static noEnumerationSelected = 'empty';

  static databaseConfig = {
    database: StorageConfig.DATABASE,
    collectionId: StorageConfig.COLLECTION_ID,
    collection: { code: 'TEST' }
  };

  static getFieldLst(): string[] {
    return [
      this.path,
      'enumerationLst',
      'dataTypeLst',
      'fileFormatType',
      'subBusinessContext',
      'mapping',
      'calcMappingLst',
      'formatFile',
      'subBusinessContext'
    ];
  }

  static generate(message: any, displayModeInput: string, selectedDataGroup, confirmFieldDelete, confirmNodeDelete,
    translate) {

    const groups = message && message[this.path] ? message[this.path] : [];
    const newLabel = Translation.getButtonTitle(`addNew`, this.path);
    const isTreeStructure = message && message.formatFile && message.formatFile.fileStructure === 'tree';

    const dataGroupStart = 'Datagroup_';
    return {
      title: Translation.getCartTitle(this.path),
      isOpenedHeader: true,
      columnSize: 12,
      content: {
        type: 'tree',
        tree: {
          nodes: groups,
          nodeToDisplay: selectedDataGroup,
          add: {
            enableAddButton: true,
            allowAddSubnodes: isTreeStructure,
            newNode: (newNode, nodes) => Object.assign(newNode,
              { technical: 'false', nbArity: '_0,1', code: ExtractData.getNextItem(dataGroupStart, nodes) })
          },
          delete: {
            allowDelete: true,
            confirmDelete: confirmNodeDelete
          },
          display: {
            addNewNode: {
              title: newLabel
            },
            config: this.card(message, confirmFieldDelete, translate),
            ...this.databaseConfig,
            displayMode: displayModeInput
          }
        }
      }
    };

  }

  static card(message, confirmFieldDelete, translate): CardConfiguration {
    return {
      title: 'STM',
      isOpenedHeader: false,
      actions: { add: true, delete: true },
      columnSize: 4,
      content: {
        type: 'simpleInputs',
        selectedTab: 'general',
        tabs: this.getTabsList(),
        fields: this.getLabelsCard(message, confirmFieldDelete, translate)
      }
    };
  }

  private static getTabsList(): TabConfiguration[] {
    return [{
      field: 'general',
      filterName: 'general',
      label: `localizationProperty.${this.database}.${this.collectionId}.dataGroupLst.generalInfo.shortLabel`
    },
    {
      field: 'fields',
      filterName: 'fields',
      label: `localizationProperty.${this.database}.${this.collectionId}.dataGroupLst.dataFields.shortLabel`
    }];
  }
  private static getLabelsCard(message, confirmFieldDelete, translate): WidgetConfiguration[][] {

    return [
      // General info tab
      [{
        field: 'code',
        labelPath: 'dataGroupLst',
        filter: 'general',
        type: 'input',
        validators: {
          isRequired: true
        },
        onFocusOut: ExtractData.transformCode(),
        columnSize: 2
      },
      {
        field: 'technical',
        labelPath: 'dataGroupLst',
        filter: 'general',
        type: 'select',
        enum: 'yesno',
        columnSize: 2
      },
      {
        field: 'size',
        labelPath: 'dataGroupLst',
        filter: 'general',
        type: 'input',
        columnSize: 2
      },
      {
        field: 'description',
        labelPath: 'dataGroupLst',
        filter: 'general',
        type: 'input',
        columnSize: 6
      }],
      [
        {
          field: 'nbArity',
          enum: 'nbArity',
          labelPath: 'dataGroupLst',
          filter: 'general',
          type: 'select',
          columnSize: 2
        },
        {
          field: 'comment',
          labelPath: 'dataGroupLst',
          filter: 'general',
          type: 'input',
          columnSize: 10
        }],
      // Fields tab
      [{
        type: 'table',
        filter: 'fields',
        cardsList: [
          {
            isOpenedHeader: true,
            columnSize: 12,
            initItem: (newItem, items) => Object.assign(newItem,
              {
                mandatory: 'false',
                type: 'string',
                sequence: this.calculateNextSequence(items),
                name: ExtractData.getNextItem('Field_', items, 'name')
              }),
            elements: this.getFieldsElements(message, translate)
          }],
        field: 'dataFields',
        columnSize: 12,
        confirmDelete: confirmFieldDelete
      }]
    ];
  }

  private static getFieldsElements(message, translate): ElementConfiguration[][] {
    const fileFormat = message && message.formatFile ? message.formatFile.fileFormatType : undefined;
    const dataTypesList = this.convertToEnumFormat(message.dataTypeLst, translate);
    const enumerations = this.getEnumerations(message);
    let columnsDependingOnFileFormat;
    if (fileFormat === 'variableLength') {
      columnsDependingOnFileFormat = [{
        field: 'sequence',
        label: 'dataGroupLst.sequence',
        type: 'input',
        columnSize: 2
      }];
    } else {
      columnsDependingOnFileFormat = [
        {
          field: 'start',
          label: 'dataGroupLst.start',
          type: 'input',
          columnSize: 1
        },
        {
          field: 'end',
          label: 'dataGroupLst.end',
          type: 'input',
          columnSize: 1
        }
      ];
    }
    return [
      [
        {
          field: 'name',
          label: 'dataGroupLst.name',
          type: 'input',
          onFocusOut: ExtractData.transformCode(),
          columnSize: 4
        },
        {
          field: 'label',
          label: 'dataGroupLst.label',
          type: 'input',
          columnSize: 4
        },
        {
          field: 'mandatory',
          label: 'dataGroupLst.mandatory',
          type: 'select',
          optionsName: 'yesno',
          columnSize: 2
        },
        ...columnsDependingOnFileFormat
      ],
      [
        {
          field: 'type',
          label: 'dataGroupLst.type',
          type: 'select',
          options: dataTypesList,
          onChangeValue: {
            field: 'enumeration',
            value: (newVal => undefined),
            options: (newVal => enumerations
              .filter(el => el.type === newVal || el.code === this.noEnumerationSelected)),
          },
          columnSize: 4
        },
        {
          field: 'enumeration',
          label: 'dataGroupLst.enumeration',
          type: 'select',
          options: enumerations,
          storeData: (collection, newVal) => {
            let enumerationVal = undefined;
            if (newVal !== this.noEnumerationSelected) {
              enumerationVal = newVal;
            }
            collection.enumeration = enumerationVal;
          },
          columnSize: 4
        },
        {
          field: 'defaultValue',
          label: 'dataGroupLst.defaultValue',
          type: 'input',
          hidden: collection => collection.enumeration,
          columnSize: 4
        }
      ]
    ];
  }

  private static convertToEnumFormat(dataTypes, translate) {
    return dataTypes.map(el => {
      const localization = `localizationEnumValue.message-configuration.datatype.${el.type}.label`;
      const translated = translate.instant(localization);
      return { code: el.type, label: translated };
    });
  }

  private static getEnumerations(message) {
    let enumerations = [];
    if (message) {
      const messageEnumerations = message.enumerationLst;
      if (messageEnumerations) {
        enumerations = messageEnumerations.map(el => {
          return { code: el.code, label: el.code, type: el.type };
        });
      }
    }
    enumerations.unshift({ code: this.noEnumerationSelected, label: '' });
    return enumerations;
  }

  private static calculateNextSequence(items) {
    let max = 0;
    items.forEach(el => {
      const val = el.sequence || 0;
      const sequence = Number(val);
      if (sequence) {
        max = Math.max(max, sequence);
      }
    });
    return max + 1;
  }
}
