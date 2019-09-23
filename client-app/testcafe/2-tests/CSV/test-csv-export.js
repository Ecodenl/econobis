import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from '../../config/random-models';
const faker = require('faker');
faker.locale = 'nl';
import ModelGeneral from '../../pages/model-general';

fixture`Test the default CSV exports`;

const general = new ModelGeneral();

test('Export contacts', async t => {
    await t.useRole(superUser).navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t.click(general.export);
});

test('Export orders', async t => {
    await t.useRole(superUser).navigateTo(constants.app_url + '#/financieel/1/orders');

    await t.click(general.export);
});

test('Export invoices', async t => {
    await t.useRole(superUser).navigateTo(constants.app_url + '#/financieel/1/notas');

    await t.click(general.export);
});
