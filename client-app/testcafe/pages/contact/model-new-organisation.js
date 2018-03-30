import { Selector } from 'testcafe';

export default class ModelNewOrganisation {
    constructor () {
        this.name = Selector('input[name="name"]');
    }
}