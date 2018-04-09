import { Selector } from 'testcafe';

export default class ModelNewTeam {
    constructor () {
        this.name = Selector('input[name="name"]');
    }
}