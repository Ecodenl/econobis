import { Selector } from 'testcafe';

export default class Task {
    constructor () {
        this.nameInput = Selector('#developer-name');
        this.note = Selector('textarea[name="note"]');
    }
}