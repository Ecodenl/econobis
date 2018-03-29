import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new housing file`;

test('Fill out form person->address->housingfile', async (t) => {

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    const randomPostalCode = faker.address.zipCode();
    const randomStreet = faker.address.streetName();
    const randomCity = faker.address.city();
    const randomNumber = faker.random.number();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/persoon');

    await t.expect(Selector('h4').innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="firstName"]', randomFirstName)
        .typeText('input[name="lastName"]', randomLastName)
        .click(Selector('button').withText('Opslaan'))
        .wait(200);

    await t.expect(Selector('h4').innerText).eql( randomLastName + ', ' + randomFirstName + ' (Persoon)', 'Check element text', { timeout: 500 });

    await t
        .click(Selector('span').withText('Adres gegevens').parent().child('a'))
        .typeText('input[name="postalCode"]', randomPostalCode)
        .typeText('input[name="number"]', randomNumber.toString())
        .typeText('input[name="street"]', randomStreet)
        .typeText('input[name="city"]', randomCity)
        .click(Selector('button').withText('Opslaan'))
        .wait(200);

    await t
        .click(Selector('.harmonica-button').nth(7).child().nth(0).child().nth(1).child('a'))
        .wait(200);

    await t
        .click(Selector('button').withText('Opslaan'))
        .wait(200);

    await t.expect(Selector('h4').innerText).eql( 'Woningdossier voor: ' + randomStreet + ' ' + randomNumber, 'Check element text', { timeout: 500 });
});
