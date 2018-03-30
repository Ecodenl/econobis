import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new production project`;

test('Fill out form new production project', async (t) => {

    const randomName = faker.company.catchPhrase();
    const randomWord = faker.lorem.word();
    const randomInt = faker.random.number({min:0, max:9999}).toString();
    const randomInt2 = faker.random.number({min:0, max:9999}).toString();

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
        .click(Selector('button').withExactText('Open detailformulier'))
        .wait(constants.wait);

    await t
        .click(Selector('span').withExactText('Waarde verloop participaties').parent().child('a'))
        .typeText(Selector('.DayPickerInput').nth(0).child('input'), '11-03-2018')
        .typeText('input[name="bookWorth"]', randomInt)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t
        .click(Selector('span').withExactText('Waarde verloop participaties').parent().child('a'))
        .typeText(Selector('.DayPickerInput').nth(0).child('input'), '11-03-2018')
        .typeText('input[name="bookWorth"]', randomInt2)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    const rows = Selector('span').withExactText('Waarde verloop participaties').parent().parent().child().nth(1).child().child().child();

    //Header + 2 rows
    await t.expect(rows.count).eql(3);

});