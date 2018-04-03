import React from 'react';
import moment from "moment/moment";
moment.locale('nl');

const RevenueDistributionFormStaticView = props => {
    const { id, contact, deliveredTotal, postalCode, city, status, participationsAmount, payout, payoutType, datePayout, energySupplierName } = props.participation;

    return (
        <div className={`row border`}>
            <div className="col-sm-1">
                { props.showCheckboxList && props.checkedAll && <input type="checkbox" checked/> }
                { props.showCheckboxList && !props.checkedAll && contact.primaryEmailAddress && <input type="checkbox" name={id} onChange={props.toggleParticipantCheck}/> }
                { props.showCheckboxList && !props.checkedAll && !contact.primaryEmailAddress && <input type="checkbox" name={id} onChange={props.toggleParticipantCheckNoEmail}/> }
                { !props.showCheckboxList && <span>{id}</span> }
            </div>
            <div className="col-sm-1">
                {contact.type ? contact.type.name : ''}
            </div>
            <div className="col-sm-1">
                {contact && contact.fullName}
            </div>
            <div className="col-sm-1">
                {postalCode && postalCode}
            </div>
            <div className="col-sm-1">
                {city && city}
            </div>
            <div className="col-sm-1">
                {status && status}
            </div>
            <div className="col-sm-1">
                {participationsAmount && participationsAmount}
            </div>
            <div className="col-sm-1">
                {payout && payout}
            </div>
            <div className="col-sm-1">
                {payoutType && payoutType}
            </div>
            <div className="col-sm-1">
                {moment(datePayout).format('L')}
            </div>
            <div className="col-sm-1">
                {energySupplierName && energySupplierName}
            </div>
            <div className="col-sm-1">
                {deliveredTotal && deliveredTotal}
            </div>
        </div>
    );
};

export default RevenueDistributionFormStaticView;
