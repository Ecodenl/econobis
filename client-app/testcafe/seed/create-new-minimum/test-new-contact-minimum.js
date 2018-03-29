import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new person`;

test('Create new person', async (t) => {

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/persoon');

    await t.expect(Selector('h4').innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });

    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/persoon')
        .typeText('input[name="firstName"]', randomFirstName)
        .typeText('input[name="lastName"]', randomLastName)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql( randomLastName + ', ' + randomFirstName +' (Persoon)', 'Check element text', { timeout: 500 });
});

fixture `Create new organisation`;

test('Check for title "Nieuw contact"', async (t) => {

    const randomName = faker.company.companyName();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/organisatie');

    await t.expect(Selector('h4').innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });

    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/organisatie')
        .typeText('input[name="name"]', randomName)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql( randomName + ' (Organisatie)', 'Check element text', { timeout: 500 });
});