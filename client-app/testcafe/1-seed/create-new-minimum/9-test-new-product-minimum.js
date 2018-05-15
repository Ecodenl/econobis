import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewProduct from "../../pages/product/model-new-product";
import ModelDetailsProduct from "../../pages/product/model-details-product";

const faker = require('faker');

fixture `Create new product minimum`;

const general = new ModelGeneral();
const newProduct = new ModelNewProduct();
const detailsProduct = new ModelDetailsProduct();

test('Fill out form product minimum', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/product/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Nieuw product', 'Check element text', { timeout: 500 });

    await t
        .typeText(newProduct.code, faker.random.word())
        .typeText(newProduct.name, vars.productName)
        .click(newProduct.administrationId)
        .click(general.option.withExactText(vars.administrationName))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Product: ' + vars.productName, 'Check element text', { timeout: 500 });

    await t
        .click(detailsProduct.newPriceHistory)
        .typeText(detailsProduct.dateStart, '01-01-2018')
        .pressKey('esc')
        .typeText(detailsProduct.price, '100')
        .click(detailsProduct.vatPercentage)
        .click(general.option.withExactText('21'))
        .click(general.save)
        .wait(constants.wait);

    //header+row
    await t.expect(detailsProduct.priceHistoryRows.count).eql(2);
});