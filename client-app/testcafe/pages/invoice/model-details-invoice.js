import { Selector } from 'testcafe';

export default class ModelDetailsInvoice {
    constructor () {
        this.checked = Selector('span.glyphicon.glyphicon-ok');
        this.send = Selector('span.glyphicon.glyphicon-envelope');
    }
}