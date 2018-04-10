import { Selector } from 'testcafe';

export default class ModelNewCampaign {
    constructor () {
        this.name = Selector('input[name="name"]');
        this.typeId = Selector('select[name="typeId"]');
    }


}