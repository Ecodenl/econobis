import { Selector } from 'testcafe';

export default class ModelNewParticipantProductionProject {
    constructor() {
        this.contactId = Selector('select[name="contactId"]');
    }
}
