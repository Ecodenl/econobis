import { Selector } from 'testcafe';

export default class ModelNewEmailTemplate {
    constructor () {
        this.name = Selector('input[name="name"]');
    }
}