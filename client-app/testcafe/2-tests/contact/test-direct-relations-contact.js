import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
const faker = require('faker');
faker.locale = "nl";
import ModelDetailsPerson from '../../pages/contact/model-details-person';
import ModelGridContact from '../../pages/contact/model-grid-contact';
import ModelGeneral from "../../pages/model-general";

fixture `Create new relations for contact`;

const general = new ModelGeneral();
const gridContact = new ModelGridContact();
const detailsPerson = new ModelDetailsPerson();

test('Create new relations for person with minimum fields', async (t) => {

    //address is already done in seeder.
    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(gridContact.nameSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.personLastName + ', ' + vars.personFirstName + ' (Persoon)', 'Check element text', { timeout: 500 });

    await t
        .click(detailsPerson.newEmail)
        .typeText(detailsPerson.email, faker.internet.email())
        .click(detailsPerson.type)
        .click(detailsPerson.type.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(detailsPerson.emailRows.count).eql(2);

    await t
        .click(detailsPerson.newPhoneNumber)
        .typeText(detailsPerson.number, faker.phone.phoneNumber())
        .click(detailsPerson.type)
        .click(detailsPerson.type.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(detailsPerson.phoneNumberRows.count).eql(2);

    await t
        .click(detailsPerson.newEnergySupplier)
        .click(detailsPerson.energySupplier)
        .click(detailsPerson.energySupplier.child().nth(1))
        .click(detailsPerson.esType)
        .click(detailsPerson.esType.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(detailsPerson.energySupplierRows.count).eql(2);

    await t
        .click(detailsPerson.newOccupation)
        .typeText(detailsPerson.reactSelect.nth(0), vars.organisationName)
        .pressKey('enter')
        .click(detailsPerson.occupation)
        .click(detailsPerson.occupation.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(detailsPerson.occupationRows.count).eql(2);

    const note = faker.lorem.sentence();

    await t
        .click(detailsPerson.newContactNote)
        .typeText(detailsPerson.textarea, note)
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(Selector('div').withExactText(note).count).eql(1);
});

test('Create new relations for organisation with minimum fields', async (t) => {

    //address is already done in seeder.
    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(gridContact.nameSearch, vars.organisationName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.organisationName + ' (Organisatie)', 'Check element text', { timeout: 500 });

    await t
        .click(detailsPerson.newEmail)
        .typeText(detailsPerson.email, faker.internet.email())
        .click(detailsPerson.type)
        .click(detailsPerson.type.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(detailsPerson.emailRows.count).eql(2);

    await t
        .click(detailsPerson.newPhoneNumber)
        .typeText(detailsPerson.number, faker.phone.phoneNumber())
        .click(detailsPerson.type)
        .click(detailsPerson.type.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(detailsPerson.phoneNumberRows.count).eql(2);

    await t
        .click(detailsPerson.newEnergySupplier)
        .click(detailsPerson.energySupplier)
        .click(detailsPerson.energySupplier.child().nth(1))
        .click(detailsPerson.esType)
        .click(detailsPerson.esType.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(detailsPerson.energySupplierRows.count).eql(2);

    await t
        .click(detailsPerson.newOccupation)
        .typeText(detailsPerson.reactSelect.nth(0), vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .click(detailsPerson.occupation)
        .click(detailsPerson.occupation.child().nth(2))
        .click(general.save)
        .wait(constants.wait);

    //Header + 2 row
    await t.expect(detailsPerson.occupationRows.count).eql(3);

    const note = faker.lorem.sentence();

    await t
        .click(detailsPerson.newContactNote)
        .typeText(detailsPerson.textarea, note)
        .click(general.save)
        .wait(constants.wait);

    //Header + 1 row
    await t.expect(Selector('div').withExactText(note).count).eql(1);
});