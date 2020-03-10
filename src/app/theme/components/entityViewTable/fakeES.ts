export class FakeES {
    static search() {

        return [
            {
                category: 'test',
                businessField: 'Consolidated health service',
                code: 'Test1',
                label: 'PRDG - Health benefits V2.8',
                messageType: 'Norms - PRDG',
                version: 0.1,
                direction: 'input',
                subBusinessContext: 'newBusiness',
                status: 'project',
                validity: 'success',
                templateId: 'Test1 Code',
                fileType: 'prdg',
                formatFile: {
                  fileFormatType: 'fixed',
                  fileStructure: 'tree',
                  separatorOR: '|',
                  separatorAND: '&'
                },
                dataTypeLst: [
                    {
                        type: 'string',
                        position: 'left',
                        filling: 'blank',
                        unfilled: 'blank'
                    },
                    {
                        type: 'rate',
                        decimal: 4,
                        position: 'right',
                        filling: 0,
                        unfilled: 'blank'
                    },
                    {
                        type: 'number',
                        decimal: 2,
                        position: 'right',
                        filling: 0,
                        unfilled: 'blank'
                    },
                    {
                        type: 'integer',
                        decimal: 0,
                        position: 'right',
                        filling: 0,
                        unfilled: 'blank'
                    },
                    {
                        type: 'percentage',
                        decimal: 0,
                        position: 'right',
                        unfilled: 'blank'
                    },
                    {
                        type: 'date',
                        format: 'yyyyMMdd',
                        unfilled: 0
                    },
                    {
                        type: 'timestamp',
                        format: 'yyyyMMddHHmmss',
                        unfilled: 0
                    },
                    {
                        type: 'enumeration'
                    },
                    {
                        type: 'object'
                    }
                ],
                enumerationLst: [
                    {
                        code: 'enum1',
                        type: 'string',
                        expanded: true,
                        defaultCode: 'code1',
                        mapping: [{ code: 'code1', label: 'Code 1', databaseCode: 'code' }]
                    },
                    {
                        code: 'enum2',
                        type: 'number',
                        expanded: true,
                        mapping: [{ code: 'code1', label: 'Code 1', multiplier: '-1', databaseCode: 'code' }]
                    },
                    {
                        code: 'qualifMnt',
                        type: 'number',
                        defaultCode: '277',
                        expanded: true,
                        mapping: [
                            { code: '277', label: 'Positive amount', multiplier: '1', databaseCode: 'credit' },
                            { code: '977', label: 'Negative amount', multiplier: '-1', databaseCode: 'debit' }
                        ]
                    }
                ],
                calcMappingLst: [
                  {
                      code: 'calc1',
                      collection: 'contract',
                      field: 'field1',
                      expanded: true,
                      mapping: [
                        { dataGroup: 'STM', field: 'field1', constant: 'date' },
                        { dataGroup: 'STM', field: 'field2' }
                    ]
                  },
                  {
                    code: 'calc2',
                    collection: 'contract',
                    field: 'field2',
                    expanded: true,
                    mapping: [{ dataGroup: 'STM', field: 'field1', constant: 'date' }]
                  }
              ],
                  dataGroupLst: [
                    {
                        code: 'STM',
                        expanded: true,
                        dataFields: [
                            {
                                name: 'field1',
                                label: 'Field 1',
                                type: 'number',
                                sequence: 1,
                                collectionId: 'agreement',
                                field: 'field1'
                            },
                            {
                                name: 'field2',
                                label: 'Field 2',
                                type: 'string',
                                sequence: 2,
                                enumeration: 'enum1',
                                collectionId: 'contract',
                                field: 'field2'
                            },
                            {
                                name: 'field3',
                                label: 'Field 3',
                                type: 'string',
                                sequence: 3,
                                enumeration: 'enum1',
                                collectionId: 'agreement',
                                field: 'field1'
                            }
                        ],
                        subNodes: [
                            {
                                code: 'STE',
                                expanded: true,
                                comment: 'STE group',
                                dataFields: [
                                    {
                                        name: 'field6',
                                        type: 'number',
                                        sequence: 1,
                                        collectionId: 'agreement',
                                        field: 'field1'
                                    },
                                    {
                                        name: 'field5',
                                        type: 'number',
                                        sequence: 2,
                                        enumeration: 'enum1',
                                        collectionId: 'contract',
                                        field: 'field2'
                                    },
                                    {
                                        name: 'field7',
                                        type: 'string',
                                        sequence: 3,
                                        enumeration: 'enum1',
                                        collectionId: 'agreement',
                                        field: 'field1'
                                    }
                                ],
                                subNodes: []
                            },
                            { code: 'STD', comment: 'STD group', dataFields: [], expanded: true, subNodes: [] },
                            { code: 'BOR', comment: 'BOR group', dataFields: [], expanded: true, subNodes: [] },
                            { code: 'INTZIA', dataFields: [], expanded: true, subNodes: [] },
                            { code: 'INTIO', dataFields: [], expanded: true, subNodes: [] },
                            { code: 'CTA', dataFields: [], expanded: true, subNodes: [] },
                            {
                                code: 'TOT',
                                expanded: true,
                                dataFields: [],
                                subNodes: [
                                    {
                                        code: 'ENS',
                                        expanded: true,
                                        dataFields: [],
                                        subNodes: [
                                            {
                                                code: 'EXE',
                                                expanded: true,
                                                dataFields: [],
                                                subNodes: [{ code: 'CRE' }]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                category: 'Production',
                businessField: 'Ref',
                code: 'PRDG_adds_28',
                label: 'PRDG Mass',
                messageType: 'Structured PRDG',
                version: '1.0',
                status: 'rejected',
                validity: 'error',
                templateId: 'Test1 Code',
                fileType: 'prdg',
                formatFile: {
                        fileFormatType: 'variableLength',
                        fileStructure: 'tree',
                        separatorOR: '|',
                        separatorAND: '&'
                },
                dataTypeLst:
                    [
                        {
                            type: 'string',
                            position: 'left',
                            filling: 'blank',
                            unfilled: 'blank'
                        },
                        {
                            type: 'rate',
                            decimal: 4,
                            position: 'right',
                            filling: 0,
                            unfilled: 'blank'
                        },
                        {
                            type: 'number',
                            decimal: 2,
                            position: 'right',
                            filling: 0,
                            unfilled: 'blank'
                        }
                    ],
                  enumerationLst: [
                    {
                        code: 'enum1',
                        type: 'string',
                        expanded: true,
                        mapping: [{ code: 'code1', label: 'Code 1', databaseCode: 'code' }]
                    },
                    {
                        code: 'enum2',
                        type: 'number',
                        expanded: true,
                        mapping: [{ code: 'code1', label: 'Code 1', multiplier: '-1', databaseCode: 'code' }]
                    },
                    {
                        code: 'qualifMnt',
                        type: 'number',
                        expanded: true,
                        mapping: [
                            { code: '277', label: 'Positive amount', multiplier: '1', databaseCode: 'credit' },
                            { code: '977', label: 'Negative amount', multiplier: '-1', databaseCode: 'debit' }
                        ]
                    }
                ],
                    dataGroupLst: [
                    {
                        code: 'STM',
                        expanded: true,
                        dataFields: [
                            {
                                name: 'field1',
                                label: 'Field 1',
                                start: 1,
                                end: 10,
                                type: 'number',
                                collectionId: 'agreement',
                                field: 'field1'
                            },
                            {
                                name: 'field2',
                                label: 'Field 2',
                                start: 11,
                                end: 20,
                                type: 'string',
                                enumeration: 'enum1',
                                collectionId: 'contract',
                                field: 'field2'
                            },
                            {
                                name: 'field3',
                                label: 'Field 3',
                                start: 21,
                                end: 30,
                                type: 'string',
                                enumeration: 'enum1',
                                collectionId: 'agreement',
                                field: 'field1'
                            }
                        ],
                        subNodes: [
                            {
                                code: 'STE',
                                expanded: true,
                                comment: 'STE group',
                                dataFields: [
                                    {
                                        name: 'field6',
                                        type: 'number',
                                        collectionId: 'agreement',
                                        field: 'field1'
                                    },
                                    {
                                        name: 'field5',
                                        type: 'number',
                                        enumeration: 'enum2',
                                        collectionId: 'contract',
                                        field: 'field2'
                                    },
                                    {
                                        name: 'field7',
                                        type: 'string',
                                        enumeration: 'enum1',
                                        collectionId: 'agreement',
                                        field: 'field1'
                                    }
                                ],
                                subNodes: []
                            }
                        ]
                    }
                ]
            },
            {
                category: 'Test',
                businessField: 'Cotisation',
                code: 'PRDG2',
                label: 'PRDG REV Mass',
                messageType: 'CSV',
                version: '1.0',
                status: 'treated',
                validity: 'success',
                templateId: 'Test1 Code',
                fileType: 'prdg',
                formatFile: {
                      fileFormatType: 'fixed',
                      fileStructure: 'tree',
                      separatorOR: '|',
                      separatorAND: '&'
                }
            },
            {
                category: 'Test',
                businessField: 'Refer',
                code: 'PRDG3',
                label: 'PRDG REV Masse 2.4',
                messageType: 'CSV',
                version: '1.0',
                status: 'treated',
                validity: 'success',
                templateId: 'Test1 Code',
                fileType: 'prdg',
                formatFile: {
                          fileFormatType: 'fixed',
                          fileStructure: 'tree',
                          separatorOR: '|',
                          separatorAND: '&'
                }
            }
        ];
    }
}
