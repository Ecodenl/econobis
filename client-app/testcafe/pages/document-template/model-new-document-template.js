import { Selector } from 'testcafe';

export default class ModelNewDocumentTemplate {
    constructor () {
        this.name = Selector('input[name="name"]');
        this.groupId = Selector('select[name="documentGroupId"]');
        this.typeId = Selector('select[name="documentTemplateTypeId"]');
    }
}