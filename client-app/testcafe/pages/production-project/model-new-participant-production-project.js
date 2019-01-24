import { Selector } from 'testcafe';

export default class ModelNewParticipantProject {
    constructor () {
        this.contactId = Selector('select[name="contactId"]');
    }
}