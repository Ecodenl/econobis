import { Selector } from 'testcafe';

export default class ModelDetailsPerson {
    constructor () {
        //multiple usages
        this.number = Selector('input[name="number"]');
        this.type = Selector('select[name="typeId"]');

        //address
        this.newAddress = Selector('span').withExactText('Adres gegevens').parent().child('a');
        this.postalCode = Selector('input[name="postalCode"]');
        this.street = Selector('input[name="street"]');
        this.city = Selector('input[name="city"]');
        this.addressRows = Selector('span').withExactText('Adres gegevens').parent().parent().child().nth(1).child().child().child();

        //email
        this.newEmail = Selector('span').withExactText('E-mail gegevens').parent().child('a');
        this.email = Selector('input[name="email"]');
        this.emailRows = Selector('span').withExactText('E-mail gegevens').parent().parent().child().nth(1).child().child().child();

        //phone number
        this.newPhoneNumber = Selector('span').withExactText('Telefoon gegevens').parent().child('a');
        this.phoneNumberRows = Selector('span').withExactText('Telefoon gegevens').parent().parent().child().nth(1).child().child().child();

        //energy supplier
        this.newEnergySupplier = Selector('span').withExactText('Energieleveranciers').parent().child('a');
        this.energySupplier = Selector('select[name="energySupplierId"]');
        this.esType = Selector('select[name="contactEnergySupplyTypeId"]');
        this.energySupplierRows = Selector('span').withExactText('Energieleveranciers').parent().parent().child().nth(1).child().child().child();

        //occupation
        this.newOccupation = Selector('span').withExactText('Verbindingen').parent().child('a');
        this.reactSelect = Selector('.is-searchable');
        this.occupation = Selector('select[name="occupationId"]');
        this.occupationRows = Selector('span').withExactText('Verbindingen').parent().parent().child().nth(1).child().child().child();

        this.newContactNote = Selector('span').withExactText('Opmerkingen').parent().child('a');
        this.textarea = Selector('textarea');


        //harmonica's
        this.housingFileHarmonica = Selector('.harmonica-button').nth(7).child().nth(0).child().nth(1).child('a');
        this.intakeHarmonica = Selector('.harmonica-button').nth(5).child().nth(0).child().nth(1).child('a');
    }
}