
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
              type: 'label',
              label: 'Filters',
              columnSize: 1
            },
            {
              field: 'number',
              type: 'select',
              enum: 'currency',
              columnSize: 1
            },
            {

              field: 'year',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'title',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'customer',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'subsystem',
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
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'intCust',
              // path: ctgryFieldPath,
              labelPath: 'ctgryLabelPath',
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'hasFiles',
              // path: ctgryFieldPath,
              //  labelPath: ctgryLabelPath,
              type: 'select',
              enum: 'currency',
              //   enumTransformation: this.sortEnumeration,
              columnSize: 1
            },
            {

              field: 'project',
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
