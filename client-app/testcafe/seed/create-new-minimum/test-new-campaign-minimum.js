import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new task minimum`;


test('Fill out form campaign minimum', async (t) => {

    const randomSentence = faker.lorem.sentence();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/campagne/nieuw')
        .wait(constants.wait);

    await t.expect(Selector('h3').innerText).eql('Nieuwe campagne', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="name"]', randomSentence)
        .click('select[name="typeId"]')
        .click(Selector('select[name="typeId"]').child().nth(faker.random.number({min:1, max:5})))
        .click(Selector('button').withText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql('Campagne: ' + randomSentence, 'Check element text', { timeout: 500 });
});