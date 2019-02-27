import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import ModelGeneral from "../../pages/model-general";
import ModelIntakeDetails from "../../pages/intake/model-details-intake";
import ModelIntakeGrid from "../../pages/intake/model-grid-intake";
import ModelOpportunityNew from "../../pages/opportunity/model-new-opportunity";
import * as vars from "../../config/random-models";
const faker = require('faker');
faker.locale = "nl";

fixture `Create new opportunity`;

const general = new ModelGeneral();
const intakeGrid = new ModelIntakeGrid();
const intakeDetails = new ModelIntakeDetails();
const opportunityNew = new ModelOpportunityNew();

test('Fill out form intake->opportunity', async (t) => {

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

    await t
        .click(intakeDetails.addMeasure)
        .click(intakeDetails.selectMeasure)
        .click(intakeDetails.selectMeasure.child().nth(3))
        .click(general.save)
        .wait(constants.wait);

    await t
        .click(intakeDetails.firstMakeOpportunityButton);

    await t.expect(general.titleH3.innerText).eql('Nieuwe kans', 'Check element text', { timeout: 500 });

    await t
        .click(opportunityNew.selectStatus)
        .click(opportunityNew.selectStatus.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(Selector('h4').innerText).eql( 'Kans: Dakisolatie voor ' + vars.personLastName + ', ' + vars.personFirstName, 'Check element text', { timeout: 500 });

});
