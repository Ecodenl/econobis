import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelDetailsOrder from "../../pages/order/model-details-order";
import ModelSideMenu from '../../pages/side-menu/model-side-menu';
import ModelFinancial from '../../pages/financial/model-financial';
import ModelOrderPreviewInvoice from '../../pages/order/model-order-preview-invoice';

fixture `Create new invoice minimum`;

const general = new ModelGeneral();
const detailsOrder = new ModelDetailsOrder();
const previewOrder = new ModelOrderPreviewInvoice();
const sideMenu = new ModelSideMenu();
const financial = new ModelFinancial();

test('Fill out form invoice minimum, also send to test document creation', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .click(sideMenu.lockMenu)
        .click(sideMenu.financialMain)
        .click(sideMenu.financial)
        .click(sideMenu.unlockMenu);

    await t
        .click(financial.allOrders)
        .wait(constants.wait);

    await t
        .typeText(financial.thirdSearchField, vars.orderSubject)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t
        .click(detailsOrder.newInvoice);

    await t
        .click(previewOrder.createInvoices)
        .click(previewOrder.createInvoicesConfirm);
});