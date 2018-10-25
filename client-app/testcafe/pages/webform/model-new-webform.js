import { Selector } from 'testcafe';

export default class ModelNewWebform {
    constructor () {
        this.name = Selector('input[name="name"]');
        this.maxRequestsPerMinute = Selector('input[name="maxRequestsPerMinute"]');
        this.responsible = Selector('select[name="responsible"]');
    }
}