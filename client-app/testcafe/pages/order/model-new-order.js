import { Selector } from 'testcafe';

export default class ModelNewProduct {
    constructor () {
        this.subject = Selector('input[name="subject"]');
        this.administrationId = Selector('select[name="administrationId"]');
    }
}