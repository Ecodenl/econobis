import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new housing file`;

test('Fill out form person->intake->opportunity', async (t) => {

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
        .click(Selector('button[type="submit"]'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql( randomLastName + ', ' + randomFirstName + ' (Persoon)', 'Check element text', { timeout: 500 });

    await t
        .click(Selector('span').withText('Adres gegevens').parent().child('a'))
        .typeText('input[name="postalCode"]', randomPostalCode)
        .typeText('input[name="number"]', randomNumber.toString())
        .typeText('input[name="street"]', randomStreet)
        .typeText('input[name="city"]', randomCity)
        .click(Selector('button').withText('Opslaan'))
        .wait(constants.wait);

    await t
        .click(Selector('.harmonica-button').nth(5).child().nth(0).child().nth(1).child('a'))
        .wait(constants.wait);

    await t
        .click(Selector('button').withText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql( 'Intake voor: ' + randomStreet + ' ' + randomNumber, 'Check element text', { timeout: 500 });

    await t
        .click(Selector('span').withText('Interesses').parent().child('a'))
        .click('select[name="measureId"]')
        .click(Selector('select[name="measureId"]').child().nth(3))
        .click(Selector('button').withText('Opslaan'))
        .wait(constants.wait);

    await t
        .click(Selector('button').withText('Maak kans'))
        .click('select[name="statusId"]')
        .click(Selector('select[name="statusId"]').child().nth(faker.random.number({min:1, max:4})))
        .click(Selector('button').withText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql( 'Kans: Dakisolatie voor ' + randomLastName + ', ' + randomFirstName, 'Check element text', { timeout: 500 });

});
