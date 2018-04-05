import { Selector } from 'testcafe';

export default class ModelGridIntake {
    constructor () {
        this.contactSearch = Selector('input[type="text"]').nth(1);
    }
}