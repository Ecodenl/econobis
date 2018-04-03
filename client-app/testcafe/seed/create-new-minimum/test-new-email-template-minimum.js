import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new email template minimum`;

test('Fill out form email template minimum', async (t) => {

    const randomWord = faker.lorem.word();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/email-template/nieuw')
        .wait(constants.wait);

    await t.expect(Selector('h3').innerText).eql('Nieuwe email template', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="name"]', randomWord)
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql('Email template: ' + randomWord, 'Check element text', { timeout: 500 });
});