import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';
import { FaRegLightbulb } from 'react-icons/fa';

const ContactDetailsFormAddressView = props => {
    const {
        typeId,
        street,
        number,
        addition,
        postalCode,
        city,
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
                currentAddressEnergySupplierElectricity.energySupplier.name + ' (Electra)'
            );
            currentAddressEnergySupplierNumbers.push(currentAddressEnergySupplierElectricity.esNumber + ' (Electra)');
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
                <div className="col-sm-2">
                    {city} {country ? '(' + country.id + ')' : ''}
                </div>
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
                <div className="col-sm-2">
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
                                          <a role="button" onClick={props.openEdit}>
                                              <span
                                                  className="glyphicon glyphicon-pencil mybtn-success"
                                                  title="Wijzigen adresgegevens"
                                              />{' '}
                                          </a>
                                      </>
                                  )}
                              <a role="button" onClick={props.openAddressEnergySupplier} title="Leveranciergegevens">
                                  {/*<span className="glyphicon glyphicon-cog mybtn-success" />*/}
                                  <FaRegLightbulb className="mybtn-success" size={'15px'} />
                              </a>
                              {props.permissions.deleteContactAddress && (
                                  <a role="button" onClick={props.toggleDelete} title="Verwijderen adres">
                                      <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
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
