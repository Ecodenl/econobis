import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');

const RevenueDistributionFormDynamicView = props => {
    const {
        id,
        contactName,
        contactType,
        contactPrimaryContactEnergySupplier,
        participationsDefinitive: participationsDefinitiveOfParticipant,
        type,
    } = props.participation;
    const { datePayed, revenue, payPercentage, kwhStart, kwhEnd, payoutKwh } = props.projectRevenue;
    const { participationsDefinitive: participationsDefinitiveOfProject } = props.project;

    let payout =
        Math.round(((revenue * (payPercentage / 100)) / participationsDefinitiveOfProject) * participationsDefinitiveOfParticipant * 100) / 100;
    let deliveredTotal = Math.round(((kwhEnd - kwhStart) / participationsDefinitiveOfProject) * participationsDefinitiveOfParticipant * 100) / 100;
    let kwhReturn = deliveredTotal * payoutKwh;

    return (
        <div className={`row border`}>
            <div className="col-sm-1">{id}</div>
            <div className="col-sm-1">{contactType ? contactType.name : ''}</div>
            <div className="col-sm-2">{contactName ? contactName : ''}</div>
            <div className="col-sm-1">{participationsDefinitiveOfParticipant ? participationsDefinitiveOfParticipant : 0}</div>
            <div className="col-sm-1">{payout ? payout : ''}</div>
            <div className="col-sm-1">{type ? type.name : ''}</div>
            <div className="col-sm-1">{datePayed ? moment(datePayed).format('L') : ''}</div>
            <div className="col-sm-2">
                {contactPrimaryContactEnergySupplier ? contactPrimaryContactEnergySupplier.name : ''}
            </div>
            <div className="col-sm-1">{deliveredTotal ? deliveredTotal : ''}</div>
            <div className="col-sm-1">
                {kwhReturn
                    ? '€' + kwhReturn.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : ''}
            </div>
        </div>
    );
};

export default RevenueDistributionFormDynamicView;
