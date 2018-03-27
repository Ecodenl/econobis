import { Role } from 'testcafe';

const superUser = Role('http://localhost:8888/econobis/public/#/login', async t => {
    await t
        .typeText('#email', 'info@xaris.nl')
        .typeText('#password', 'secret')
        .click('#submit-button');
}, { preserveUrl: true });

export default superUser;