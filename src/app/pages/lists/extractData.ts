export class ExtractData {

    /**
     * Extracts message data groups in given format
     * @param dataGroupLst - message data groups
     * @param format - the format in which the returned options should be
     *                 it's an object with properties code and display
     * @returns list of options, each option format is specified by the input parameter format
     */
    static getDataGroupLstOptions(dataGroupLst, format) {
        const dataGroupOptionLst = [];
        dataGroupLst.forEach(dataGroup => {
            this.getNodeLstOptions(dataGroupOptionLst, dataGroup, format)
        });
        return dataGroupOptionLst;
    }

    static getNextItem(beginning, items, idStr = 'code'): string {
        let max = 0;
        items.forEach(el => {
            const code = el[idStr] || '';
            if (code.startsWith(beginning)) {
                const sequenceStr = code.substr(beginning.length, code.length);
                const sequence = Number(sequenceStr);
                if (sequence) {
                    max = Math.max(max, sequence);
                }
            }
        });
        return `${beginning}${max + 1}`;
    }

    static getTreeNodeLstOptions(inputObj, format) {
        return this.getNodeLstOptions([], inputObj, format);
    }

    static getFieldsForDataGroup(dataGroup, dataGroupLst, format) {
        let res = [];
        dataGroupLst.forEach(root => {
            const node = this.findNode(dataGroup, root);
            if (node) {
                const dataFields: any[] = node.dataFields;
                if (dataFields) {
                    res = dataFields
                        .map(dataField => {
                            const fieldLabel = dataField.label
                                ? `${dataField.name}(${dataField.label})`
                                : dataField.name;
                            return this.format(dataField.name, fieldLabel, format);
                        })
                        .sort((a, b) => a.code ? a.code.localeCompare(b.code) : 0);
                }
            }
        });
        return res;
    }

    static findField(fieldName, dataGroupName, dataGroupLst) {
        let res;
        dataGroupLst.forEach(root => {
            const node = this.findNode(dataGroupName, root);
            if (node) {
                const dataFields: any[] = node.dataFields;
                if (dataFields) {
                    res = dataFields.find(el => el.name === fieldName);
                }
            }
        });
        return res;
    }

    static format(code, display, format) {
        const option = { code: '', display: '' };
        option[format.code] = code;
        option[format.display] = display;
        return option;
    }

    static extractMapping(message, database, collectionId, fieldDefinition) {
        const mapping = message.mapping;
        if (mapping && mapping[database]) {
            const mappedCollectionFields = mapping[database][collectionId];
            if (mappedCollectionFields) {
                const fieldObj = mappedCollectionFields.find(el => this.matchField(el.field, fieldDefinition));
                if (fieldObj) {
                    return fieldObj.mapping;
                }
            }
        }
        return undefined;
    }

    private static matchField(mappedField, fieldDefinition) {
        return mappedField.property === fieldDefinition.property &&
            mappedField.embeddedProperty === fieldDefinition.embeddedProperty;
    }

    private static getNodeLstOptions(accumulatorLst, inputObj, format) {
        const code = inputObj.code;
        if (code) {
            const nodeOption = this.format(code, code, format);
            accumulatorLst.push(nodeOption);
        }
        if (inputObj.subNodes) {
            for (const entry of inputObj.subNodes) {
                this.getNodeLstOptions(accumulatorLst, entry, format);
            }
        }
        return accumulatorLst;
    }

    private static findNode(nodeId, root) {
        if (root.code === nodeId) {
            return root;
        }
        if (root.subNodes) {
            for (const subNode of root.subNodes) {
                const res = this.findNode(nodeId, subNode);
                if (res) {
                    return res;
                }
            }
        }
    }

    static getCollectionLst(collectionLst, translate) {
        const collections = [];
        collectionLst.map(collectionRef => {
            const collectionId = collectionRef.collectionId;
            const database = collectionRef.database;
            const isMandatory = collectionRef.isMandatory;
            const labelPath = `localizationCollection.${database}.${collectionId}.label`;
            const collectionLabel = translate.instant(labelPath);
            const collectionDisplay = this.getCollectionDisplay(collectionLabel, isMandatory);
            collections.push({
                code: `${collectionId}`,
                codeDisplay: collectionDisplay,
                label: labelPath,
                database: collectionRef.database,
                expanded: false,
                mandatory: isMandatory,
                subNodes: []
            });
        });
        return collections;
    }

    static translateCollectionId(database, collectionId, translate) {
        const labelPath = `localizationCollection.${database}.${collectionId}.label`;
        const collectionLabel = translate.instant(labelPath);
        return collectionLabel;
    }

    static translateCollectionProperty(database, collectionId, property, parentLst, translate) {
        const labelPath = this.getLabel(database, collectionId, property, parentLst);
        const label = translate.instant(labelPath);
        return label;
    }

    static setCollectionFields(collection, fieldsObj, message, translate) {
        const collectionId = collection.code;
        const database = collection.database;
        const collectionFields = fieldsObj[collectionId];
        const parent = null;
        const filteredFields = collectionFields.filter(el => el.mappeable === 'true');
        this.setFields(collection, parent, [], filteredFields, message, database, collectionId, translate);
        this.setSubNodes(collection, parent, [], filteredFields, message, database, collectionId, translate);
    }

    static translateCollectionsAndProperties(propertyLst = [], collectionDefinitions, translate) {
        return propertyLst
            .map(elTmp => {
                const el = Object.assign(elTmp, {});
                const database = el.database || this.getCollectionProp(el, 'database', collectionDefinitions);
                const collectionId = el.collectionId;
                const collectionLabel = ExtractData.translateCollectionId(database, collectionId, translate);
                el.collectionIdLabel = collectionLabel;

                let parentLst = [];
                const path = el.propertyName.match(/\((.*)\)/);
                if (path) {
                    const pathStr = path[1];
                    parentLst = pathStr.split('.');
                }
                const pathLst = [];
                let localizationPath = `localizationProperty.${database}.${collectionId}`;
                parentLst.forEach(parent => {
                    localizationPath = `${localizationPath}.${parent}`;
                    const localization = `${localizationPath}.shortLabel`;
                    const parentLabel = translate.instant(localization);
                    pathLst.push(parentLabel);
                });
                const localizationProperty = `${localizationPath}.${el.property}.shortLabel`;
                let propertyLabel = translate.instant(localizationProperty);
                if (pathLst.length > 0) {
                    const prefix = pathLst.join('.');
                    el.pathLst = parentLst;
                    propertyLabel = `${prefix}.${propertyLabel}`;
                }
                el.propertyLabel = propertyLabel;
                return el;
            })
            .sort((a, b) => {
                if (a.collectionId === 'slip-message') {
                    if (b.collectionId === 'slip-message') {
                        return a.propertyLabel.localeCompare(b.propertyLabel);
                    }
                    return -1;
                }
                const aDepth = this.getCollectionProp(a, 'depth', collectionDefinitions);
                const bDepth = this.getCollectionProp(b, 'depth', collectionDefinitions);
                if (aDepth === bDepth) {
                    const aSequence = this.getCollectionProp(a, 'sequence', collectionDefinitions);
                    const bSequence = this.getCollectionProp(b, 'sequence', collectionDefinitions);
                    if (aSequence === bSequence) {
                        return a.propertyLabel.localeCompare(b.propertyLabel);
                    } else {
                        return aSequence - bSequence;
                    }
                } else {
                    return aDepth - bDepth;
                }
            });
    }

    static translateEnumerations(list = [], collectionDefinitions, translate) {
        return list.map(elTmp => {
            const el = Object.assign(elTmp, {});
            const database = el.database || this.getCollectionProp(el, 'database', collectionDefinitions);
            const databaseEnumCode = el.expectedEnumeration;
            const labelPath = `localizationEnumRef.${database}.${databaseEnumCode}.label`;
            const translatedEnumeration = translate.instant(labelPath);
            el.expectedEnumerationLabel = translatedEnumeration;
            return el;
        });
    }

    private static getCollectionProp(a, prop, collectionDefinitions) {
        const collectionId = a.collectionId;
        const collectionDef = collectionDefinitions.find(el => el.collectionId === collectionId);
        if (collectionDef) {
            return collectionDef[prop];
        }
        return 0;
    }

    private static setFields(collection, parent, parentLst, collectionFields,
        message, database, collectionId, translate) {
        const fields = collectionFields
            .filter(el => this.hasTheSameParent(el, parent) && this.hasSimpleType(el))
            .sort((a, b) => this.displayOrderCompare(a, b))
            .map(el => {
                el.embeddedPropertyLst = parentLst;
                const labelPath = this.getLabel(database, collectionId, el.property, parentLst);
                const label = translate.instant(labelPath);
                el.label = labelPath;
                el.display = label;
                return {
                    field: el,
                    'collectionId': collectionId,
                    'database': database,
                    mapping: this.extractMapping(message, database, collectionId, el)
                };
            });
        collection.fields = fields;
    }

    private static setSubNodes(collection, parent, parentLst, collectionFields,
        message, database, collectionId, translate) {
        const subNodes = collectionFields
            .filter(fld =>
                this.hasTheSameParent(fld, parent) && !this.hasSimpleType(fld))
            .sort((a, b) => this.displayOrderCompare(a, b))
            .map(el => {
                el.code = el.property;
                const mandatory = el.mandatory;
                const newParent = el.property;
                const newParentLst = parentLst.concat([{
                    property: el.property,
                    type: el.type
                }]);
                const labelPath = this.getLabel(database, collectionId, el.code, parentLst);
                el.label = labelPath;
                const label = translate.instant(labelPath);
                el.codeDisplay = mandatory ? `${label}*` : label;
                this.setSubNodes(el, newParent, newParentLst, collectionFields,
                    message, database, collectionId, translate);
                this.setFields(el, newParent, newParentLst, collectionFields,
                    message, database, collectionId, translate);
                return el;
            });
        collection.subNodes = subNodes;
    }

    private static displayOrderCompare(a, b) {
        const aSeq = a.orderDisplay || 0;
        const bSeq = b.orderDisplay || 0;
        return aSeq - bSeq;
    }

    static changeCollectionsTranslation(nodeLst, translate) {
        nodeLst.forEach(node => {
            const collectionLabel = translate.instant(node.label);
            node.codeDisplay = this.getCollectionDisplay(collectionLabel, node.mandatory);
            const subNodes = node.subNodes || [];
            this.changeCollectionsTranslation(subNodes, translate);
            const fields = node.fields || [];
            fields.forEach(el => {
                const field = el.field;
                const label = translate.instant(field.label);
                field.display = label;
            });
        });
    }

    static transformCode() {
        return event => {
            const newValue = event.newValue;
            const transformedValue = newValue ? newValue.trim() : newValue;
            event.confirm.resolve(transformedValue);
        };
    }

    private static getCollectionDisplay(label, isMandatory) {
        const display = isMandatory ? `${label}*` : label;
        return display;
    }

    private static getLabel(database, collectionId, field, parentLst: any[]) {
        let path = parentLst
            .map(el => el.property)
            .join('.');
        if (path) {
            path = `${path}.`;
        }
        const labelPath = `localizationProperty.${database}.${collectionId}.${path}${field}.shortLabel`;
        return labelPath;
    }

    private static hasTheSameParent(field, parent) {
        return field.embeddedProperty === parent;
    }

    private static hasSimpleType(field) {
        return field.type !== 'object' && field.type !== 'array';
    }

}
