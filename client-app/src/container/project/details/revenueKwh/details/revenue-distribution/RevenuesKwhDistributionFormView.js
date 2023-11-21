import React from 'react';
import moment from 'moment/moment';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';
import validator from 'validator';
import { FaCheckCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
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
        dateEndLastConfirmedPartsKwh,
        dateParticipantReport,
        beginDateParticipantReport,
        endDateParticipantReport,
    } = props.distributionKwh;

    const missingEmail =
        !contactPrimaryEmailAddress ||
        !contactPrimaryEmailAddress.email ||
        validator.isEmpty(contactPrimaryEmailAddress.email)
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
        case 'concept-to-update':
            statusText = 'Concept (bijwerken noodzakelijk)';
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
        case 'in-progress-report-concept':
            statusText = 'Bezig met rapportage...';
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
            <div className="col-sm-1">
                {props.showCheckboxList && (
                    <input
                        type="checkbox"
                        name={id}
                        onChange={props.toggleDistributionCheck}
                        checked={props.distributionKwhIds.includes(id)}
                    />
                )}
                {contactType ? ' ' + contactType.name : ''}
            </div>
            <div className="col-sm-2">{contactName}</div>
            <div className="col-sm-1">{participationsQuantity}</div>
            <div className="col-sm-2">{energySupplierNames && energySupplierNames.join(', ')}</div>
            <div className="col-sm-1">{deliveredTotalString && deliveredTotalString}</div>
            <div className="col-sm-2">
                {kwhReturn
                    ? '€ ' + kwhReturn.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : ''}
            </div>
            <div className="col-sm-2">
                {statusText}
                {status === 'concept' && dateEndLastConfirmedPartsKwh ? (
                    <>
                        <br />
                        (Def. t/m: {moment(dateEndLastConfirmedPartsKwh).format('L')})
                    </>
                ) : (
                    ''
                )}
            </div>
            <div className="col-sm-1">
                {dateParticipantReport ? (
                    <>
                        {' '}
                        <FaCheckCircle
                            color={'green'}
                            size={'15px'}
                            data-tip={
                                'Rapport Deelnemer gemaakt op ' +
                                moment(dateParticipantReport).format('L') +
                                '. Verwerkingsperiode t/m ' +
                                moment(beginDateParticipantReport).format('L') +
                                ' t/m ' +
                                moment(endDateParticipantReport).format('L')
                            }
                            data-for={`tooltip-remark`}
                        />
                        <ReactTooltip
                            id={`tooltip-remark`}
                            effect="float"
                            place="right"
                            multiline={true}
                            aria-haspopup="true"
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default RevenuesKwhDistributionFormView;
