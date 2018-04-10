import { Selector } from 'testcafe';

export default class ModelNewOpportunity {
    constructor () {
        this.selectStatus = Selector('select[name="statusId"]');
    }


}