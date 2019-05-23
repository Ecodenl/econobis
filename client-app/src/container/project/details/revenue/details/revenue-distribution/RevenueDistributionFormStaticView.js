import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');

const RevenueDistributionFormStaticView = props => {
    const {
        id,
        contactName,
        contactType,
        contactPrimaryEmailAddress,
        deliveredTotal,
        kwhReturn,
        participationsAmount,
        payout,
        payoutType,
        datePayout,
        energySupplierName,
        hasInvoice,
    } = props.participation;

    return (
        <div className={`row border ${hasInvoice && 'warning-row'}`}>
            <div className="col-sm-1">
                {props.showCheckboxList && props.checkedAll && <input type="checkbox" checked />}
                {props.showCheckboxList && !props.checkedAll && contactPrimaryEmailAddress && (
                    <input type="checkbox" name={id} onChange={props.toggleParticipantCheck} />
                )}
                {props.showCheckboxList && !props.checkedAll && !contactPrimaryEmailAddress && (
                    <input type="checkbox" name={id} onChange={props.toggleParticipantCheckNoEmail} />
                )}
                {!props.showCheckboxList && <span>{id}</span>}
            </div>
            <div className="col-sm-1">{contactType ? contactType.name : ''}</div>
            <div className="col-sm-2">{contactName}</div>
            <div className="col-sm-1">{participationsAmount && participationsAmount}</div>
            <div className="col-sm-1">{payout && payout}</div>
            <div className="col-sm-1">{payoutType && payoutType}</div>
            <div className="col-sm-1">{datePayout ? moment(datePayout).format('L') : ''}</div>
            <div className="col-sm-2">{energySupplierName && energySupplierName}</div>
            <div className="col-sm-1">{deliveredTotal && deliveredTotal}</div>
            <div className="col-sm-1">
                {'€' + kwhReturn.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
        </div>
    );
};

export default RevenueDistributionFormStaticView;
