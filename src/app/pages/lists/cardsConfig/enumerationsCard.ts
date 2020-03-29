import { CardConfiguration } from './../../../../app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from './../../../../app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { StorageConfig } from '../storageConfig';
import { ExtractData } from '../extractData';
import { Translation } from './translation';

export class EnumerationsCardConfig {

  private static path = 'enumerationLst';

  static databaseConfig = {
    database: StorageConfig.DATABASE,
    collectionId: StorageConfig.COLLECTION_ID,
    collection: { code: 'TEST' }
  };

  static enumCodeSeparator = '.';

  static getFieldLst(): string[] {
    return [this.path, 'dataTypeLst', 'calcMappingLst', 'mapping'];
  }

  static generate(message: any, displayModeInput: string, translationEnums, selectedEnumeration, 
    translate, confirmNodeDelete) {
    const enumerations = message && message[this.path] ? message[this.path] : [];
    const newLabel = Translation.getButtonTitle('addNew', this.path);
    const enumStart = 'Enumeration_';

    return {
      title: Translation.getCartTitle(this.path),
      isOpenedHeader: true,
      columnSize: 12,
      content: {
        type: 'tree',
        tree: {
          nodes: enumerations,
          nodeToDisplay: selectedEnumeration, 
          add: {
            enableAddButton: true,
            allowAddSubnodes: false,
            newNode: (newNode, nodes) => Object.assign(newNode,
              { type: 'string', code: ExtractData.getNextItem(enumStart, nodes) })
          },
          delete: {
            allowDelete: true,
            confirmDelete: confirmNodeDelete
          },
          display: {
            addNewNode: { title: newLabel },
            config: this.card(message, translationEnums, translate),
            ...this.databaseConfig,
            displayMode: displayModeInput
          }
        }
      }
    };
  }

  static card(message, translationEnums, translate) {
    return {
      title: 'STM',
      isOpenedHeader: false,
      actions: { add: true, delete: true },
      columnSize: 4,
      content: {
        type: 'simpleInputs',
        fields: this.getLabelsCard(message, translationEnums, translate)
      }
    };
  }

  private static getLabelsCard(message, translationEnums, translate): WidgetConfiguration[][] {

    const dataTypesListFormated = message.dataTypeLst.map(el => {
      const localization = `localizationEnumValue.message-configuration.datatype.${el.type}.label`;
      const translated = translate.instant(localization);
      return { code: el.type, display: translated };
    });
    const options = this.getTranslationEnumerations(translationEnums, translate);

    return [
      [
        {
          field: 'code',
          labelPath: this.path,
          filter: 'general',
          type: 'input',
          validators: {
            isRequired: true
          },
          onFocusOut: ExtractData.transformCode(),
          columnSize: 6
        },
        {
          field: 'type',
          labelPath: this.path,
          label: 'Type',
          type: 'select',
          options: (val => dataTypesListFormated),
          columnSize: 6
        }
      ],
      [
        {
          field: 'description',
          labelPath: this.path,
          filter: 'general',
          type: 'input',
          columnSize: 12
        }
      ],
      [
        {
          field: 'enumReference',
          labelPath: `${this.path}.mapping`,
          path: 'mapping.',
          filter: 'general',
          type: 'select',
          options: (enumeration => options),
          value: (val => val ? `${val.enumId}${this.enumCodeSeparator}${val.database}` : undefined),
          refresh: true,
          onChangeValue: [
            {
              field: 'valueLst',
              settings: (newEnumReference => {
                const dbEnumCodes = this.getOptionList(newEnumReference,
                  'value', 'title',
                  translationEnums);
                return this.getTableSettings(dbEnumCodes);
              })
            }
          ],

          storeData: ((collection, newValue) => {
            const ref = newValue.split(this.enumCodeSeparator);
            const enumerationReference = {
              database: ref[1],
              enumId: ref[0]
            };
            collection.mapping
              ? collection.mapping.enumReference = enumerationReference
              : collection.mapping = { enumReference: enumerationReference };
          }),
          columnSize: 6
        },
        {
          field: 'defaultCode',
          labelPath: this.path,
          path: 'mapping.',
          filter: 'general',
          type: 'input',
          columnSize: 6
        }
      ],
      [
        {
          type: 'editableTable',
          field: 'valueLst',
          path: 'mapping.',
          columnSize: 12,
          onUpdate: this.deleteEnumValue, // managed manually because of issue with smart table delete
          settings: (enumeration => {
            const enumRef = enumeration && enumeration.mapping
              ? enumeration.mapping.enumReference
              : undefined;
            const dbEnumCodes = this.getOptionList(enumRef,
              'value', 'title',
              translationEnums);
            return this.getTableSettings(dbEnumCodes);
          })
        }
      ]
    ];
  }

  static deleteEnumValue  (input){
    const action = input.action;
    if (action === 'delete') {
      const event = input.event;
      const valueLst :any[]= input.collection.mapping.valueLst;
      const index = valueLst.indexOf(event.data);
      valueLst.splice(index, 1);   
      event.confirm.resolve();
    }
  }

  private static getTableSettings(dbEnumCodes) {
    const valueLstPath = `${this.path}.valuesLst`;
    return {
      columns: {
        code: {
          filter: false,
          title: Translation.getColumnTitle('code', valueLstPath)
        },
        label: {
          filter: false,
          title: Translation.getColumnTitle('label', valueLstPath)
        },
        multiplier: {
          filter: false,
          title: Translation.getColumnTitle('multiplier', valueLstPath)
        },
        databaseCode: {
          filter: false,
          title: Translation.getColumnTitle('databaseCode', valueLstPath),
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            const enumRef = dbEnumCodes.find(el => el.value === cell);
            let enumDisplay = cell;
            if (enumRef) {
              enumDisplay = enumRef.title;
            }
            return `<span>${enumDisplay}</span>`;
          },
          editor: {
            type: 'list',
            config: { list: dbEnumCodes }
          }
        }
      },
      add: {
        addButtonContent: '<i class="fa fa-plus fa-fw""></i>',
        createButtonContent: '<i class="fa fa-check fa-fw""></i>',
        cancelButtonContent: '<i class="fa fa-close fa-fw""></i>',
      },
      edit: {
        editButtonContent: '<i class="fa fa-edit fa-fw""></i>',
        saveButtonContent: '<i class="fa fa-check fa-fw""></i>',
        cancelButtonContent: '<i class="fa fa-close fa-fw""></i>',
      },
      delete: {
        confirmDelete: true, 
        deleteButtonContent: '<i class="fa fa-remove fa-fw""></i>',
      },
    };
  }

  private static getOptionList(enumReference, code, display, translationEnums) {
    const dbEnumCodes = [];
    if (enumReference) {
      const enumReferenceObj = this.getEnumReferenceObj(enumReference);
      const translationEnum = translationEnums[enumReferenceObj.database][enumReferenceObj.enumId];
      const enumCodes = Object.keys(translationEnum);
      enumCodes.map(enumCode => {
        const option = {};
        option[code] = enumCode;
        option[display] = translationEnum[enumCode].label;
        dbEnumCodes.push(option);
      });
    }
    return dbEnumCodes;
  }

  private static getEnumReferenceObj(enumReference) {
    if (typeof enumReference === 'string') {
      const reference = enumReference.split(this.enumCodeSeparator);
      return {
        database: reference[1],
        enumId: reference[0]
      };
    }
    return enumReference;
  }

  private static getTranslationEnumerations(res, translate) {
    let options = [];
    const technicalDatabase = 'message-information';
    const databaseLst = ['portfolio', technicalDatabase];
    databaseLst.forEach(database => {
      const databaseEnums = res[database] || {};
      const databaseEnumCodes = Object.keys(databaseEnums);
      let additionalInformation = '';
      if (database === technicalDatabase) {
        additionalInformation = '(tech)';
      }
      const databaseList = [];
      databaseEnumCodes
        .forEach(databaseEnumCode => {
          const labelPath = `localizationEnumRef.${database}.${databaseEnumCode}.label`;
          const translatedEnumeration = translate.instant(labelPath);
          const label = `${translatedEnumeration}${additionalInformation}`;
          databaseList.push({
            code: `${databaseEnumCode}${this.enumCodeSeparator}${database}`,
            display: label
          });
        });
      databaseList.sort((a, b) => a.display.localeCompare(b.display));
      options = options.concat(databaseList);
    });

    return options;
  }
}
