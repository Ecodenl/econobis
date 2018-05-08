import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewOrder from "../../pages/order/model-new-order";
import ModelGridContact from '../../pages/contact/model-grid-contact';
import ModelDetailsPerson from '../../pages/contact/model-details-person';

const faker = require('faker');

fixture `Create new order minimum`;

const general = new ModelGeneral();
const newOrder = new ModelNewOrder();
const contactGrid = new ModelGridContact();
const detailsPerson = new ModelDetailsPerson();

test('Fill out form order minimum', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(contactGrid.nameSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);
    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( vars.personLastName + ', ' + vars.personFirstName + ' (Persoon)', 'Check element text', { timeout: 500 });

    await t
        .click(detailsPerson.orderHarmonica)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Nieuwe order', 'Check element text', { timeout: 500 });

    await t
        .click(newOrder.administrationId)
        .click(newOrder.administrationId.child().nth(1))
        .typeText(newOrder.subject, 'Test Order')
        .click(general.save)
        .wait(constants.wait);
});