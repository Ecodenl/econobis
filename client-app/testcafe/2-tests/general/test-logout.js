import { Selector, ClientFunction } from 'testcafe';

import * as constants from '../../config/constants';
import superUser from "../../auth/UserRoles";

fixture `Log in`
    .page `${constants.app_url}#/login`;

test('Logout test', async t => {
    await t
        .useRole(superUser);

    await t.click(Selector('.navbar-nav'))
        .click(Selector('li').nth(1));

    const location = await t.eval(() => window.location);

    await t.expect(location.pathname + '#/login').eql(location.pathname + location.hash);
});