import { Selector } from 'testcafe';

export default class ModelGeneral {
    constructor () {
        this.save = Selector('button').withExactText('Opslaan');
        this.titleH3 = Selector('h3');
        this.titleH4 = Selector('h4');
        this.firstRow = Selector('tbody').nth(0).child('tr').nth(0);
        this.option = Selector('option');
        this.back = Selector('span.glyphicon.glyphicon-arrow-left');
        this.delete = Selector('span.glyphicon.glyphicon-trash');
        this.deleteConfirm = Selector('button').withExactText('Verwijder');
    }
}