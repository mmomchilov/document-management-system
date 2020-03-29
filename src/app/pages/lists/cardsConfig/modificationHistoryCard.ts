import { CardConfiguration } from 'app/theme/components/cardDetail/configurationClasses/cardConfiguration';
import { WidgetConfiguration } from 'app/theme/components/cardDetail/configurationClasses/widgetConfiguration';
import { DateUtils } from '../../../../pages/common/components/utils/data-utils';

export class ModificationHistoryCardConfig {

    static getFieldLst(): string[] {
        return ['code'];
    }
     static generate(messageConfigVersions, messageConfigurationService,
                     translate, messageCode): CardConfiguration {
        return {
            title: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesModificationHistory.shortLabel',
            isOpenedHeader: true,
            columnSize: 12,
            content: {
                type: 'simpleInputs',
                fields: this.getLabelsInformationCard(messageConfigVersions, messageConfigurationService,
                  translate, messageCode)
            }
        };
    }
    private static getLabelsInformationCard(messageConfigVersions, messageConfigurationService,
                                            translate, messageCode): WidgetConfiguration[][] {
        return [
            [
                {
                    field: 'versionFrom',
                    label: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesVersionFrom.shortLabel',
                    type: 'select',
                    options: () => messageConfigVersions,
                    value: () => messageConfigVersions[0].code,
                    columnSize: 3
                },
              {
                field: 'versionTo',
                label: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesVersionTo.shortLabel',
                type: 'select',
                options: () => messageConfigVersions,
                value: () => messageConfigVersions[messageConfigVersions.length - 1 ].code,
                columnSize: 3
              },
              {
              field: 'author',
                label: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesAuthor.shortLabel',
              type: 'input',
              columnSize: 3
            },
              {
                field: 'property',
                label: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesProperty.shortLabel',
                type: 'input',
                columnSize: 2
              },
              {
                type: 'reloadButton',
                field: 'reload',
                inputs: ['versionFrom', 'versionTo', 'author', 'property'],
                onChangeValue: [{
                  field: 'tableHistory',
                  returnedType: 'promise',
                  items: (inputs => {
                    return new Promise((resolve, reject) => {
                      const documentMatchFilter = [];
                      documentMatchFilter.push({ 'field': 'data.code',

                        'value': messageCode,
                        'type': 'string', 'operator': '$eq' });

                      const query = {
                        'queryType': 'histo',
                        'documentCollectionName': 'message-conf-mapping',
                        'documentMatchFilter': documentMatchFilter,
                        'fromVersion': inputs.versionFrom,
                        'toVersion': inputs.versionTo,
                        'histoField': 'data',
                        'exclusions': ['UUID', 'updatedVersion', 'tableHistory', 'errorLst']
                      };

                      if (inputs.author !== undefined && inputs.author.trim() !== '') {
                        query['author'] = inputs.author;
                      }
                      if (inputs.property !== undefined && inputs.property.trim() !== '') {
                        query['property'] = inputs.property;
                      }
                      messageConfigurationService.searchModificationHistory(query)
                        .subscribe(response => {
                           // console.log('result', response);
                            if (response.histoResult) {
                              const modificationHistoryLines = [];
                              response.histoResult.forEach(histoResultItem => {

                                histoResultItem.result.forEach(histoResultItemResult => {

                                  modificationHistoryLines.push({
                                    userCode: histoResultItem.versionTo.author,
                                    dateHour: DateUtils.formatDate(histoResultItem.versionTo.versionDate,
                                      'dd/MM/yyyy HH:mm:ss'),
                                    changeType: translate.instant
                                    ('localizationResource.message-configuration.message-conf-mapping.tabHistoricalChanges' +
                                      histoResultItemResult.type + '.shortLabel'),
                                    entityField: translate.instant
                                    ('localizationProperty.message-configuration.message-conf-mapping.message-conf-mapping.'
                                      +histoResultItemResult.path[0] + '.shortLabel'),
                                    beforeChange: histoResultItemResult.leftValue,
                                    afterChange: histoResultItemResult.rightValue,
                                    versions: histoResultItem.versionFrom.versionNumber + '->'
                                    + histoResultItem.versionTo.versionNumber
                                  });
                                });

                              });
                              modificationHistoryLines.sort(this.compareHistoricalChange);
                              resolve(modificationHistoryLines);

                            }

                          },
                          err => {
                            resolve({});
                          });
                    });
                  })
                }
                ],
                storeData: (collection, newVal) => {},
                label: 'reload',
                isNotVisible: true,
                columnSize: 1,
                title: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesReload.shortLabel',

              }
            ],

            [{
                field: 'tableHistory',
                type: 'editableTable',
                columnSize: 12,
                settings: {
                    actions: { edit: false, delete: false, add: false, create: false },
                    hideSubHeader: true,
                    keyWord: null,
                    limitPerPage: 15,
                    columns: {
                        userCode: {
                            title: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesUserCode.shortLabel'
                        },
                      versions: {
                        title: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesVersions.shortLabel'
                      },
                        dateHour: {
                            title: 'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesDateTime.shortLabel'
                        },
                        changeType: {
                            title:
                              'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesChangeType.shortLabel'
                        },
                        entityField: {
                            title:
                              'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesFieldChanged.shortLabel'
                        },
                        beforeChange: {
                            title:
                              'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesBeforeChange.shortLabel'
                        },
                        afterChange: {
                            title:
                              'localizationResource.message-configuration.message-conf-mapping.tabHistoricalChangesAfterChange.shortLabel'
                        }
                    }
                }
            }]
        ];
    }

  private static compareHistoricalChange(a, b ) {
    if (a.dateHour < b.dateHour) {
      return -1;
    }
    if (a.dateHour > b.dateHour) {
      return 1;
    }
    return 0;
  }
}
