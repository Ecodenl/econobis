import { Selector, Role } from 'testcafe';
import superUser from '../auth/UserRoles';
import * as constants from '../config/constants';
import * as vars from '../config/random-models';
import ModelGeneral from '../pages/model-general';
import ModelIntakeGrid from "../pages/intake/model-grid-intake";

fixture `Remove intake`;

const intakeGrid = new ModelIntakeGrid();
const general = new ModelGeneral();

test('Remove intake', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/intakes');

    await t.expect(general.titleH3.innerText).eql('Intakes', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(intakeGrid.contactSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( 'Intake voor: ' + vars.personStreet + ' ' + vars.personNumber, 'Check element text', { timeout: 500 });

    await t
        .click(general.delete)
        .click(general.deleteConfirm)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Intakes', 'Check element text', { timeout: 500 });

    await t
        // .typeText(intakeGrid.contactSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Intakes', 'Check element text', { timeout: 500 });
});

