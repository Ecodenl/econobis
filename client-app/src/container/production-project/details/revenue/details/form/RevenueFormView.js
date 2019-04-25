import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import ViewText from '../../../../../../components/form/ViewText';

const RevenueFormView = props => {
    const {
        type,
        confirmed,
        dateBegin,
        dateEnd,
        dateEntry,
        dateConfirmed,
        kwhStart,
        kwhEnd,
        kwhStartHigh,
        kwhEndHigh,
        kwhStartLow,
        kwhEndLow,
        revenue,
        datePayed,
        payPercentage,
        category,
        payoutKwh,
    } = props.revenue;

    return (
        <div>
            <div className={'panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Algemeen</span>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Soort'} value={category ? category.name : ''} />
                <ViewText label={'Definitief'} value={confirmed ? 'Ja' : 'Nee'} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Begin periode'} value={dateBegin ? moment(dateBegin).format('L') : ''} />
                <ViewText label={'Eind periode'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Datum invoer'} value={dateEntry ? moment(dateEntry).format('L') : ''} />
                <ViewText label={'Datum definitief'} value={dateConfirmed ? moment(dateConfirmed).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Type opbrengst'} value={type ? type.name : ''} />
                <ViewText label={'Datum uitgekeerd'} value={datePayed ? moment(datePayed).format('L') : ''} />
            </div>

            <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Opbrengst kWh</span>
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
                        '€ ' + payoutKwh.toLocaleString('nl', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
                    }
                />
            </div>

            <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Opbrengst euro</span>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Euro opbrengst'} value={revenue && '€ ' + revenue} />
                <ViewText label={'Uitkering %'} value={payPercentage && payPercentage + '%'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenue: state.productionProjectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueFormView);
