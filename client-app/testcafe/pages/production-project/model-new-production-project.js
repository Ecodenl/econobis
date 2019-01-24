import { Selector } from 'testcafe';

export default class ModelNewProject {
    constructor () {
        this.name = Selector('input[name="name"]');
        this.code = Selector('input[name="code"]');
        this.ownedById = Selector('select[name="ownedById"]');
    }
}