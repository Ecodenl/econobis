import { Selector } from 'testcafe';

export default class ModelNewAdministration {
    constructor () {
        this.name = Selector('input[name="name"]');
        this.btwNumber = Selector('input[name="btwNumber"]');
        this.IBAN = Selector('input[name="IBAN"]');
        this.address = Selector('input[name="address"]');
        this.postalCode = Selector('input[name="postalCode"]');
        this.city = Selector('input[name="city"]');
        this.bic = Selector('input[name="bic"]');
    }
}