import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new postalcode link minimum`;

test('Fill out form postalcode link minimum', async (t) => {

    const randomInt = faker.random.number({min:1000, max:9998}).toString();
    const randomInt2 = faker.random.number({min:1000, max:9998}).toString();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/postcoderoos')
        .wait(constants.wait);

    await t.expect(Selector('h3').innerText).eql('Postcoderoos', 'Check element text', { timeout: 500 });

    await t
        .click(Selector('span.glyphicon-plus'))
        .wait(constants.wait);

    await t.expect(Selector('label').nth(0).innerText).eql('Kern postcode', 'Check element text', { timeout: 500 });
    await t.expect(Selector('label').nth(1).innerText).eql('Link postcode', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="postalCodeMain"]', randomInt)
        .typeText('input[name="postalCodeLink"]', randomInt2)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('td').nth(-3).innerText).eql(randomInt, 'Check element text', { timeout: 500 });
    await t.expect(Selector('td').nth(-2).innerText).eql(randomInt2, 'Check element text', { timeout: 500 });
});