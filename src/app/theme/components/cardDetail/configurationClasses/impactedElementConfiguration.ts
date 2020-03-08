export class ImpactedElementConfiguration {
    field: string;
    fieldVal?: any;
    options?: any;
    disabled?: any;
    labelCode?: (newVal, input) => string;
    validators?: any;
    // if the impacted element is editableTable
    settings?: any;
    returnedType?: string;
    items?: any;
    /**Change card class */
    cardClass?: (newVal, input: { collection: any }) => string;
    /**Change if the card is opened or closed */
    isOpenedHeader?: (newVal, input: { collection: any }) => boolean;
}
