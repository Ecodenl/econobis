import { Selector, ClientFunction } from 'testcafe';

import * as constants from '../../config/constants';

const emailInput = Selector('input[name="username"]');
const passwordInput = Selector('input[name="password"]');

const getWindowLocation = ClientFunction(() => window.location);
const submitButton = Selector('button[type="submit"]');

fixture `Log in`
    .page `${constants.app_url}#/login`;

test('Login test', async t => {
    await t
        .typeText(emailInput, 'info@xaris.nl')
        .expect(emailInput.value).eql('info@xaris.nl')
        .typeText(passwordInput, 'secret')
        .click(submitButton);

    const location = await t.eval(() => window.location);

    await t.expect(location.pathname + '#/').eql(location.pathname + location.hash);
});

test('Login test with wrong credentials', async t => {
    await t
        .typeText(emailInput, 'verkeerdelogin@xaris.nl')
        .expect(emailInput.value).eql('verkeerdelogin@xaris.nl');

    await t
        .typeText(passwordInput, 'secret')
        .expect(passwordInput.value).eql('secret');

    await t
        .click(submitButton);

    const location = await getWindowLocation();

    await t.expect(location.pathname + '#/login').eql(location.pathname + location.hash);
});