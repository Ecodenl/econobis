import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from '../../config/random-models';
import ModelGeneral from '../../pages/model-general';
import ModelNewTeam from '../../pages/team/model-new-team';

const faker = require('faker');

fixture`Create new team minimum`;

const general = new ModelGeneral();
const newTeam = new ModelNewTeam();

test('Fill out form team minimum', async t => {
    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/team/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Nieuw team', 'Check element text', { timeout: 500 });

    await t
        .typeText(newTeam.name, vars.teamName)
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Team: ' + vars.teamName, 'Check element text', { timeout: 500 });
});
