import { Selector, Role } from 'testcafe';
import superUser from '../auth/UserRoles';
import * as constants from '../config/constants';
import * as vars from '../config/random-models';
import ModelGridContact from '../pages/contact/model-grid-contact';
import ModelGeneral from '../pages/model-general';
const faker = require('faker');

fixture `Remove contact`;

const contactGrid = new ModelGridContact();
const general = new ModelGeneral();

test('Remove person', async (t) => {

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
        .click(general.delete)
        .click(general.deleteConfirm)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .typeText(contactGrid.nameSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });
});

test('Remove organisation', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(contactGrid.nameSearch, vars.organisationName)
        .pressKey('enter')
        .wait(constants.wait);
    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( vars.organisationName + ' (Organisatie)', 'Check element text', { timeout: 500 });

    await t
        .click(general.delete)
        .click(general.deleteConfirm)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .typeText(contactGrid.nameSearch, vars.organisationName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });
});
