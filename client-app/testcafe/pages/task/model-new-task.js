import { Selector } from 'testcafe';

export default class ModelNewTask {
    constructor () {
        this.note = Selector('textarea[name="note"]');
        this.responsible = Selector('select[name="responsible"]');
        this.datePlannedStart = Selector('input[name="datePlannedStart"]');
        this.datePlannedFinish = Selector('input[name="datePlannedFinish"]');
        this.dateFinished = Selector('input[name="dateFinished"]');
        this.typeId = Selector('select[name="typeId"]');
        this.startTimePlanned = Selector('select[name="startTimePlanned"]');
        this.endTimePlanned = Selector('select[name="endTimePlanned"]');
        this.toggle = Selector('.react-toggle');
        this.finishedById = Selector('select[name="finishedById"]');
        this.reactSelect = Selector('.is-searchable');
    }


}