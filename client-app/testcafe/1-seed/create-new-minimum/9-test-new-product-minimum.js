import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewProduct from "../../pages/product/model-new-product";

const faker = require('faker');

fixture `Create new product minimum`;

const general = new ModelGeneral();
const newProduct = new ModelNewProduct();

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
        .click(newProduct.administrationId.child().nth(1))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Product: ' + vars.productName, 'Check element text', { timeout: 500 });
});