import { Selector } from 'testcafe';

export default class ModelDetailsPerson {
    constructor () {
        this.newAddress = Selector('span').withExactText('Adres gegevens').parent().child('a');
        this.postalCode = Selector('input[name="postalCode"]');
        this.number = Selector('input[name="number"]');
        this.street = Selector('input[name="street"]');
        this.city = Selector('input[name="city"]');
        this.addressRows = Selector('span').withExactText('Adres gegevens').parent().parent().child().nth(1).child().child().child();
    }
}