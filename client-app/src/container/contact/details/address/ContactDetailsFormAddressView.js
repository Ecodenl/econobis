import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';
import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';
import { lightbulbO } from 'react-icons-kit/fa/lightbulbO';

const ContactDetailsFormAddressView = props => {
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
    if (currentAddressEnergySupplierElectricity && currentAddressEnergySupplierElectricity.energySupplyTypeId === 3) {
        currentAddressEnergySupplierNames.push(currentAddressEnergySupplierElectricity.energySupplier.name);
        currentAddressEnergySupplierNumbers.push(currentAddressEnergySupplierElectricity.esNumber);
    } else {
        if (currentAddressEnergySupplierElectricity && currentAddressEnergySupplierElectricity.energySupplier) {
            currentAddressEnergySupplierNames.push(
                currentAddressEnergySupplierElectricity.energySupplier.name + ' (Elektra)'
            );
            currentAddressEnergySupplierNumbers.push(currentAddressEnergySupplierElectricity.esNumber + ' (Elektra)');
        }
        if (currentAddressEnergySupplierGas && currentAddressEnergySupplierGas.energySupplier) {
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
                    <GetNameByIdHelper id={typeId} items={props.addressTypes} />
                </div>
                <div className="col-sm-2">{street + ' ' + number + (addition ? '-' + addition : '')}</div>
                <div className="col-sm-1">{postalCode}</div>
                <div className="col-sm-1">
                    {city} {country ? '(' + country.id + ')' : ''}
                </div>
                <div className="col-sm-2">{areaName}</div>
                {/*<div className="col-sm-2">{country ? country.name : ''}</div>*/}
                <div className="col-sm-2">
                    {currentAddressEnergySupplierNames.map(energySupplierName => {
                        return (
                            <>
                                {energySupplierName}
                                <br />
                            </>
                        );
                    })}
                </div>
                <div className="col-sm-1">
                    {currentAddressEnergySupplierNumbers.map(energySupplierNumber => {
                        return (
                            <>
                                {energySupplierNumber}
                                <br />
                            </>
                        );
                    })}
                </div>
                <div className="col-sm-1">{primary ? <span className="pull-right">Primair</span> : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons
                    ? props.addressEnergySupplierNewOrEditOpen == false && (
                          <>
                              {props.permissions.updateContactAddress &&
                                  (props.numberOfAddressesNotOld > 0 || primary == true) && (
                                      <>
                                          <a role="button" onClick={props.openEdit} title="Wijzigen adresgegevens">
                                              <Icon className="mybtn-success" size={14} icon={pencil} />
                                          </a>
                                      </>
                                  )}
                              <a role="button" onClick={props.openAddressEnergySupplier} title="Leveranciergegevens">
                                  <Icon className="mybtn-success" size={14} icon={lightbulbO} />
                              </a>
                              {props.permissions.deleteContactAddress && (
                                  <a role="button" onClick={props.toggleDelete} title="Verwijderen adres">
                                      <Icon className="mybtn-danger" size={14} icon={trash} />
                                  </a>
                              )}
                          </>
                      )
                    : ''}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        addressTypes: state.systemData.addressTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormAddressView);
