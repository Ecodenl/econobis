import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewWebform from "../../pages/webform/model-new-webform";

const faker = require('faker');
faker.locale = "nl";

fixture `Create new webform minimum`;

const general = new ModelGeneral();
const newWebform = new ModelNewWebform();
const randomInt = faker.random.number({min:0, max:9999}).toString();

test('Fill out form team minimum', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/webformulier/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Nieuw webformulier', 'Check element text', { timeout: 500 });

    await t
        .typeText(newWebform.name, vars.webformName)
        .typeText(newWebform.maxRequestsPerMinute, randomInt)
        .click(newWebform.responsible)
        .click(general.option.filter('[value="user1"]'))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Webformulier: ' + vars.webformName, 'Check element text', { timeout: 500 });
});