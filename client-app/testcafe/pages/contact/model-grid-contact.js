import { Selector } from 'testcafe';

export default class ModelGridContact {
    constructor () {
        this.nameSearch = Selector('input[type="text"]').nth(2);
    }
}