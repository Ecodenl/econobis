import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import ViewText from '../../../../../../components/form/ViewText';

const RevenuesKwhFormView = props => {
    const { category, confirmed, status, dateBegin, dateEnd, dateConfirmed, datePayout, payoutKwh } = props.revenuesKwh;

    const statusText = status => {
        switch (status) {
            case 'new':
                return 'Nieuw';
            case 'concept':
                return 'Concept';
            case 'concept-to-update':
                return 'Concept (bijwerken noodzakelijk)';
            case 'confirmed':
                return 'Definitief';
            case 'in-progress':
                return 'Bezig...';
            case 'in-progress-update':
                return 'Bezig met bijwerken...';
            case 'in-progress-report':
                return 'Bezig met rapportage...';
            case 'in-progress-process':
                return 'Bezig met verwerken...';
            case 'processed':
                return 'Verwerkt';
        }
        return '';
    };

    return (
        <div>
            <div className={'panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Algemeen</span>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Status'} value={status ? statusText(status) : ''} />
                <ViewText label={'Definitief'} value={confirmed ? 'Ja' : 'Nee'} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Begin periode'} value={dateBegin ? moment(dateBegin).format('L') : ''} />
                <ViewText label={'Eind periode'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            </div>

            {confirmed == 1 ? (
                <div className="row" onClick={props.switchToEdit}>
                    <ViewText
                        label={'Datum definitief'}
                        value={dateConfirmed ? moment(dateConfirmed).format('L') : ''}
                    />
                    <ViewText label={'Uitkeringsdatum'} value={datePayout ? moment(datePayout).format('L') : ''} />
                </div>
            ) : null}

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Teruggave EB per kWh €'}
                    value={
                        payoutKwh &&
                        payoutKwh.toLocaleString('nl', {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 5,
                        })
                    }
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenuesKwh: state.revenuesKwh,
    };
};

export default connect(mapStateToProps)(RevenuesKwhFormView);
