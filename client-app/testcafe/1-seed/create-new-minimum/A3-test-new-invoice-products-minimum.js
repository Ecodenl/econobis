import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from '../../config/random-models';
import ModelGeneral from '../../pages/model-general';

import ModelDetailsInvoice from '../../pages/invoice/model-details-invoice';
import ModelSideMenu from '../../pages/side-menu/model-side-menu';
import ModelFinancial from '../../pages/financial/model-financial';
const faker = require('faker');
faker.locale = 'nl';

fixture`Create new invoice products minimum`;

const general = new ModelGeneral();
const sideMenu = new ModelSideMenu();
const financial = new ModelFinancial();
const detailsInvoice = new ModelDetailsInvoice();

test('Fill out form invoice products minimum', async t => {
    await t.useRole(superUser).navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .click(sideMenu.lockMenu)
        .click(sideMenu.financialMain)
        .click(sideMenu.financial)
        .click(sideMenu.unlockMenu);

    await t.click(financial.allInvoices).wait(constants.wait);

    await t
        .typeText(financial.fourthSearchField, vars.orderSubject)
        .pressKey('enter')
        .wait(constants.wait);

    await t.doubleClick(general.firstRow).wait(constants.wait);

    //Nieuw product
    await t
        .click(detailsInvoice.newInvoiceProduct)
        .click(detailsInvoice.newInvoiceProductExisting)
        .click(detailsInvoice.product)
        .click(general.option.withExactText(vars.productName))
        .typeText(detailsInvoice.description, 'Test product')
        .typeText(detailsInvoice.amount, '2')
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsInvoice.invoiceProductRows.count).eql(5);

    //Ook product met variabele prijs
    await t
        .click(detailsInvoice.newInvoiceProduct)
        .click(detailsInvoice.newInvoiceProductExisting)
        .click(detailsInvoice.product)
        .click(general.option.withExactText(vars.productNameVariable))
        .typeText(detailsInvoice.description, 'Test variabel product')
        .typeText(detailsInvoice.amount, '2')
        .typeText(detailsInvoice.variablePrice, '10')
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsInvoice.invoiceProductRows.count).eql(6);

    //Ook product met variabele prijs
    await t
        .click(detailsInvoice.newInvoiceProduct)
        .click(detailsInvoice.newInvoiceProductNew)
        .typeText(detailsInvoice.code, faker.random.word())
        .typeText(detailsInvoice.name, faker.random.word())
        .typeText(detailsInvoice.price, '10')
        .typeText(detailsInvoice.description, 'Nieuw product')
        .typeText(detailsInvoice.amount, '3')
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsInvoice.invoiceProductRows.count).eql(7);

    //Nieuw eenmalig product
    await t
        .click(detailsInvoice.newInvoiceProduct)
        .click(detailsInvoice.newInvoiceProductOneTime)
        .typeText(detailsInvoice.price, '1000')
        .typeText(detailsInvoice.description, 'Nieuw eenmalig product')
        .typeText(detailsInvoice.amount, '4')
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsInvoice.invoiceProductRows.count).eql(8);
});
