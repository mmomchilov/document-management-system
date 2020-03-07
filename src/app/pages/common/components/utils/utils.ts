export class Utils {

    static createColumnsListTofilter(item, value, columnsListTofilter: any[]): any[] {
        const filter: any = { 'item': '', 'value': '' };
        filter['item'] = item;
        filter['value'] = value;
        columnsListTofilter.push(filter);
        return columnsListTofilter;
    }
}
