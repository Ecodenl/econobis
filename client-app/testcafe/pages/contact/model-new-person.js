import { Selector } from 'testcafe';

export default class ModelNewPerson {
    constructor () {
        this.firstName = 'input[name="firstName"]';
        this.lastName = 'input[name="lastName"]';
    }
}