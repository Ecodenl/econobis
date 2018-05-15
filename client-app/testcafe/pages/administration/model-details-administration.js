import { Selector } from 'testcafe';

export default class ModelDetailsAdministration {
    constructor () {
        //order products
        this.newUser = Selector('span').withExactText('Gekoppelde gebruikers').parent().child('a');
        this.user = Selector('select[name="userId"]');
        this.userRows = Selector('span').withExactText('Gekoppelde gebruikers').parent().parent().child().nth(1).child().child().child();

    }
}