import { Selector } from 'testcafe';

export default class ModelDetailsTask {
    constructor () {
        this.description = Selector('#description');
    }
}