import React from 'react';
import moment from 'moment';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import ViewText from '../../../components/form/ViewText';
import ViewText_3_9 from '../../../components/form/ViewText_3_9';

function FreeFieldsDefaultValueView({ fieldFormatType, defaultValue }) {
    switch (fieldFormatType) {
        case 'boolean':
            return <ViewText label={'Standaard waarde'} value={Boolean(defaultValue) ? 'Ja' : 'Nee'} />;
            break;
        case 'text_short':
            return <ViewText label={'Standaard waarde'} value={defaultValue ? defaultValue : ''} />;
            break;
        case 'text_long':
            return <ViewText_3_9 label={'Standaard waarde'} value={defaultValue ? defaultValue : ''} />;
            break;
        case 'int':
            return <ViewText label={'Standaard waarde'} value={defaultValue ? defaultValue : ''} />;
            break;
        case 'double_2_dec':
            return (
                <ViewText label={'Standaard waarde'} value={defaultValue ? parseFloat(defaultValue).toFixed(2) : ''} />
            );
            break;
        case 'amount_euro':
            return <ViewText label={'Standaard waarde'} value={defaultValue ? MoneyPresenter(defaultValue) : ''} />;
            break;
        case 'date':
            return <ViewText label={'Standaard waarde'} value={defaultValue ? moment(defaultValue).format('L') : ''} />;
            break;
        case 'datetime':
            const valueTime = moment(defaultValue).format('HH:mm');
            const dateTimeFormated = defaultValue
                ? valueTime === '00:00'
                    ? moment(defaultValue).format('L') + ' (onbekend)'
                    : moment(defaultValue).format('L HH:mm')
                : '';

            return <ViewText label={'Standaard waarde'} value={dateTimeFormated} />;
    }
}

export default FreeFieldsDefaultValueView;
