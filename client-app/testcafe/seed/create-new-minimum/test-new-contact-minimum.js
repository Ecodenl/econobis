import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import ModelNewPerson from '../../pages/contact/model-new-person';
import ModelNewOrganisation from '../../pages/contact/model-new-organisation';
import ModelGeneral from '../../pages/model-general';
const faker = require('faker');

fixture `Create new person`;

const person = new ModelNewPerson();
const organisation = new ModelNewOrganisation();
const general = new ModelGeneral();

test('Create new person', async (t) => {

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/persoon');

    await t.expect(general.titleH4.innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });

    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/persoon')
        .typeText(person.firstName, randomFirstName)
        .typeText(person.lastName, randomLastName)
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( randomLastName + ', ' + randomFirstName +' (Persoon)', 'Check element text', { timeout: 500 });
});

fixture `Create new organisation`;

test('Check for title "Nieuw contact"', async (t) => {

    const randomName = faker.company.companyName();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/organisatie');

    await t.expect(general.titleH4.innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });

    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/organisatie')
        .typeText(organisation.name, randomName)
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( randomName + ' (Organisatie)', 'Check element text', { timeout: 500 });
});