import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
const faker = require('faker');
import ModelDetailsPerson from '../../pages/contact/model-details-person';
import ModelGridContact from '../../pages/contact/model-grid-contact';
import ModelGeneral from "../../pages/model-general";

fixture `Test harmonicas for contact`;

const general = new ModelGeneral();
const gridContact = new ModelGridContact();
const detailsPerson = new ModelDetailsPerson();

test('Open all harmonica\'s person', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(gridContact.nameSearch, vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.personLastName + ', ' + vars.personFirstName + ' (Persoon)', 'Check element text', { timeout: 500 });

    await t
        .click(detailsPerson.invoiceHarmonicaList)
        .click(detailsPerson.orderHarmonicaList)
        .click(detailsPerson.emailInHarmonicaList)
        .click(detailsPerson.emailOutHarmonicaList)
        .click(detailsPerson.taskHarmonicaList)
        .click(detailsPerson.noteHarmonicaList)
        .click(detailsPerson.participationHarmonicaList)
        .click(detailsPerson.intakeHarmonicaList)
        .click(detailsPerson.opportunityHarmonicaList)
        .click(detailsPerson.housingFileHarmonicaList)
        .click(detailsPerson.contactGroupHarmonicaList)
        .click(detailsPerson.documentHarmonicaList)
        .wait(constants.wait);

    await t
        .click(detailsPerson.orderHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.emailInHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.emailOutHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.taskHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.noteHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.participationHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.intakeHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.housingFileHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.contactGroupHarmonica)
        .click(general.cancel)
        .wait(constants.wait);

    await t
        .click(detailsPerson.documentHarmonica)
        .click(detailsPerson.newDocument)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.documentHarmonica)
        .click(detailsPerson.newUpload)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.personLastName + ', ' + vars.personFirstName + ' (Persoon)', 'Check element text', { timeout: 500 });
});

test('Open all harmonica\'s organisation', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/contacten');

    await t.expect(general.titleH3.innerText).eql('Contacten', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(gridContact.nameSearch, vars.organisationName)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.organisationName + ' (Organisatie)', 'Check element text', { timeout: 500 });

    await t
        .click(detailsPerson.invoiceHarmonicaList)
        .click(detailsPerson.orderHarmonicaList)
        .click(detailsPerson.emailInHarmonicaList)
        .click(detailsPerson.emailOutHarmonicaList)
        .click(detailsPerson.taskHarmonicaList)
        .click(detailsPerson.noteHarmonicaList)
        .click(detailsPerson.participationHarmonicaList)
        .click(detailsPerson.intakeHarmonicaList)
        .click(detailsPerson.opportunityHarmonicaList)
        .click(detailsPerson.housingFileHarmonicaList)
        .click(detailsPerson.contactGroupHarmonicaList)
        .click(detailsPerson.documentHarmonicaList)
        .wait(constants.wait);


    await t
        .click(detailsPerson.orderHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.emailInHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.emailOutHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.taskHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.noteHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.participationHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.intakeHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.housingFileHarmonica)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.contactGroupHarmonica)
        .click(general.cancel)
        .wait(constants.wait);

    await t
        .click(detailsPerson.documentHarmonica)
        .click(detailsPerson.newDocument)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(detailsPerson.documentHarmonica)
        .click(detailsPerson.newUpload)
        .wait(constants.wait);
    await t
        .click(general.back)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.organisationName + ' (Organisatie)', 'Check element text', { timeout: 500 });
});