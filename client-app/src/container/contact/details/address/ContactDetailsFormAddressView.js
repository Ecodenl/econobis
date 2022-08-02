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
        primaryAddressEnergySupplier,
    } = props.address;

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
                <div className="col-sm-3">{street + ' ' + number + (addition ? '-' + addition : '')}</div>
                <div className="col-sm-2">{postalCode}</div>
                <div className="col-sm-2">
                    {city} {country ? '(' + country.id + ')' : ''}
                </div>
                {/*<div className="col-sm-2">{country ? country.name : ''}</div>*/}
                <div className="col-sm-2">
                    {primaryAddressEnergySupplier && primaryAddressEnergySupplier.energySupplier
                        ? primaryAddressEnergySupplier.energySupplier.name
                        : ''}
                </div>
                <div className="col-sm-1">{primary ? <span className="pull-right">Primair</span> : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons
                    ? props.addressEnergySupplierNewOrEditOpen == false && (
                          <>
                              {(props.numberOfAddressesNotOld > 0 || primary == true) && (
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
                              <a role="button" onClick={props.toggleDelete} title="Verwijderen adres">
                                  <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                              </a>
                          </>
                      )
                    : ''}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        addressTypes: state.systemData.addressTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormAddressView);
