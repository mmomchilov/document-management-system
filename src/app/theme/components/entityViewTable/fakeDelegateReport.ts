export class FakeDelegateReportList {
  static search() {
    return [
      {
        // _id: 'SOFIA|ANDROS-FR|2019|1|delegate-report',
        // context: {
        //   tenant: {
        //     tenant_id: 'SOFIA',
        //     tenantRef: {
        //       collectionName: 'tenant',
        //       id: 'SOFIA'
        //     }
        //   },
        //   'juridical-entity': {
        //     'juridical-entity_id': 'SOFIA|ANDROS-FR|juridical-entity',
        //     // 'juridical-entityRef': DBRef('juridical-entity', 'SOFIA|ANDROS-FR|juridical-entity')
        //     'juridical-entityRef': 'SOFIA|ANDROS-FR|juridical-entity'
        //   }
        // },
        // 'data': {
        'BUID': 'SOFIA|ANDROS-FR|2019|1|delegate-report',
        acrony: 'ANDROS-FR',
        legalName: 'ANDROS-FR',
        links: [{
          rel: 'self', href:
            'https://dev.dmp-insurance.com/api/collections/juridical-entity/SOFIA|ANDROS-FR|2019|1|delegate-report'
        },
        {
          rel: 'list', href:
            'https://dev.dmp-insurance.com/api/collections/juridical-entity'
        }
        ],
        siret: '326967051000000',
        'ORIAS': '326967051',
        firstSubscribtionDtOrias: '03/12/2018',
        receptionDate: '03/12/2018',
        registrationYear: '2019',
        version: 1,
        label: 'ANDROS 2019 Ver 1',

        status: 'draft',
        startDate: '03/12/2018',
        endDate: '03/12/2019',
        statusDate: '03/12/2018',

        categoryLst: [
          {
            '1_categoryLst': {
              label: '1',
              progression: '57',
              '1_subCategoryLst': [
                {
                  '1_1_subCategory': {
                    label: '1_1',
                    '1_1_questionLst': [
                      {
                        label: '1_1_1',
                        PJ: '1_1_1_PJ',
                        comment: 'comment'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
      // 'metadata': {
      //   collectionId: 'message-conf-mapping',
      //   timestamp: new Date('2018-12-06T11:33:21.000+0000'),
      //   businessActivity: '',
      //   businessContext: 'message-conf-mapping',
      //   user: '',
      //   fileName: '',
      //   messageSignature: 'message-conf-mapping-2018-12-06T11:33:21.000Z',
      //   messageId: 'api_10',
      //   version: '2.0',
      //   direction: 'api',
      //   permissions: {
      //     'juridical-entity': 'UPDATE',
      //     agreement: 'UPDATE',
      //     'policy-ident': 'UPDATE',
      //     'message-transfer-configuration': 'UPDATE',
      //     'message-conf-mapping': 'UPDATE',
      //     'rejection-detail': 'UPDATE',
      //     transfercession: 'UPDATE',
      //     'compensation-rules': 'UPDATE',
      //     transfercessionflowin: 'UPDATE',
      //     rejection: 'UPDATE',
      //     tenant: 'UPDATE'
      //   }
      // }
      // }
    ];
  }
}
