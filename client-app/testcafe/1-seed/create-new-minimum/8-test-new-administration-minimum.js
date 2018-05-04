import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewAdministration from "../../pages/administration/model-new-administration";

const faker = require('faker');

fixture `Create new administration minimum`;

const general = new ModelGeneral();
const newAdministration = new ModelNewAdministration();

test('Fill out form administration minimum', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/administratie/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Nieuwe administratie', 'Check element text', { timeout: 500 });

    await t
        .typeText(newAdministration.name, vars.administrationName)
        .typeText(newAdministration.btwNumber, faker.random.number(10000).toString())
        .typeText(newAdministration.IBAN, 'AD1200012030200359100100')
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Administratie: ' + vars.administrationName, 'Check element text', { timeout: 500 });
});