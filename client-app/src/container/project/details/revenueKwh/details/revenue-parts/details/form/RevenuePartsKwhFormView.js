import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import ViewText from '../../../../../../../../components/form/ViewText';

const RevenuePartsKwhFormView = props => {
    const { confirmed, status, dateBegin, dateEnd, dateConfirmed, datePayout, payoutKwh } = props.revenuePartsKwh;
    const { kwhStart, kwhStartHigh, kwhStartLow } = props.revenuePartsKwh.valuesKwhStart;
    const { kwhEnd, kwhEndHigh, kwhEndLow, isSimulated } = props.revenuePartsKwh.valuesKwhEnd;
    const kwhTotal = kwhEnd - kwhStart;

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

            <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Opbrengst kWh</span>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Datum beginstanden'} value={dateBegin ? moment(dateBegin).format('L') : ''} />
                <ViewText label={'Datum eindstanden'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Beginstand kWh hoog'} value={kwhStartHigh && parseFloat(kwhStartHigh).toFixed(0)} />
                <ViewText
                    label={<span className={isSimulated ? 'text-danger' : ''}>Eindstand kWh hoog</span>}
                    value={kwhEndHigh && parseFloat(kwhEndHigh).toFixed(0)}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Beginstand kWh laag'} value={kwhStartLow && parseFloat(kwhStartLow).toFixed(0)} />
                <ViewText
                    label={<span className={isSimulated ? 'text-danger' : ''}>Eindstand kWh laag</span>}
                    value={kwhEndLow && parseFloat(kwhEndLow).toFixed(0)}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Beginstand kWh'} value={kwhStart && parseFloat(kwhStart).toFixed(0)} />
                <ViewText
                    label={<span className={isSimulated ? 'text-danger' : ''}>Eindstand kWh</span>}
                    value={kwhEnd && parseFloat(kwhEnd).toFixed(0)}
                />
            </div>

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
                <ViewText label={'Totaal productie kWh'} value={kwhTotal && parseFloat(kwhTotal).toFixed(0)} />
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
