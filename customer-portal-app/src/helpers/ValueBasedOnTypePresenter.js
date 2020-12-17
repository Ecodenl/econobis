import moneyPresenter from './MoneyPresenter';
import moment from 'moment';

export default field => {
    switch (field.type) {
        case 'date':
            return field.value ? moment(field.value).format('L') : '';
        case 'decimal':
            return field.value.toLocaleString('nl', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        case 'money':
            return moneyPresenter(field.value);
        case 'string':
        case 'integer':
        default:
            return field.value;
    }
};
