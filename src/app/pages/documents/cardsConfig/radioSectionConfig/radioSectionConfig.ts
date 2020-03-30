
// import { TabConfiguration } from 'app/theme/components/cardDetail/configurationClasses/tabConfigurationts';

// import { TabConfiguration } from 'src/app/theme/components/cardDetail/configurationClasses/tabConfigurationts';
import { UtilCharts } from 'src/app/pages/pagesUtils';

export class RadioSectionConfig {


  static generateCard(result, optionalParams, selectedTab, translate): any {

    return {
      title: undefined, // remove card header
      isOpenedHeader: true,
      columnSize: 12,
      content:
      {
        type: 'simpleInputs',
        fields: [
          [{
            field: 'showDocumentsRafio',
            labelCode: 'showRelatedDocs',
            hideLabel: false,
            type: 'radioButton',
            enum: 'changeEnum',
            columnSize: 6,
            // storeData: ((collection, newValue) => {
            //   collection['delegateType'] = newValue;
            //   PerimeterUtils.updateDelegationType(collection);
            // }),
            // onChangeValue: [{
            //   field: 'delegateActivitiesLst',
            //   disabled: (input) => {
            //     return this.isDisabledCheckboxLst(input, displayMode);
            //   }
            // }],
            // customOnChangeValue: refreshCardsConfigFunction,
            // validators: {
            //   isRequired: true}

          }
          ],
        ]
      }
    };
  }
}
