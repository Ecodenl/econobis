import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new production project`;

test('Fill out form new production project', async (t) => {

    const randomName = faker.company.catchPhrase();
    const randomWord = faker.lorem.word();
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

    await t
        .click(Selector('button').withExactText('Rapportage').prevSibling().nth(1))
        .wait(constants.wait);

    await t.expect(Selector('h3').innerText).eql('Nieuwe participant', 'Check element text', { timeout: 500 });

    await t
        .click('select[name="contactId"]')
        .click(Selector('option').withText(randomLastName + ', ' + randomFirstName))
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql(randomLastName + ', ' + randomFirstName + '/' + randomName, 'Check element text', { timeout: 500 });
});