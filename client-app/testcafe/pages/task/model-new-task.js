import { Selector } from 'testcafe';

export default class ModelNewTask {
    constructor () {
        this.note = Selector('textarea[name="note"]');
        this.responsible = Selector('select[name="responsible"]');
        this.datePlannedStart = Selector('input[name="datePlannedStart"]');
    }


}