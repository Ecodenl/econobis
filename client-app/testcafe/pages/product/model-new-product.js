import { Selector } from 'testcafe';

export default class ModelNewProduct {
    constructor () {
        this.code = Selector('input[name="code"]');
        this.name = Selector('input[name="name"]');
        this.administrationId = Selector('select[name="administrationId"]');
    }
}