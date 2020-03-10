export class FakeMessageApplicationList {
    static search() {
        return [
            // {
            //     BUID: "SOFIA|SOFIA|NEW|message-conf-mapping|2",
            //     base: "MessageConfiguration",
            //     collectionId: "message-applications",
            //     endDate: "2999-12-31T00:00:00.000Z",
            //     links: [
            //         {
            //             href: "https://dev.dmp-insurance.com/api/collections/message-applications/SOFIA|SOFIA|NEW|message-conf-mapping|2",
            //             rel: "self"
            //         },
            //         {
            //             href: "https://dev.dmp-insurance.com/api/collections/message-applications",
            //             rel: "list"
            //         }
            //     ],
            //     messageNameComposition: "testFileName",
            //     sequence: 2,
            //     startDate: "2019-04-23T16:54:36.000Z"
            // }
            {
                'BUID': 'SOFIA|AXOS|message-conf-mapping|1',
                'startDate': '2019-04-15T11:26:35.000Z',
                'endDate': '2022-12-31T11:26:35.000Z',
                'sequence': 1,
                'lastGeneratedVersion': 1,
                'lastGeneratedDate': '2019-04-15T11:26:35.000Z',
                'messageNameComposition': '^ADSS_IN.*',
                'thirdPartyRef': {
                    'id': 'SOFIA|AXOS|juridical-entity',
                    'collectionName': 'juridical-entity'
                },
                'administratorRef': {
                    'id': 'SOFIA|AXIS|juridical-entity',
                    'collectionName': 'juridical-entity'
                },
                'juridicalEntityRef': {
                    'id': 'SOFIA|SOFIA|juridical-entity',
                    'collectionName': 'juridical-entity'
                }
            }
        ];
    }
}
