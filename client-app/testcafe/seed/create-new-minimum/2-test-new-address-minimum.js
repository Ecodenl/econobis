import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from '../../config/random-models';
import ModelGridContact from '../../pages/contact/model-grid-contact';
import ModelDetailsPerson from '../../pages/contact/model-details-person';
import ModelGeneral from '../../pages/model-general';
const faker = require('faker');

fixture `Create new address`;

const contactGrid = new ModelGridContact();
const personDetails = new ModelDetailsPerson();
const general = new ModelGeneral();

test('Fill out form person->address', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(contactGrid.nameSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);
    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( vars.personLastName + ', ' + vars.personFirstName + ' (Persoon)', 'Check element text', { timeout: 500 });

    await t
        .click(personDetails.newAddress)
        .typeText(personDetails.postalCode, vars.personPostalCode)
        .typeText(personDetails.number, vars.personNumber.toString())
        .typeText(personDetails.street, vars.personStreet)
        .typeText(personDetails.city, vars.personCity)
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(personDetails.addressRows.count).eql(2);
});