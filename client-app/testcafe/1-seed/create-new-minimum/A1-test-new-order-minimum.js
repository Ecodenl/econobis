import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewOrder from "../../pages/order/model-new-order";
import ModelGridContact from '../../pages/contact/model-grid-contact';
import ModelDetailsPerson from '../../pages/contact/model-details-person';
import ModelDetailsOrder from "../../pages/order/model-details-order";

fixture `Create new order minimum`;

const general = new ModelGeneral();
const newOrder = new ModelNewOrder();
const detailsOrder = new ModelDetailsOrder();
const contactGrid = new ModelGridContact();
const detailsPerson = new ModelDetailsPerson();
const faker = require('faker');
faker.locale = "nl";

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
        .click(general.option.withExactText(vars.administrationName))
        .click(newOrder.statusId)
        .click(general.option.withExactText('Actief'))
        .typeText(newOrder.subject, vars.orderSubject)
        .click(general.save)
        .wait(constants.wait);

    //Nieuw product
    await t
        .click(detailsOrder.newOrderProduct)
        .click(detailsOrder.newOrderProductExisting)
        .click(detailsOrder.product)
        .click(general.option.withExactText(vars.productName))
        .typeText(detailsOrder.amount, '2')
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsOrder.orderProductRows.count).eql(2);

    //Ook product met variabele prijs
    await t
        .click(detailsOrder.newOrderProduct)
        .click(detailsOrder.newOrderProductNew)
        .typeText(detailsOrder.code, faker.random.word())
        .typeText(detailsOrder.name, faker.random.word())
        .typeText(detailsOrder.price, '10')
        .typeText(detailsOrder.description, 'Nieuw product')
        .typeText(detailsOrder.amount, '3')
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsOrder.orderProductRows.count).eql(3);


    //Nieuw eenmalig product
    await t
        .click(detailsOrder.newOrderProduct)
        .click(detailsOrder.newOrderProductOneTime)
        .typeText(detailsOrder.price, '1000')
        .typeText(detailsOrder.description, 'Nieuw eenmalig product')
        .typeText(detailsOrder.amount, '4')
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsOrder.orderProductRows.count).eql(4);
});