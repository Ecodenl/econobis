import React from 'react';
import { useSelector } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';
import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';
import { lightbulbO } from 'react-icons-kit/fa/lightbulbO';

const ContactDetailsFormAddressView = props => {
    const permissions = useSelector(state => state.meDetails.permissions);
    const addressTypes = useSelector(state => state.systemData.addressTypes);

    const {
        typeId,
        street,
        number,
        addition,
        postalCode,
        city,
        areaName,
        primary,
        country,
        currentAddressEnergySupplierElectricity,
        currentAddressEnergySupplierGas,
    } = props.address;

    let currentAddressEnergySupplierNames = [];
    let currentAddressEnergySupplierNumbers = [];

    if (currentAddressEnergySupplierElectricity?.energySupplyTypeId === 3) {
        currentAddressEnergySupplierNames.push(currentAddressEnergySupplierElectricity.energySupplier.name);
        currentAddressEnergySupplierNumbers.push(currentAddressEnergySupplierElectricity.esNumber);
    } else {
        if (currentAddressEnergySupplierElectricity?.energySupplier) {
            currentAddressEnergySupplierNames.push(
                currentAddressEnergySupplierElectricity.energySupplier.name + ' (Elektra)'
            );
            currentAddressEnergySupplierNumbers.push(currentAddressEnergySupplierElectricity.esNumber + ' (Elektra)');
        }
        if (currentAddressEnergySupplierGas?.energySupplier) {
            currentAddressEnergySupplierNames.push(currentAddressEnergySupplierGas.energySupplier.name + ' (Gas)');
            currentAddressEnergySupplierNumbers.push(currentAddressEnergySupplierGas.esNumber + ' (Gas)');
        }
    }

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-1">
                    <GetNameByIdHelper id={typeId} items={addressTypes} />
                </div>
                <div className="col-sm-2">{`${street} ${number}${addition ? '-' + addition : ''}`}</div>
                <div className="col-sm-1">{postalCode}</div>
                <div className="col-sm-1">
                    {city} {country ? `(${country.id})` : ''}
                </div>
                <div className="col-sm-2">{areaName}</div>
                <div className="col-sm-2">
                    {currentAddressEnergySupplierNames.map((name, index) => (
                        <div key={index}>{name}</div>
                    ))}
                </div>
                <div className="col-sm-1">
                    {currentAddressEnergySupplierNumbers.map((number, index) => (
                        <div key={index}>{number}</div>
                    ))}
                </div>
                <div className="col-sm-1">{primary && <span className="pull-right">Primair</span>}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons && props.addressEnergySupplierNewOrEditOpen === false && (
                    <>
                        {permissions.updateContactAddress && (props.numberOfAddressesNotOld > 0 || primary) && (
                            <a role="button" onClick={props.openEdit} title="Wijzigen adresgegevens">
                                <Icon className="mybtn-success" size={14} icon={pencil} />
                            </a>
                        )}
                        <a role="button" onClick={props.openAddressEnergySupplier} title="Leveranciergegevens">
                            <Icon className="mybtn-success" size={14} icon={lightbulbO} />
                        </a>
                        {permissions.deleteContactAddress && (
                            <a role="button" onClick={props.toggleDelete} title="Verwijderen adres">
                                <Icon className="mybtn-danger" size={14} icon={trash} />
                            </a>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactDetailsFormAddressView;
