import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewContactGroup from "../../pages/contact-group/model-new-contact-group";

const faker = require('faker');

fixture `Create new contact group`;

const general = new ModelGeneral();
const newContactGroup = new ModelNewContactGroup();

test('Fill out form new contact group', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact-groep/nieuw');

    await t.expect(general.titleH4.innerText).eql('Nieuwe groep', 'Check element text', { timeout: 500 });

    await t
        .typeText(newContactGroup.name, vars.contactGroupName)
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.withExactText(vars.contactGroupName).innerText).eql(vars.contactGroupName, 'Check element text', { timeout: 500 });
});