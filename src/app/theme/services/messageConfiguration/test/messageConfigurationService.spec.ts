import { StaticMessageConfigurationService } from './../staticMessageConfigurationService';
// const checks = require('../messageConfigurationService.service')

// describe.only('Tests for messageConfigurationService.js', () => {
describe('StaticMessageConfigurationService => getMappedPropertyLst function', () => {
    it('test1 - should extract field mapping for field mapping type', () => {
        const message = {
            mapping: {
                'message-information': {
                    'slip-message': [
                        {
                            field: {
                                property: 'endDate',
                                embeddedProperty: null,
                                embeddedPropertyLst: [],
                                type: 'date'
                            },
                            mapping: {
                                type: 'field',
                                value: {
                                    dataGroup: 'BOR',
                                    field: 'dateFnSuiviSinistre'
                                }
                            }
                        }
                    ]
                }
            }
        };
        const field = { dataGroup: 'BOR', field: 'dateFnSuiviSinistre' };
        const mappedProperties = StaticMessageConfigurationService.getMappedPropertyLstForField(field, message);
        const mappedPropertiesExpected = [
            {
                database: 'message-information',
                collectionId: 'slip-message',
                property: 'endDate',
                parentLst: []
            }
        ];
        expect(mappedProperties).toEqual(mappedPropertiesExpected);
    });

    it('test2 - should extract field mapping for calculated mapping type', () => {
        const message = {
            mapping: {
                'message-information': {
                    'slip-message': [
                        {
                            field: {
                                property: 'endDate',
                                embeddedProperty: null,
                                parentLst: [],
                                embeddedPropertyLst: [],
                                type: 'date'
                            },
                            mapping: {
                                type: 'calculated',
                                value: {
                                    code: 'calc1'
                                }
                            }
                        }
                    ]
                }
            },
            calcMappingLst: [
                {
                    code: 'calc1',
                    formulaType: 'concatenation',
                    formulaDtl: {
                        concatenationLst: [
                            {
                                value: {
                                    type: 'constant',
                                    value: {
                                        code: 'date'
                                    }
                                }
                            },
                            {
                                value: {
                                    type: 'field',
                                    value: {
                                        dataGroup: 'BOR',
                                        field: 'dateFnSuiviSinistre'
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        };
        const field = { dataGroup: 'BOR', field: 'dateFnSuiviSinistre' };
        const mappedProperties = StaticMessageConfigurationService.getMappedPropertyLstForField(field, message);
        const mappedPropertiesExpected = [
            {
                database: 'message-information',
                collectionId: 'slip-message',
                property: 'endDate',
                parentLst: []
            }
        ];
        expect(mappedProperties).toEqual(mappedPropertiesExpected);
    });

    it('test3 - should extract field mapping for data group field and calculated mapping type', () => {
        const message = {
            mapping: {
                'message-information': {
                    'slip-message': [
                        {
                            field: {
                                property: 'startDate',
                                embeddedProperty: null,
                                parentLst: [],
                                embeddedPropertyLst: [],
                                type: 'date'
                            },
                            mapping: {
                                type: 'field',
                                value: {
                                    dataGroup: 'BOR',
                                    field: 'dateFnSuiviSinistre'
                                }
                            }
                        },
                        {
                            field: {
                                property: 'endDate',
                                parentLst: [],
                                embeddedProperty: null,
                                embeddedPropertyLst: [],
                                type: 'date'
                            },
                            mapping: {
                                type: 'calculated',
                                value: {
                                    code: 'calc1'
                                }
                            }
                        }
                    ]
                }
            },
            calcMappingLst: [
                {
                    code: 'calc1',
                    formulaType: 'concatenation',
                    formulaDtl: {
                        concatenationLst: [
                            {
                                value: {
                                    type: 'constant',
                                    value: {
                                        code: 'date'
                                    }
                                }
                            },
                            {
                                value: {
                                    type: 'field',
                                    value: {
                                        dataGroup: 'BOR',
                                        field: 'dateFnSuiviSinistre'
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        };
        const field = { dataGroup: 'BOR', field: 'dateFnSuiviSinistre' };
        const mappedProperties = StaticMessageConfigurationService.getMappedPropertyLstForField(field, message);
        const mappedPropertiesExpected = [
            {
                database: 'message-information',
                collectionId: 'slip-message',
                property: 'startDate',
                parentLst: []
            },
            {
                database: 'message-information',
                collectionId: 'slip-message',
                property: 'endDate',
                parentLst: []
            }
        ];
        expect(mappedProperties).toEqual(mappedPropertiesExpected);
    });
});
// });
