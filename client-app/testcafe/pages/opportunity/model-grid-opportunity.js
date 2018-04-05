import { Selector } from 'testcafe';

export default class ModelGridOpportunity {
    constructor () {
        this.contactSearch = Selector('input[type="text"]').nth(2);
    }
}