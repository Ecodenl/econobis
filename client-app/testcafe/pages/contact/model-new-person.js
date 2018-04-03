import { Selector } from 'testcafe';

export default class ModelNewPerson {
    constructor () {
        this.firstName = Selector('input[name="firstName"]');
        this.lastName = Selector('input[name="lastName"]');
    }
}