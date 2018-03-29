import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new task minimum`;


test('Fill out form task minimum', async (t) => {

    const randomSentence = faker.lorem.sentence();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw')
        .wait(200);

    await t.expect(Selector('h3').innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .typeText('textarea[name="note"]', randomSentence)
        .click('select[name="responsible"]')
        .click(Selector('option').filter('[value="user1"]'))
        .click(Selector('button').withText('Opslaan'))
        .wait(200);

    await t.expect(Selector('#description').innerText).eql(randomSentence, 'Check element text', { timeout: 500 });
});