import React from 'react';
import moment from 'moment/moment';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';
import validator from 'validator';
moment.locale('nl');

const RevenuesKwhDistributionFormView = props => {
    const {
        id,
        contactName,
        contactType,
        contactPrimaryEmailAddress,
        address,
        postalCode,
        city,
        energySupplierNames,
        // deliveredTotalConcept,
        // deliveredTotalConfirmed,
        // deliveredTotalProcessed,
        deliveredTotalString,
        participationsQuantity,
        kwhReturn,
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

    const missingContactDataMessage =
        missingEmail || missingAdress || missingPostCode || missingCity
            ? 'Er ontbreken contactgegevens (email, adres, postcode of plaats).'
            : '';
    const missingDataClass =
        missingEmail || missingAdress || missingPostCode || missingCity ? 'missing-data-row' : null;

    let statusText = '';
    switch (status) {
        case 'new':
            statusText = 'Nieuw';
            break;
        case 'concept':
            statusText = 'Concept';
            break;
        case 'confirmed':
            statusText = 'Definitief';
            break;
        case 'in-progress':
            statusText = 'Bezig...';
            break;
        case 'in-progress-update':
            statusText = 'Bezig met bijwerken...';
            break;
        case 'in-progress-report':
            statusText = 'Bezig met rapportage...';
            break;
        case 'in-progress-process':
            statusText = 'Bezig met verwerken...';
            break;
        case 'processed':
            statusText = 'Verwerkt';
            break;
    }

    return (
        <div
            title={missingContactDataMessage}
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
                        checked={props.distributionKwhIds.includes(id)}
                    />
                </div>
            ) : null}

            <div className="col-sm-1">{contactType ? contactType.name : ''}</div>
            <div className="col-sm-2">{contactName}</div>
            <div className="col-sm-1">{participationsQuantity}</div>
            <div className="col-sm-2">{energySupplierNames && energySupplierNames.join(', ')}</div>
            <div className="col-sm-1">{deliveredTotalString && deliveredTotalString}</div>
            <div className="col-sm-2">
                {kwhReturn
                    ? '€' + kwhReturn.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : ''}
            </div>
            <div className="col-sm-2">{statusText}</div>
        </div>
    );
};

export default RevenuesKwhDistributionFormView;
