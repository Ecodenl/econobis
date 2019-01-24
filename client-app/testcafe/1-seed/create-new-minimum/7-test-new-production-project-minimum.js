import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewProject from "../../pages/project/model-new-project";
import ModelNewParticipantProject from "../../pages/project/model-new-participant-project";
import ModelGeneralProject from "../../pages/project/model-general-project";
import ModelDetailsProject from "../../pages/project/model-details-project";

const faker = require('faker');
faker.locale = "nl";

fixture `Create new production project -> participant -> value course`;

const general = new ModelGeneral();
const newProject = new ModelNewProject();
const newParticipantProject = new ModelNewParticipantProject();
const generalProject = new ModelGeneralProject();
const detailsProject = new ModelDetailsProject();

const randomInt = faker.random.number({min:0, max:9999}).toString();
const randomInt2 = faker.random.number({min:0, max:9999}).toString();

test('Fill out form new production project -> participant -> value course', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/project/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuw productieproject', 'Check element text', { timeout: 500 });

    await t
        .typeText(newProject.name, vars.projectName)
        .typeText(newProject.code, vars.projectCode)

        .click(newProject.ownedById)
        .click(general.option.filter('[value="1"]'))

        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Productieproject ' + vars.projectName, 'Check element text', { timeout: 500 });

    await t
        .click(generalProject.rapportageButton.prevSibling().prevSibling().nth(1))
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuwe participant', 'Check element text', { timeout: 500 });

    await t
        .click(newParticipantProject.contactId)
        .click(general.option.withText(vars.personLastName + ', ' + vars.personFirstName))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.personLastName + ', ' + vars.personFirstName + '/' + vars.projectName, 'Check element text', { timeout: 500 });

    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(generalProject.details)
        .wait(constants.wait);

    await t
        .click(detailsProject.newValueCourse)
        .wait(constants.wait);

    await t
        .typeText(detailsProject.dayPicker, '11-03-2018')
        .typeText(detailsProject.bookWorth, randomInt)
        .click(general.save)
        .wait(constants.wait);

    await t
        .click(detailsProject.newValueCourse)
        .wait(constants.wait);

    await t
        .typeText(detailsProject.dayPicker, '11-03-2018')
        .typeText(detailsProject.bookWorth, randomInt2)
        .click(general.save)
        .wait(constants.wait);

    //Header + 2 rows
    await t.expect(detailsProject.valueCourseRows.count).eql(3);

});
