import { Selector } from 'testcafe';

export default class ModelDetailsTask {
    constructor () {
        this.description = Selector('#description');
        this.newProperty = Selector('span').withExactText('Extra kenmerken').parent().child('a');
        this.propertyId = Selector('select[name="propertyId"]');
        this.propertyValue = Selector('input[name="value"]');
        this.propertyRows = Selector('span').withExactText('Extra kenmerken').parent().parent().child().nth(1).child().child().child();
    }
}