import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
const faker = require('faker');
faker.locale = "nl";

import ModelGridContact from '../../pages/contact/model-grid-contact';
import ModelGeneral from '../../pages/model-general';
import ModelDetailsPerson from "../../pages/contact/model-details-person";

fixture `Create new housing file`;

const contactGrid = new ModelGridContact();
const general = new ModelGeneral();
const personDetails = new ModelDetailsPerson();

test('Fill out form housingfile', async (t) => {
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
        .click(personDetails.housingFileHarmonica)
        .wait(constants.wait);

    await t
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( 'Woningdossier voor: ' + vars.personStreet + ' ' + vars.personNumber, 'Check element text', { timeout: 500 });
});
