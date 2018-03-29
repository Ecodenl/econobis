import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new production project`;

test('Fill out form new production project', async (t) => {

    const randomName = faker.company.catchPhrase();
    const randomWord = faker.lorem.word();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/productie-project/nieuw')
        .wait(constants.wait);

    await t.expect(Selector('h3').innerText).eql('Nieuw productieproject', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="name"]', randomName)
        .typeText('input[name="code"]', randomWord)

        .click('select[name="ownedById"]')
        .click(Selector('option').filter('[value="1"]'))

        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql('Productie project ' + randomName, 'Check element text', { timeout: 500 });
});