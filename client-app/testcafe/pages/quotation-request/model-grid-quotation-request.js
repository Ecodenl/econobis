import { Selector } from 'testcafe';

export default class ModelGridQuotationRequest {
    constructor () {
        this.nameSearch = Selector('input[type="text"]').nth(2);
    }
}