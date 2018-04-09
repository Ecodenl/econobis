import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewDocumentTemplate from "../../pages/document-template/model-new-document-template";
const faker = require('faker');

fixture `Create new document template minimum`;

const general = new ModelGeneral();
const newDocumentTemplate = new ModelNewDocumentTemplate();

test('Fill out form document template minimum', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/document-template/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuwe document template', 'Check element text', { timeout: 500 });

    await t
        .typeText(newDocumentTemplate.name, vars.documentTemplateName)
        .click(newDocumentTemplate.groupId)
        .click(general.option.filter('[value="general"]'))
        .click(newDocumentTemplate.typeId)
        .click(general.option.filter('[value="base"]'))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Document template: ' + vars.documentTemplateName, 'Check element text', { timeout: 500 });
});