import { Selector } from 'testcafe';

export default class ModelNewAdministration {
    constructor () {
        this.name = Selector('input[name="name"]');
        this.btwNumber = Selector('input[name="btwNumber"]');
        this.IBAN = Selector('input[name="IBAN"]');
    }
}