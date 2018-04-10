import { Selector } from 'testcafe';

export default class ModelGridTask {
    constructor () {
        this.noteSearch = Selector('input[type="text"]').nth(1);
    }
}