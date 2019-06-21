import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from '../../config/random-models';
import ModelGeneral from '../../pages/model-general';
import ModelNewEmailTemplate from '../../pages/email-template/model-new-email-template';
const faker = require('faker');

fixture`Create new email template minimum`;

const general = new ModelGeneral();
const newEmailTemplate = new ModelNewEmailTemplate();

test('Fill out form email template minimum', async t => {
    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/email-template/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuwe e-mail template', 'Check element text', { timeout: 500 });

    await t
        .typeText(newEmailTemplate.name, vars.emailTemplateName)
        .click(general.save)
        .wait(constants.wait);

    await t
        .expect(general.titleH4.innerText)
        .eql('E-mail template: ' + vars.emailTemplateName, 'Check element text', { timeout: 500 });
});
