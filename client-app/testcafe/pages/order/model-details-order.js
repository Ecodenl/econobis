import { Selector } from 'testcafe';

export default class ModelDetailsOrder {
    constructor () {
        //order products
        this.newOrderProduct = Selector('span').withExactText('Orderregels').parent().child('a');
        this.product = Selector('select[name="productId"]');
        this.description = Selector('input[name="description"]');
        this.amount = Selector('input[name="amount"]');
        this.dateStart = Selector('input[name="dateStart"]');
        this.orderProductRows = Selector('span').withExactText('Orderregels').parent().parent().child().nth(1).child().child().child();

        this.newInvoice = Selector('button').withExactText('Maak factuur');
        this.dateCollection = Selector('input[name="dateCollection"]');
    }
}