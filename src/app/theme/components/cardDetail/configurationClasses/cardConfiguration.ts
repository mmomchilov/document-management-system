import { CardContentConfiguration } from './cardContentConfiguration';

export class CardConfiguration {
    /**Header title */
    title: any;
    /**Defines if the card body is visible or collapsed*/
    isOpenedHeader: boolean;
    /**Defines if expand/collapse is displayed */
    openCloseHeader?:boolean;
    /**List of actions in the header*/
    actions?: any;
    /**Card identifier. Used to manage dependencies to the card. 
     * If not set, a default identifier is assigned */
    id?: string;

    columnSize: number;
    minContentHeight?: string;
    cardClass?: string;
    displayMode?: string;

    /**Card body content */
    content: CardContentConfiguration;
}
