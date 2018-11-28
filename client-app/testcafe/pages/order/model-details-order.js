import { Selector } from 'testcafe';

export default class ModelDetailsOrder {
    constructor () {
        //order products
        this.newOrderProduct = Selector('span').withExactText('Orderregels').parent().parent().child().nth(1).child().nth(0).child('span');
        this.newOrderProductExisting = Selector('a').withExactText('Bestaand product');
        this.newOrderProductNew = Selector('a').withExactText('Nieuw product');
        this.newOrderProductOneTime = Selector('a').withExactText('Nieuw eenmalig product');
        this.product = Selector('select[name="productId"]');
        this.description = Selector('input[name="description"]');
        this.amount = Selector('input[name="amount"]');
        this.code = Selector('input[name="code"]');
        this.name = Selector('input[name="name"]');
        this.price = Selector('input[name="price"]');
        this.variablePrice = Selector('input[name="variablePrice"]');
        this.dateStart = Selector('input[name="dateStart"]');
        this.orderProductRows = Selector('span').withExactText('Orderregels').parent().parent().parent().parent().child().nth(1).child().child().child();

        this.newInvoice = Selector('button').withExactText('Preview factuur');
        this.dateCollection = Selector('input[name="dateCollection"]');
    }
}