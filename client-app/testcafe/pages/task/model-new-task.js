import { Selector } from 'testcafe';

export default class ModelNewTask {
    constructor () {
        this.note = 'textarea[name="note"]';
        this.responsible = 'select[name="responsible"]';
        this.datePlannedStart = 'input[name="datePlannedStart"]';
    }


}