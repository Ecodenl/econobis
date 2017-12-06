import { Selector, Role } from 'testcafe';
import superUser from './auth/UserRoles';

fixture `Aanmaken nieuw persoon`
    .page `http://localhost:8888/econobis/public/#/contact/nieuw/persoon`;

const title = Selector('h4');
const lastName ='input[name="lastName"]';
const submitButton = Selector('button[type="submit"]');

test('Check for title "Nieuw contact"', async (t) => {
    await t
        .useRole(superUser)
        .navigateTo('http://localhost:8888/econobis/public/#/contact/nieuw/persoon')
        .expect(title.innerText).eql('Nieuw contact')
        .takeScreenshot('contact/newFormEmpty.png');
});

test('Fill out form new contact without status', async (t) => {
    await t
        .useRole(superUser)
        .navigateTo('http://localhost:8888/econobis/public/#/contact/nieuw/persoon')
        .typeText('input[name="firstName"]', 'Rob')
        .typeText(lastName, 'Rollenberg')
        .click(submitButton)
        .takeScreenshot('contact/newFormFilledIncorrect.png');
});

test('Fill out form new contact', async (t) => {
    await t
        .useRole(superUser)
        .navigateTo('http://localhost:8888/econobis/public/#/contact/nieuw/persoon')
        .click('select[name="statusId"]')
        .click(Selector('option').filter('[value="open"]'))
        .typeText('input[name="firstName"]', 'Rob')
        .typeText(lastName, 'Rollenberg')
        .click(submitButton)
        .takeScreenshot('contact/newFormFilledCorrect.png');

    await t
        .expect(title.innerText).eql('Rollenberg, Rob')
        .takeScreenshot('contact/contactDetails.png');
});