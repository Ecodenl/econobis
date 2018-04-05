import { Selector } from 'testcafe';

export default class ModelDetailsIntake {
    constructor () {
        this.addMeasure = Selector('span').withExactText('Interesses').parent().child('a');
        this.selectMeasure = Selector('select[name="measureId"]');
        this.firstMakeOpportunityButton = Selector('button').withExactText('Maak kans').nth(0);
    }
}