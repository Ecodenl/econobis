import { Selector } from 'testcafe';

export default class ModelOrderPreviewInvoice {
    constructor () {
        this.createInvoices = Selector('button').withExactText('Maak facturen');
        this.createInvoicesConfirm = Selector('button').withExactText('Aanmaken');
    }
}