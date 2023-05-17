import React from 'react';
import moment from 'moment/moment';
import validator from 'validator';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
moment.locale('nl');

const RevenuePartsKwhDistributionFormView = props => {
    const {
        id,
        contactName,
        contactType,
        contactPrimaryEmailAddress,
        address,
        postalCode,
        city,
        energySupplierName,
        deliveredTotalString,
        participationsQuantity,
        kwhReturn,
        status,
        isEnergySupplierSwitch,
        isEndParticipation,
        isEndYearPeriod,
        isEndTotalPeriod,
        remarks,
        dateEnergySupplierReport,
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
    const showInfoButton = isEnergySupplierSwitch || isEndParticipation || isEndTotalPeriod ? true : false;

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
                {props.showCheckboxList && (props.createType !== 'processRevenues' || status == 'confirmed') ? (
                    <>
                        <input
                            type="checkbox"
                            name={id}
                            onChange={props.toggleDistributionCheck}
                            checked={props.distributionPartsKwhIds.includes(id)}
                        />
                        {/*{contactType ? ' ' + contactType.name.substring(0, 1) : ''}*/}
                    </>
                ) : contactType ? (
                    contactType.name
                ) : (
                    ''
                )}
            </div>
            <div className="col-sm-2">{contactName}</div>
            <div className="col-sm-1">{participationsQuantity}</div>
            <div className="col-sm-2">{energySupplierName && energySupplierName}</div>
            <div className="col-sm-1">{deliveredTotalString && deliveredTotalString}</div>
            <div className="col-sm-2">
                {kwhReturn
                    ? '€' + kwhReturn.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : ''}
            </div>
            <div className="col-sm-2">{statusText}</div>
            <div className="col-sm-1">
                {showInfoButton ? (
                    <>
                        <FaInfoCircle
                            color={'blue'}
                            size={'15px'}
                            data-tip={remarks ? remarks : 'Geen info bekend'}
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
                {dateEnergySupplierReport ? (
                    <>
                        {' '}
                        <FaCheckCircle
                            color={'green'}
                            size={'15px'}
                            data-tip={
                                'Rapport Energie leverancier gemaakt op: ' +
                                moment(dateEnergySupplierReport).format('L')
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

export default RevenuePartsKwhDistributionFormView;
