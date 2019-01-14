import { Role } from 'testcafe';
import * as constants from '../config/constants';

const superUser = Role(constants.app_url + '#/login', async t => {
    await t
        .typeText('input[name="username"]', constants.email)
        .typeText('input[name="password"]', constants.password)
        .click('button[type="submit"]');
}, { preserveUrl: true });

export default superUser;