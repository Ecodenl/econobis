import { Selector } from 'testcafe';

export default class ModelPostalcodeLink {
    constructor () {
        this.new = Selector('span.glyphicon-plus');
        this.mainLabel = Selector('label').nth(0);
        this.linkLabel = Selector('label').nth(1);
        this.mainInput = Selector('input[name="postalCodeMain"]');
        this.linkInput = Selector('input[name="postalCodeLink"]');
        this.mainTD = Selector('td').nth(-3);
        this.linkTD = Selector('td').nth(-2);
    }
}