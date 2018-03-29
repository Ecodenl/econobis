import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');

fixture `Create new document template minimum`;

test('Fill out form document template minimum', async (t) => {

    const randomSentence = faker.lorem.sentence();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/document-template/nieuw')
        .wait(constants.wait);

    await t.expect(Selector('h3').innerText).eql('Nieuw document template', 'Check element text', { timeout: 500 });

    await t
        .typeText('input[name="name"]', randomSentence)
        .click('select[name="documentGroupId"]')
        .click(Selector('option').filter('[value="general"]'))
        .click('select[name="documentTemplateTypeId"]')
        .click(Selector('option').filter('[value="base"]'))
        .click(Selector('button').withExactText('Opslaan'))
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql('Document template: ' + randomSentence, 'Check element text', { timeout: 500 });
});