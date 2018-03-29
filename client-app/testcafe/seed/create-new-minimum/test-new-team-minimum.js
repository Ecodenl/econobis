import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new team minimum`;

test('Fill out form team minimum', async (t) => {

    const randomWord = faker.lorem.word();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/team/nieuw')
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql('Nieuw team', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="name"]', randomWord)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql('Team: ' + randomWord, 'Check element text', { timeout: 500 });
});