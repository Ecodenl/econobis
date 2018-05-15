import { Selector } from 'testcafe';

export default class ModelDetailsOpportunity {
    constructor () {
        this.addQuotationRequests = Selector('span').withExactText('Offerteverzoek').parent().child('a');
        this.selectOrganisation = Selector('select[name="organisationId"]');
        this.selectStatus = Selector('select[name="statusId"]');
    }
}