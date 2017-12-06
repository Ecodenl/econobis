import { Selector, ClientFunction } from 'testcafe';

const emailInput = Selector('#email');
const passwordInput = Selector('#password');

const getWindowLocation = ClientFunction(() => window.location);


fixture `Getting Started`
    .page `http://localhost:8888/econobis/public/#/login`;

test('Login test', async t => {
    await t
        .typeText(emailInput, 'info@xaris.nl')
        .expect(emailInput.value).eql('info@xaris.nl');

    await t
        .typeText(passwordInput, 'secret')
        .expect(passwordInput.value).eql('secret');

    await t
        .click('#submit-button');

    const location = await t.eval(() => window.location);

    await t.expect(location.pathname + location.hash).eql('/econobis/public/#/');
});

test('Login test met verkeerde loginnaam', async t => {
    await t
        .typeText(emailInput, 'verkeerdelogin@xaris.nl')
        .expect(emailInput.value).eql('verkeerdelogin@xaris.nl');

    await t
        .typeText(passwordInput, 'secret')
        .expect(passwordInput.value).eql('secret');

    await t
        .click('#submit-button')

    const location = await getWindowLocation();

    await t.expect(location.pathname + location.hash).eql('/econobis/public/#/login');
});