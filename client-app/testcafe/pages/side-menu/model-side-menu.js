import { Selector } from 'testcafe';
import * as vars from '../../config/random-models';

export default class ModelSideMenu {
    constructor() {
        this.lockMenu = Selector('span.glyphicon.glyphicon-menu-hamburger');
        this.unlockMenu = Selector('span.glyphicon.glyphicon-option-vertical.close-menu-option-vertical');
        this.financialMain = Selector('div').withExactText('Financieel');
        this.financial = Selector('div').withExactText(vars.administrationName);
    }
}
