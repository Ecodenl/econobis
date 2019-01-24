import { Selector } from 'testcafe';

export default class ModelDetailsProject {
    constructor () {
        this.newValueCourse = Selector('span').withExactText('Waardeverloop participaties').parent().child('a');
        this.dayPicker = Selector('.DayPickerInput').nth(0).child('input');
        this.bookWorth = Selector('input[name="bookWorth"]');
        this.valueCourseRows = Selector('span').withExactText('Waardeverloop participaties').parent().parent().child().nth(1).child().child().child();
    }
}