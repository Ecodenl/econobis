import { Selector } from 'testcafe';

export default class ModelDetailsProduct {
    constructor() {
        //price history
        this.newPriceHistory = Selector('span')
            .withExactText('Prijshistorie')
            .parent()
            .child('a');
        this.dateStart = Selector('input[name="dateStart"]');
        this.input_incl_vat = Selector('.react-toggle');
        this.price = Selector('input[name="price"]');
        this.price_incl_vat = Selector('input[name="priceInclVat"]');

        //werkt niet?
        //this.hasVariablePrice = Selector('input[name="hasVariablePrice"]');
        this.hasVariablePrice = Selector('.react-toggle');

        this.vatPercentage = Selector('select[name="vatPercentage"]');

        this.priceHistoryRows = Selector('span')
            .withExactText('Prijshistorie')
            .parent()
            .parent()
            .child()
            .nth(1)
            .child()
            .child()
            .child();
    }
}
