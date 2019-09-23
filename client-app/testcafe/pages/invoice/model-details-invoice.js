import { Selector } from 'testcafe';

export default class ModelDetailsOrder {
    constructor() {
        //order products
        this.newInvoiceProduct = Selector('span')
            .withExactText('Notaregels')
            .parent()
            .parent()
            .child()
            .nth(1)
            .child()
            .nth(0)
            .child('span');
        this.newInvoiceProductExisting = Selector('a').withExactText('Bestaand product');
        this.newInvoiceProductNew = Selector('a').withExactText('Nieuw product');
        this.newInvoiceProductOneTime = Selector('a').withExactText('Nieuw eenmalig product');
        this.product = Selector('select[name="productId"]');
        this.description = Selector('input[name="description"]');
        this.amount = Selector('input[name="amount"]');
        this.code = Selector('input[name="code"]');
        this.name = Selector('input[name="name"]');
        this.price = Selector('input[name="price"]');
        this.variablePrice = Selector('input[name="variablePrice"]');
        this.dateStart = Selector('input[name="dateStart"]');
        this.invoiceProductRows = Selector('span')
            .withExactText('Notaregels')
            .parent()
            .parent()
            .parent()
            .parent()
            .child()
            .nth(1)
            .child()
            .child()
            .child();
    }
}
