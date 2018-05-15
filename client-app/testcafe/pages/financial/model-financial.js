import { Selector } from 'testcafe';
import * as vars from "../../config/random-models";

export default class ModelFinancial {
    constructor () {
        this.allOrders = Selector('a').withText('Alle orders(');
        this.thirdSearchField = Selector('input[type="text"]').nth(2);
    }
}