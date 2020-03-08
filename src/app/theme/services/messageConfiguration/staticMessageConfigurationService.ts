export class StaticMessageConfigurationService {

  static getMappedPropertyLstForField(field, message) {
    const checkField = (dataGroupCode, fieldName) => dataGroupCode === field.dataGroup && fieldName === field.field;
    const checkCalculated = calculatedValueLst => calculatedValueLst.find(el =>
      el.value.value.dataGroup === field.dataGroup &&
      el.value.value.field === field.field);
    return this.getMappedPropertyLst(message, checkField, checkCalculated);
  }

  static getMappedPropertyLstForDataGroup(field, message) {
    const checkField = (dataGroupCode, fieldName) => dataGroupCode === field.dataGroup;
    const checkCalculated = calculatedValueLst =>
      calculatedValueLst.find(el => el.value.value.dataGroup === field.dataGroup);
    return this.getMappedPropertyLst(message, checkField, checkCalculated);
  }

  static getMappedPropertyLstForCalculatedField(calculatedCode, message) {
    const dataGroupLst = message.dataGroupLst;
    const checkField = (dataGroupCode, fieldName) => false;
    const checkCalculated = calculatedValueLst => false;
    const checkCalculatedField = calculatedField => calculatedField.code === calculatedCode;
    return this.getMappedPropertyLst(message, checkField, checkCalculated, checkCalculatedField);
  }

  static getMappedPropertyLstForEnumeration(enumerationCode, message) {
    const dataGroupLst = message.dataGroupLst;
    const checkField = (dataGroupCode, fieldName) => {
      const fieldDetail = this.getFieldForDataGroup(fieldName, dataGroupCode, dataGroupLst);
      const fieldEnumeration = fieldDetail ? fieldDetail.enumeration : undefined;
      return fieldEnumeration === enumerationCode;
    };
    const checkCalculated = calculatedValueLst => {
      let usedInMapping = false;
      calculatedValueLst.forEach(el => {
        const concatenationItem = el.value;
        if (concatenationItem.type === 'field') {
          const dataGroupCode = concatenationItem.value.dataGroup;
          const fieldName = concatenationItem.value.field;
          const fieldDetail = this.getFieldForDataGroup(fieldName, dataGroupCode, dataGroupLst);
          const fieldEnumeration = fieldDetail ? fieldDetail.enumeration : undefined;
          if (fieldEnumeration === enumerationCode) {
            usedInMapping = true;
          }
        }
      });
      return usedInMapping;
    };
    return this.getMappedPropertyLst(message, checkField, checkCalculated);
  }

  private static getMappedPropertyLst(message, checkField, checkConcatenationLst, checkCalculatedField = (c) => false) {
    const mappedPropertyLst = [];
    const mapping = message.mapping || {};
    const calcMappingLst = message.calcMappingLst || [];
    const databaseLst = Object.keys(mapping);
    databaseLst.forEach(databaseId => {
      const database = mapping[databaseId];
      const collectionLst = Object.keys(database);
      collectionLst.forEach(collectionId => {
        const propertyLst = database[collectionId];
        propertyLst.forEach(propertyMapping => {
          const mappingType = propertyMapping.mapping.type;
          const propertyName = propertyMapping.field.property;
          const parentLst = propertyMapping.field.embeddedPropertyLst;
          if (mappingType === 'field') {
            /**Data group field mapping */
            const mappingValue = propertyMapping.mapping.value;
            const dataGroupCode = mappingValue.dataGroup;
            const fieldName = mappingValue.field;
            if (checkField(dataGroupCode, fieldName)) {
              this.addToMappedPropertyLst(databaseId, collectionId, propertyName, parentLst, mappedPropertyLst);
            }
          } else {
            /**Calculated mapping */
            const calcMappingCode = propertyMapping.mapping.value.code;
            const calculatedMapping = calcMappingLst.find(el => el.code === calcMappingCode);
            if (calculatedMapping && checkCalculatedField(calculatedMapping)) {
              this.addToMappedPropertyLst(databaseId, collectionId, propertyName, parentLst, mappedPropertyLst);
            }
            if (calculatedMapping && calculatedMapping.formulaType === 'concatenation') {
              const calcValueLst = calculatedMapping.formulaDtl.concatenationLst;
              if (checkConcatenationLst(calcValueLst)) {
                this.addToMappedPropertyLst(databaseId, collectionId, propertyName, parentLst, mappedPropertyLst);
              }
            }
          }
        });
      });
    });
    return mappedPropertyLst;
  }

  private static addToMappedPropertyLst(databaseId, collectionId, propertyName, parentLst, mappedPropertyLst) {
    const mappedProperty = {
      database: databaseId,
      'collectionId': collectionId,
      property: propertyName,
      'parentLst': parentLst
    };
    mappedPropertyLst.push(mappedProperty);
  }

  private static getFieldForDataGroup(fieldName, dataGroupCode, dataGroupLst) {
    let result;
    const dataGroupDetails = this.findDataGroup(dataGroupLst, dataGroupCode);
    if (dataGroupDetails) {
      const dataFields = dataGroupDetails.dataFields;
      if (dataFields) {
        result = dataFields.find(dataField => {
          return fieldName === dataField.name;
        });
      }
    }
    return result;
  }

  private static findDataGroup(dataGroupLst, dataGroupCode) {
    let dataGroupDetails;
    for (const root of dataGroupLst) {
      if (root.code === dataGroupCode) {
        dataGroupDetails = root;
        break;
      } else {
        const subNodes = root.subNodes || [];
        dataGroupDetails = this.findDataGroup(subNodes, dataGroupCode);
      }
    }
    return dataGroupDetails;
  }
}
