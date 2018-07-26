import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
import ModelGeneral from "../../pages/model-general";
import ModelNewTask from "../../pages/task/model-new-task";
import ModelDetailsTask from "../../pages/task/model-details-task";

const faker = require('faker');

fixture `Create new task minimum`;

const general = new ModelGeneral();
const newTask = new ModelNewTask();
const detailsTask = new ModelDetailsTask();

test('Fill out form task minimum', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw')
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .typeText(newTask.note, vars.taskNote)
        .click(newTask.responsible)
        .click(general.option.nth(0))
        .click(general.save)
        .wait(constants.wait);

    await t.expect(detailsTask.description.innerText).eql(vars.taskNote, 'Check element text', { timeout: 500 });
});