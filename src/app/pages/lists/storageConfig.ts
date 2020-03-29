export class StorageConfig {

    static DATABASE = 'message-configuration';
    static COLLECTION_ID = 'message-conf-mapping';

    static getDataTypes(fileType) {
        return this.dataTypeLst[fileType];
    }

    /**
     * Return storage information for business context and sub-business context
     * @param context - context for which to return the business context and subBusinessContext
     * @return object in format {businessContext: '', subBusinessContext:''}
     */
    static getBusinessContext(context) {
        return this.businessContextStorage[context];
    }

    static changeDataTypes(message, newFileType) {
        if (newFileType !== 'prdg') {
            message.normalizedFlowPRDG = undefined;
        }
        message.dataTypeLst = StorageConfig.getDataTypes(newFileType);
    }

    static changeFileFormatType(message, newFileType): string {
        let fileFormatType;
        if (newFileType === 'csv') {
            if (!message.formatFile) {
                message.formatFile = {};
            }
            fileFormatType = 'variableLength';
            message.formatFile.fileFormatType = fileFormatType;
        } else {
            fileFormatType = message.formatFile ? message.formatFile.fileFormatType : undefined;
        }
        return fileFormatType;
    }

    static storeMapping(message, database, collectionId, field, mapping) {
        const fieldCode = field.property;
        const parent = field.embeddedProperty;
        this.initProperty(message, 'mapping', {});
        this.initProperty(message.mapping, database, {});
        this.initProperty(message.mapping[database], collectionId, []);

        const mappingType = mapping.type;
        const newMapping = { type: mappingType, value: mapping.value };
        const mappingFields: any[] = message.mapping[database][collectionId];
        const updatedField = mappingFields.find(el => el.field &&
            el.field.property === fieldCode &&
            el.field.embeddedProperty === parent);

        if (updatedField) {
            const index = mappingFields.indexOf(updatedField);
            if (mappingType === 'empty') {
                mappingFields.splice(index, 1);
            } else {
                updatedField.mapping = newMapping;
                mappingFields[index] = updatedField;
            }
        } else {
            if (mappingType !== 'empty') {
                mappingFields.push({
                    field: {
                        property: fieldCode,
                        embeddedProperty: parent,
                        embeddedPropertyLst: field.embeddedPropertyLst,
                        enumRef: field.enumRef,
                        type: field.type
                    },
                    mapping: newMapping
                });
            }
        }
    }

    private static initProperty(obj, prop, initValue) {
        if (!obj[prop]) {
            obj[prop] = initValue;
        }
    }

    // static getCalculationFields(fileType, businessContext) {
    //     let result = [];
    //     if (fileType === 'csv' && businessContext === 'group-billing') {
    //         result = [
    //             'totalDueAmount',
    //             'totalAdjustAmount',
    //             'totalPaidAmount',
    //             'totalPaidbackAmount',
    //             'totalCommissionAmount'];
    //     }
    //     if (fileType === 'csv' && 
    //     ['rp-claims', 'h-settlement-agg', 'h-settlement'].find(el => el === businessContext)) {
    //         result = ['totalRequestedAmount'];
    //     }
    //     return result;
    // }

    private static businessContextStorage = {
        newBusiness: {
            businessContext: 'newBusiness',
            subBusinessContext: 'newBusiness'
        },
        contractActivities: {
            businessContext: 'contract',
            subBusinessContext: 'contractActivities'
        },
        adhesionActivities: {
            businessContext: 'adhesionActivities',
            subBusinessContext: 'adhesionActivities'
        },
        billingActivities: {
            businessContext: 'group-billing',
            subBusinessContext: 'billingActivities'
        },
        settlementRiskActivities: {
            businessContext: 'rp-claims',
            subBusinessContext: 'settlementRiskActivities'
        },
        settlementHealthDActivities: {
            businessContext: 'h-settlement',
            subBusinessContext: 'settlementHealthDActivities'
        },
        settlementHealthCActivities: {
            businessContext: 'h-settlement-agg',
            subBusinessContext: 'settlementHealthCActivities'
        },
        loadReferentialAgreement: {
            businessContext: 'loadReferential',
            subBusinessContext: 'loadReferentialAgreement'
        },
        loadReferentialPolicy: {
            businessContext: 'loadReferential',
            subBusinessContext: 'loadReferentialPolicy'
        },
        loadReferentialEDI: {
            businessContext: 'loadReferential',
            subBusinessContext: 'loadReferentialEDI'
        }
    };

    private static dataTypeLst = {
        prdg: [
            {
                type: 'string',
                position: 'left',
                filling: 'blank',
                unfilled: 'blank'
            }, {
                type: 'rate',
                decimal: 4,
                separator: '',
                position: 'right',
                filling: 0,
                unfilled: 'blank'
            }, {
                type: 'number',
                decimal: 2,
                separator: '',
                position: 'right',
                filling: 0,
                unfilled: 'blank'
            }, {
                type: 'integer',
                decimal: 0,
                position: 'right',
                maxLength: 10,
                filling: 0,
                unfilled: 'blank'
            }, {
                type: 'date',
                format: 'yyyyMMdd',
                unfilled: '00000000'
            }, {
                type: 'timestamp',
                format: 'yyyyMMddHHmmss',
                unfilled: '00000000000000'
            }
        ],
        csv: [
            {
                type: 'string'
            }, {
                type: 'number',
                separator: ','
            }, {
                type: 'rate',
                separator: ','
            }, {
                type: 'integer'
            }, {
                type: 'date',
                format: 'yyyyMMdd'
            }
        ],
        othr: [
            {
                type: 'string'
            }, {
                type: 'number',
                separator: ','
            }, {
                type: 'rate',
                separator: ','
            }, {
                type: 'integer'
            }, {
                type: 'date',
                format: 'yyyyMMdd',
                unfilled: '00000000'
            }
        ]
    };
}
