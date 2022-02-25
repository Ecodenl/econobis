import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import ViewText from '../../../../../../../../components/form/ViewText';

const RevenuePartsKwhFormView = props => {
    const { confirmed, status, dateBegin, dateEnd, dateConfirmed, payoutKwh } = props.revenuePartsKwh;
    const { kwhStart, kwhStartHigh, kwhStartLow } = props.revenuePartsKwh.valuesKwhStart;
    const { kwhEnd, kwhEndHigh, kwhEndLow } = props.revenuePartsKwh.valuesKwhEnd;
    const kwhTotal = kwhEnd - kwhStart;

    const statusText = status => {
        switch (status) {
            case 'new':
                return 'Nieuw';
            case 'concept':
                return 'Concept';
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

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Datum definitief'} value={dateConfirmed ? moment(dateConfirmed).format('L') : ''} />
            </div>

            <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Opbrengst kWh</span>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Datum beginstanden'} value={dateBegin ? moment(dateBegin).format('L') : ''} />
                <ViewText label={'Datum eindstanden'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Beginstand kWh hoog'} value={kwhStartHigh && kwhStartHigh} />
                <ViewText label={'Eindstand kWh hoog'} value={kwhEndHigh && kwhEndHigh} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Beginstand kWh laag'} value={kwhStartLow && kwhStartLow} />
                <ViewText label={'Eindstand kWh laag'} value={kwhEndLow && kwhEndLow} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Beginstand kWh'} value={kwhStart && kwhStart} />
                <ViewText label={'Eindstand kWh'} value={kwhEnd && kwhEnd} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Opbrengst kWh €'}
                    value={
                        payoutKwh &&
                        payoutKwh.toLocaleString('nl', {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 5,
                        })
                    }
                />
                <ViewText label={'Totaal productie kWh'} value={kwhTotal && kwhTotal} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
    };
};

export default connect(mapStateToProps)(RevenuePartsKwhFormView);
