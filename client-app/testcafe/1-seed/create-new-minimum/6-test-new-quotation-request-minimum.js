import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelOpportunityGrid from "../../pages/opportunity/model-grid-opportunity";
import ModelOpportunityDetails from "../../pages/opportunity/model-details-opportunity";
const faker = require('faker');

fixture `Create new quotationRequest`;

const general = new ModelGeneral();
const gridOpportunity = new ModelOpportunityGrid();
const detailsOpportunity = new ModelOpportunityDetails();

test('Fill out form opportunity->quotationRequest', async (t) => {

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

    await t.expect(Selector('h4').innerText).eql( 'Kans: Dakisolatie voor ' + vars.personLastName + ', ' + vars.personFirstName, 'Check element text', { timeout: 500 });

    await t
        .click(detailsOpportunity.addQuotationRequests)
        .click(detailsOpportunity.selectOrganisation)
        .click(general.option.withExactText(vars.organisationName))
        .click(detailsOpportunity.selectStatus)
        .click(detailsOpportunity.selectStatus.child().nth(2))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( 'Offerteverzoek voor ' + vars.personLastName + ', ' + vars.personFirstName + ' op ' + vars.personStreet + ' ' + vars.personNumber, 'Check element text', { timeout: 500 });
});
