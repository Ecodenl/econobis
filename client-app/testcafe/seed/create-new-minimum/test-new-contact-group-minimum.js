import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new contact group`;

test('Fill out form new contact group', async (t) => {

    const randomName = faker.name.findName();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact-groep/nieuw');

    await t.expect(Selector('h4').innerText).eql('Nieuwe groep', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="name"]', randomName)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').withExactText(randomName).innerText).eql(randomName, 'Check element text', { timeout: 500 });
});