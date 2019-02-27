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
        .typeText(emailInput, constants.email)
        .expect(emailInput.value).eql(constants.email)
        .typeText(passwordInput, constants.password)
        .click(submitButton);

    const location = await t.eval(() => window.location);

    await t.expect(location.pathname + '#/').eql(location.pathname + location.hash);
});

test('Login test with wrong credentials', async t => {
    await t
        .typeText(emailInput, 'verkeerdelogin@xaris.nl')
        .expect(emailInput.value).eql('verkeerdelogin@xaris.nl');

    await t
        .typeText(passwordInput, 'verkeerde_wachtwoord')
        .expect(passwordInput.value).eql('verkeerde_wachtwoord');

    await t
        .click(submitButton);

    const location = await getWindowLocation();

    await t.expect(location.pathname + '#/login').eql(location.pathname + location.hash);
});