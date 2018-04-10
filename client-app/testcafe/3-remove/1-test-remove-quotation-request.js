import { Selector, Role } from 'testcafe';
import superUser from '../auth/UserRoles';
import * as constants from '../config/constants';
import * as vars from '../config/random-models';
import ModelGridQuotationRequest from '../pages/quotation-request/model-grid-quotation-request';
import ModelGeneral from '../pages/model-general';
const faker = require('faker');

fixture `Remove quotation request`;

const quotationRequestGrid = new ModelGridQuotationRequest();
const general = new ModelGeneral();

test('Remove quotation request', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/offerteverzoeken');

    await t.expect(general.titleH3.innerText).eql('Offerteverzoeken', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(quotationRequestGrid.nameSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( 'Offerteverzoek voor ' + vars.personLastName + ', ' + vars.personFirstName + ' op ' + vars.personStreet + ' ' + vars.personNumber, 'Check element text', { timeout: 500 });

    await t
        .click(general.delete)
        .click(general.deleteConfirm)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Offerteverzoeken', 'Check element text', { timeout: 500 });

    await t
        // .typeText(quotationRequestGrid.nameSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Offerteverzoeken', 'Check element text', { timeout: 500 });
});

