import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
const faker = require('faker');
import ModelDetailsTask from '../../pages/task/model-details-task';
import ModelGridTask from '../../pages/task/model-grid-task';
import ModelGeneral from "../../pages/model-general";

fixture `Create new properties for task`;

const general = new ModelGeneral();
const detailsTask = new ModelDetailsTask();
const gridTask = new ModelGridTask();


test('Fill out form task->property', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taken');

    await t.expect(general.titleH3.innerText).eql('Taken', 'Check element text', { timeout: 500 });

    await t
        .maximizeWindow()
        .typeText(gridTask.noteSearch, vars.taskNote)
        .pressKey('enter')
        .wait(constants.wait);

    await t
        .doubleClick(general.firstRow)
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Taak', 'Check element text', { timeout: 500 });

    await t
        .click(detailsTask.newProperty)
        .click(detailsTask.propertyId)
        .click(general.option.withExactText('Lid'))
        .typeText(detailsTask.propertyValue, '200')
        .click(general.save)
        .wait(constants.wait);

    await t
        .click(detailsTask.newProperty)
        .click(detailsTask.propertyId)
        .click(general.option.withExactText('Akkoord'))
        .typeText(detailsTask.propertyValue, 'Nee')
        .click(general.save)
        .wait(constants.wait);

    //Header + 2 rows
    await t.expect(detailsTask.propertyRows.count).eql(3);
});