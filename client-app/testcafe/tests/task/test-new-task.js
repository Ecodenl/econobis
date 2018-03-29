import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
const faker = require('faker');
import ModelNewTask from '../../pages/task/model-new-task';

const Task = new ModelNewTask();

fixture `Create new task`;

test('Create empty task', async (t) => {

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw');

    await t.expect(Selector('h3').innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .click(Selector('button').withExactText('Opslaan'));

    await t.expect(Selector('h3').innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

});

test('Fill out form task only required', async (t) => {

    const randomSentence = faker.lorem.sentence();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw');

    await t.expect(Selector('h3').innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .typeText(Task.note, randomSentence)

        .click(Task.responsible)
        .click(Selector('option').filter('[value="user1"]'))

        .click(Selector('button').withExactText('Opslaan'));

    await t.expect(Selector('#description').innerText).eql(randomSentence, 'Check element text', { timeout: 500 });
});

test('Fill out form task all, task will be a note', async (t) => {

    const randomSentence = faker.lorem.sentence();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/taak/nieuw');

    await t.expect(Selector('h3').innerText).eql('Nieuwe taak', 'Check element text', { timeout: 500 });

    await t
        .click('select[name="typeId"]')
        .click(Selector('option').filter('[value="1"]'))

        .typeText(Task.note, randomSentence)

        .typeText(Task.datePlannedStart, '10-03-2018')

        .click('select[name="startTimePlanned"]')
        .click(Selector('select[name="startTimePlanned"]').child().nth(2))

        .typeText('input[name="datePlannedFinish"]', '11-03-2018')

        .click('select[name="endTimePlanned"]')
        .click(Selector('select[name="endTimePlanned"]').child().nth(10))

        .click(Selector('.react-toggle'))

        .click(task.responsible)
        .click(Selector('option').filter('[value="user1"]'))

        .click('select[name="finishedById"]')
        .click(Selector('select[name="finishedById"]').child().nth(1))

        .click(Selector('button').withExactText('Opslaan'));

    await t.expect(Selector('#description').innerText).eql(randomSentence, 'Check element text', { timeout: 500 });
});
