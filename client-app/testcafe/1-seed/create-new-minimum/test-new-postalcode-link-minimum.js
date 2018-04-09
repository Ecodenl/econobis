import { Selector, Role } from 'testcafe';
import superUser from '../../auth/UserRoles';
import * as constants from '../../config/constants';
import ModelGeneral from "../../pages/model-general";
import ModelPostalcodeLink from "../../pages/postalcode-link/model-postalcode-link";
const faker = require('faker');

fixture `Create new postalcode link minimum`;

const general = new ModelGeneral();
const postalcodeLink = new ModelPostalcodeLink();

test('Fill out form postalcode link minimum', async (t) => {

    const randomInt = faker.random.number({min:1000, max:9998}).toString();
    const randomInt2 = faker.random.number({min:1000, max:9998}).toString();

    await t
        .useRole(superUser)
        .navigateTo(constants.app_url + '#/postcoderoos')
        .wait(constants.wait);

    await t.expect(general.titleH3.innerText).eql('Postcoderoos', 'Check element text', { timeout: 500 });

    await t
        .click(postalcodeLink.new)
        .wait(constants.wait);

    await t.expect(postalcodeLink.mainLabel.innerText).eql('Kern postcode', 'Check element text', { timeout: 500 });
    await t.expect(postalcodeLink.linkLabel.innerText).eql('Link postcode', 'Check element text', { timeout: 500 });

    await t
        .typeText(postalcodeLink.mainInput, randomInt)
        .typeText(postalcodeLink.linkInput, randomInt2)
        .click(general.save)
        .wait(constants.wait);

    await t.expect(postalcodeLink.mainTD.innerText).eql(randomInt, 'Check element text', { timeout: 500 });
    await t.expect(postalcodeLink.linkTD.innerText).eql(randomInt2, 'Check element text', { timeout: 500 });
});