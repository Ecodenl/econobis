import { Selector, Role } from 'testcafe';
import superUser from './auth/UserRoles';
import * as constants from './config/constants';

fixture `Create new person`
    .page `${constants.app_url}#/contact/nieuw/persoon`;

test('Check for title "Nieuw contact"', async (t) => {
    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/persoon');

    await t.expect(Selector('h4').innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });
});

test('Fill out form new person', async (t) => {
    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/persoon')
        .typeText('input[name="firstName"]', 'Rob')
        .typeText('input[name="lastName"]', 'Rollenberg')
        .click(Selector('button[type="submit"]'));

    await t.expect(Selector('h4').innerText).eql('Rollenberg, Rob (Persoon)', 'Check element text', { timeout: 500 });
});

fixture `Create new organisation`
    .page `${constants.app_url}#/contact/nieuw/organisatie`;

test('Check for title "Nieuw contact"', async (t) => {
    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/organisatie');

    await t.expect(Selector('h4').innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });
});

test('Fill out form new organisation', async (t) => {
    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/organisatie')
        .typeText('input[name="name"]', 'Organisatie 1')
        .click(Selector('button[type="submit"]'));

    await t.expect(Selector('h4').innerText).eql('Organisatie 1 (Organisatie)', 'Check element text', { timeout: 500 });
});