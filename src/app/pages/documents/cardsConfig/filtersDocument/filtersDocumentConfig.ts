
// import { TabConfiguration } from 'app/theme/components/cardDetail/configurationClasses/tabConfigurationts';

// import { TabConfiguration } from 'src/app/theme/components/cardDetail/configurationClasses/tabConfigurationts';
import { UtilCharts } from 'src/app/pages/pagesUtils';

export class FiltersDocumentConfig {

  static generateCard(result, optionalParams, selectedTab, translate): any {

    return {
      title: undefined, // remove card header
      isOpenedHeader: true,
      columnSize: 12,
      content:
      {
        type: 'simpleInputs',
        fields: [
          [
            {
              field: 'filtersLabel',
              hideLabel: true,
              type: 'label',
              label: 'Filters',
              columnSize: 1
            },

            // {
            //   field: 'numberLabel',
            //   hideLabel: false,
            //   type: 'label',
            //   label: 'number',
            //   columnSize: 1
            // },
            {
              field: 'number',
              hideLabel: false,
              type: 'select',
              enum: 'currency',
              columnSize: 1
            },
            {

              field: 'year',
              hideLabel: false,
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'title',
              hideLabel: false,
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'customer',
              hideLabel: false,
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'subsystem',
              hideLabel: false,
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },

          ],

          [
            {
              field: 'showAll',
              label: 'Show all',
              hideLabel: true,
              type: 'button',
              classCSS: 'button-link',
              // onClick: showDelegateInformationFunction,
              columnSize: 1
            },
            {

              field: 'class',
              hideLabel: false,
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'intCust',
              hideLabel: false,
              // path: ctgryFieldPath,
              labelPath: 'ctgryLabelPath',
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'hasFiles',
              hideLabel: false,
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'project',
              hideLabel: false,
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
          ],
        ]
      }
    };
  }
}
