import { Selector, Role } from 'testcafe';
import superUser from '../auth/UserRoles';
import * as constants from '../config/constants';
import * as vars from '../config/random-models';
import ModelGeneral from '../pages/model-general';
import ModelOpportunityGrid from "../pages/opportunity/model-grid-opportunity";

fixture `Remove opportunity`;

const gridOpportunity = new ModelOpportunityGrid();
const general = new ModelGeneral();

test('Remove opportunity', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/kansen');

    await t.expect(general.titleH3.innerText).eql('Kansen', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(gridOpportunity.contactSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( 'Kans: Dakisolatie voor ' + vars.personLastName + ', ' + vars.personFirstName, 'Check element text', { timeout: 500 });

    await t
        .click(general.delete)
        .click(general.deleteConfirm)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Kansen', 'Check element text', { timeout: 500 });

    await t
        // .typeText(gridOpportunity.contactSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Kansen', 'Check element text', { timeout: 500 });
});

