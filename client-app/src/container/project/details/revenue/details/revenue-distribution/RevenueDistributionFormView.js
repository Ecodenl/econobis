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
        payout,
        payoutType,
        datePayout,
        energySupplierName,
        status,
    } = props.participation;

    const missingEmail =
        !contactPrimaryEmailAddress ||
        !contactPrimaryEmailAddress.email ||
        validator.isEmpty(contactPrimaryEmailAddress.email)
            ? true
            : false;
    const missingAdress = !address || validator.isEmpty(address) ? true : false;
    const missingPostCode = !postalCode || validator.isEmpty(postalCode) ? true : false;
    const missingCity = !city || validator.isEmpty(city) ? true : false;
    const missingIban =
        !(props.projectRevenueCategoryCodeRef === 'revenueKwh') &&
        payoutType === 'Rekening' &&
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

    return (
        <div
            title={missingContactDataMessage + ' ' + missingIbanDataMessage}
            className={`row border ${status === 'processed' ? 'warning-row' : ''} ${
                missingDataClass ? missingDataClass : ''
            }`}
        >
            {props.showCheckboxList ? (
                <div className="col-sm-1">
                    <input
                        type="checkbox"
                        name={id}
                        onChange={props.toggleDistributionCheck}
                        checked={props.distributionIds.includes(id)}
                    />
                </div>
            ) : null}

            <div className="col-sm-1">{contactType ? contactType.name : ''}</div>
            <div className="col-sm-2">{contactName}</div>
            {props.projectTypeCodeRef === 'loan' ? (
                <div className="col-sm-2">{MoneyPresenter(participationsAmount)}</div>
            ) : (
                <div className="col-sm-1">{participationsAmount}</div>
            )}
            <div className="col-sm-1">{payout ? MoneyPresenter(payout) : 0}</div>
            <div className="col-sm-1">{payoutType && payoutType}</div>
            <div className="col-sm-1">{datePayout ? moment(datePayout).format('L') : ''}</div>
            {props.projectRevenueCategoryCodeRef === 'revenueKwh' ? (
                <React.Fragment>
                    <div className="col-sm-2">{energySupplierName && energySupplierName}</div>
                    <div className="col-sm-1">{deliveredTotal && deliveredTotal}</div>
                    <div className="col-sm-1">
                        {kwhReturn
                            ? '€' +
                              kwhReturn.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            : ''}
                    </div>
                </React.Fragment>
            ) : null}
        </div>
    );
};

export default RevenueDistributionFormView;
