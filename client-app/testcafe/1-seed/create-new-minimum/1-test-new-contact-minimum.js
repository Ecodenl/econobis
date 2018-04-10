import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from '../../config/random-models';
import ModelNewPerson from '../../pages/contact/model-new-person';
import ModelNewOrganisation from '../../pages/contact/model-new-organisation';
import ModelGeneral from '../../pages/model-general';

fixture `Create new person`;

const person = new ModelNewPerson();
const organisation = new ModelNewOrganisation();
const general = new ModelGeneral();

test('Create new person', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/persoon');

    await t.expect(general.titleH4.innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });

    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/persoon')
        .typeText(person.firstName, vars.personFirstName)
        .typeText(person.lastName, vars.personLastName)
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( vars.personLastName + ', ' + vars.personFirstName +' (Persoon)', 'Check element text', { timeout: 500 });
});

fixture `Create new organisation`;

test('Check for title "Nieuw contact"', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contact/nieuw/organisatie');

    await t.expect(general.titleH4.innerText).eql('Nieuw contact', 'Check element text', { timeout: 500 });

    await t
        .useRole(superUser)
        .navigateTo( constants.app_url + '#/contact/nieuw/organisatie')
        .typeText(organisation.name, vars.organisationName)
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql( vars.organisationName + ' (Organisatie)', 'Check element text', { timeout: 500 });
});