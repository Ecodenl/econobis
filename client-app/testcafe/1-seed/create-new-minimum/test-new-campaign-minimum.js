import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelNewCampaign from "../../pages/campaign/model-new-campaign";
import ModelGeneral from "../../pages/model-general";

const faker = require('faker');
faker.locale = "nl";

fixture `Create new campaign minimum`;

const general = new ModelGeneral();
const newCampaign = new ModelNewCampaign();

test('Fill out form campaign minimum', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/campagne/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuwe campagne', 'Check element text', { timeout: 500 });

    await t
        .typeText(newCampaign.name, vars.campaignName)
        .click(newCampaign.typeId)
        .click(newCampaign.typeId.child().nth(faker.random.number({min:1, max:5})))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Campagne: ' + vars.campaignName, 'Check element text', { timeout: 500 });
});