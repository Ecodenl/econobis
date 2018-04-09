import { Selector } from 'testcafe';

export default class ModelNewContactGroup {
    constructor () {
        this.name = Selector('input[name="name"]');
    }


}