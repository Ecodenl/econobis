import { Selector } from 'testcafe';

export default class ModelGeneralProject {
    constructor() {
        this.rapportageButton = Selector('button').withExactText('Rapportage');
        this.details = Selector('button').withExactText('Open detailformulier');
    }
}
