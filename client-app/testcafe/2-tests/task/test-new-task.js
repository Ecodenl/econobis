import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import * as vars from "../../config/random-models";
const faker = require('faker');
faker.locale = "nl";
import ModelNewTask from '../../pages/task/model-new-task';
import ModelDetailsTask from '../../pages/task/model-details-task';
import ModelGeneral from "../../pages/model-general";

fixture `Create new task`;

const general = new ModelGeneral();
const newTask = new ModelNewTask();
const detailsTask = new ModelDetailsTask();

test('Create empty task', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw');

    await t.expect(general.titleH3.innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .click(general.save);

    await t.expect(general.titleH3.innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

});

test('Fill out form task only required', async (t) => {

    const randomSentence = faker.lorem.sentence();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw');

    await t.expect(Selector('h3').innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .typeText(newTask.note, randomSentence)

        .click(newTask.responsible)
        .click(general.option.filter('[value="user1"]'))

        .click(general.save);

    await t.expect(detailsTask.description.innerText).eql(randomSentence, 'Check element text', { timeout: 500 });
});

test('Fill out form task all, task will be a note', async (t) => {

    const randomSentence = faker.lorem.sentence();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw');

    await t.expect(general.titleH3.innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .click(newTask.typeId)
        .click(general.option.filter('[value="1"]'))

        .typeText(newTask.note, randomSentence)

        .typeText(newTask.datePlannedStart, '10-03-2018')

        .expect(newTask.datePlannedStart.value).eql('10-03-2018', 'inputdate is equal to "10-03-2018"')

        .click(newTask.startTimePlanned)
        .click(newTask.startTimePlanned.child().nth(2))

        .typeText(newTask.datePlannedFinish, '11-03-2018')

        .click(newTask.endTimePlanned)
        .click(newTask.endTimePlanned.child().nth(10))

        .click(newTask.toggle)

        .click(newTask.responsible)
        .click(general.option.filter('[value="user1"]'))

        .typeText(newTask.dateFinished, '11-03-2018')

        .click(newTask.finishedById)
        .click(newTask.finishedById.child().nth(1))

        .typeText(newTask.reactSelect.nth(0), vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')

        .click(Selector('span').withExactText('Overige koppelingen'))

        .typeText(newTask.reactSelect.nth(1), vars.campaignName)
        .pressKey('enter')

        .typeText(newTask.reactSelect.nth(2), 'voor ' + vars.personLastName + ', ' + vars.personFirstName)
        .pressKey('enter')

        .typeText(newTask.reactSelect.nth(3), vars.contactGroupName)
        .pressKey('enter')

        .typeText(newTask.reactSelect.nth(4), 'Dakisolatie')
        .pressKey('enter')

        .typeText(newTask.reactSelect.nth(5), vars.personStreet + ' ' + vars.personNumber)
        .pressKey('enter')

        .typeText(newTask.reactSelect.nth(6), vars.projectName)
        .pressKey('enter')

        .typeText(newTask.reactSelect.nth(7), vars.personLastName + ', ' + vars.personFirstName + ' ' + vars.projectName)
        .pressKey('enter')

        .click(general.save);

    await t.expect(detailsTask.description.innerText).eql(randomSentence, 'Check element text', { timeout: 500 });
});
