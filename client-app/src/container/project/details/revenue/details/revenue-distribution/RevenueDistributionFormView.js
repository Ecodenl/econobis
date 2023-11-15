import React from 'react';
import moment from 'moment/moment';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';
import validator from 'validator';
moment.locale('nl');

const RevenueDistributionFormView = props => {
    const {
        id,
        contactName,
        contactType,
        contactPrimaryEmailAddress,
        address,
        postalCode,
        city,
        contactIban,
        payoutIban,
        deliveredTotal,
        kwhReturn,
        participationsAmount,
        participationsLoanAmount,
        payout,
        payoutType,
        payoutTypeCodeRef,
        datePayout,
        energySupplierName,
        status,
    } = props.participation;

    const missingEmail =
        props.createType !== 'createInvoices' &&
        (!contactPrimaryEmailAddress ||
            !contactPrimaryEmailAddress.email ||
            validator.isEmpty(contactPrimaryEmailAddress.email))
            ? true
            : false;
    const missingAdress = !address || validator.isEmpty(address) ? true : false;
    const missingPostCode = !postalCode || validator.isEmpty(postalCode) ? true : false;
    const missingCity = !city || validator.isEmpty(city) ? true : false;
    const missingIban =
        !(props.projectRevenueCategoryCodeRef === 'revenueKwh') &&
        payoutTypeCodeRef === 'account' &&
        (!contactIban || validator.isEmpty(contactIban)) &&
        (!payoutIban || validator.isEmpty(payoutIban))
            ? true
            : false;

    const missingContactDataMessage =
        missingEmail || missingAdress || missingPostCode || missingCity
            ? 'Er ontbreken contactgegevens (email, adres, postcode of plaats).'
            : '';
    const missingIbanDataMessage = missingIban ? 'Iban code ontbreekt.' : '';
    const missingDataClass =
        missingEmail || missingAdress || missingPostCode || missingCity || missingIban ? 'missing-data-row' : null;

    let statusText = '';
    switch (status) {
        case 'concept':
            statusText = 'Concept';
            break;
        case 'confirmed':
            statusText = 'Definitief';
            break;
        case 'in-progress':
            statusText = 'Bezig...';
            break;
        case 'processed':
            statusText = 'Verwerkt';
            break;
    }

    return (
        <div
            title={missingContactDataMessage + ' ' + missingIbanDataMessage}
            className={`row border ${status === 'processed' ? 'warning-row' : ''} ${
                missingDataClass ? missingDataClass : ''
            }`}
        >
            {props.showCheckboxList ? (
                props.createType !== 'createInvoices' ? (
                    <div className="col-sm-1">
                        <input
                            type="checkbox"
                            name={id}
                            onChange={props.toggleDistributionCheck}
                            checked={props.distributionIds.includes(id)}
                        />
                    </div>
                ) : props.distributionIdsTotalToProcess.includes(id) ? (
                    <div className="col-sm-1">
                        <input
                            type="checkbox"
                            name={id}
                            onChange={props.toggleDistributionCheck}
                            checked={props.distributionIds.includes(id)}
                        />
                    </div>
                ) : (
                    <div className="col-sm-1"></div>
                )
            ) : null}

            <div className="col-sm-1">{contactType ? contactType.name : ''}</div>
            <div className="col-sm-2">{contactName}</div>
            {props.projectTypeCodeRef === 'loan' ? (
                <div className="col-sm-2">{MoneyPresenter(participationsLoanAmount)}</div>
            ) : (
                <div className="col-sm-1">{participationsAmount}</div>
            )}
            {props.projectRevenueCategoryCodeRef === 'revenueKwh' ? (
                <React.Fragment>
                    <div className="col-sm-2">{energySupplierName && energySupplierName}</div>
                    <div className="col-sm-1">{deliveredTotal && deliveredTotal}</div>
                    <div className="col-sm-2">
                        {kwhReturn
                            ? '€ ' +
                              kwhReturn.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            : ''}
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="col-sm-2">{payout ? MoneyPresenter(payout) : 0}</div>
                    <div className="col-sm-1">{payoutType && payoutType}</div>
                    <div className="col-sm-2">{datePayout ? moment(datePayout).format('L') : ''}</div>
                </React.Fragment>
            )}
            <div className="col-sm-2">{statusText}</div>
        </div>
    );
};

export default RevenueDistributionFormView;
