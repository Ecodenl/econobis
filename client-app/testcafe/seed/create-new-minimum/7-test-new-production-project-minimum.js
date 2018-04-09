import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewProductionProject from "../../pages/production-project/model-new-production-project";
import ModelNewParticipantProductionProject from "../../pages/production-project/model-new-participant-production-project";
import ModelGeneralProductionProject from "../../pages/production-project/model-general-production-project";
import ModelDetailsProductionProject from "../../pages/production-project/model-details-production-project";

const faker = require('faker');

fixture `Create new production project -> participant -> value course`;

const general = new ModelGeneral();
const newProductionProject = new ModelNewProductionProject();
const newParticipantProductionProject = new ModelNewParticipantProductionProject();
const generalProductionProject = new ModelGeneralProductionProject();
const detailsProductionProject = new ModelDetailsProductionProject();

const randomInt = faker.random.number({min:0, max:9999}).toString();
const randomInt2 = faker.random.number({min:0, max:9999}).toString();

test('Fill out form new production project -> participant -> value course', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/productie-project/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuw productieproject', 'Check element text', { timeout: 500 });

    await t
        .typeText(newProductionProject.name, vars.productionProjectName)
        .typeText(newProductionProject.code, vars.productionProjectCode)

        .click(newProductionProject.ownedById)
        .click(general.option.filter('[value="1"]'))

        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql('Productieproject ' + vars.productionProjectName, 'Check element text', { timeout: 500 });

    await t
        .click(generalProductionProject.rapportageButton.prevSibling().nth(1))
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuwe participant', 'Check element text', { timeout: 500 });

    await t
        .click(newParticipantProductionProject.contactId)
        .click(general.option.withText(vars.personLastName + ', ' + vars.personFirstName))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(general.titleH4.innerText).eql(vars.personLastName + ', ' + vars.personFirstName + '/' + vars.productionProjectName, 'Check element text', { timeout: 500 });

    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(general.back)
        .wait(constants.wait);

    await t
        .click(generalProductionProject.details)
        .wait(constants.wait);

    await t
        .click(detailsProductionProject.newValueCourse)
        .wait(constants.wait);

    await t
        .typeText(detailsProductionProject.dayPicker, '11-03-2018')
        .typeText(detailsProductionProject.bookWorth, randomInt)
        .click(general.save)
        .wait(constants.wait);

    await t
        .click(detailsProductionProject.newValueCourse)
        .wait(constants.wait);

    await t
        .typeText(detailsProductionProject.dayPicker, '11-03-2018')
        .typeText(detailsProductionProject.bookWorth, randomInt2)
        .click(general.save)
        .wait(constants.wait);

    //Header + 2 rows
    await t.expect(detailsProductionProject.valueCourseRows.count).eql(3);

});
