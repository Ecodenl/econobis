import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import ContactToImportsAPI from '../../../api/contact-to-imports/ContactToImportsAPI';
import axiosInstance from '../../../api/default-setup/AxiosInstance';

function ContactToImportsListItem({
    checkedNew,
    toggleCheckedImportNew,
    showCheckboxUpdate,
    selectedContactsUpdate,
    toggleCheckedContactUpdate,
    id,
    number,
    initials,
    firstName,
    lastNamePrefix,
    lastName,
    street,
    housenumber,
    addition,
    postalCode,
    city,
    emailContact,
    phoneNumber,
    ean,
    eanType,
    supplierCodeRef,
    esNumber,
    permissions,
    importMatchDescription,
    contactForImports,
    totalImportIds,
    allowUpdateAction,
    totalContactIds,
}) {
    const [showActionButtons, setShowActionButtons] = useState(false);

    return (
        <>
            <tr style={{ backgroundColor: '#ececec' }}>
                <td>
                    {!showCheckboxUpdate ? (
                        <>
                            <input
                                type="checkbox"
                                checked={checkedNew}
                                onChange={() => toggleCheckedImportNew(id)}
                                disabled={totalImportIds.some(item => item.importId === id && item.blocked === true)}
                            />
                            {' Nieuw'}
                        </>
                    ) : null}
                </td>
                <td>{importMatchDescription}</td>
                <td>{number}</td>
                <td>{initials}</td>
                <td>{firstName}</td>
                <td>{lastNamePrefix}</td>
                <td>{lastName}</td>
                <td>{street}</td>
                <td>{housenumber}</td>
                <td>{addition}</td>
                <td>{postalCode}</td>
                <td>{city}</td>
                <td>{emailContact}</td>
                <td>{phoneNumber}</td>
                <td>{supplierCodeRef}</td>
                <td>{eanType}</td>
                <td>{ean}</td>
                <td>{esNumber}</td>
            </tr>

            {contactForImports.map(contactForImport => {
                return (
                    <tr>
                        <td>
                            {/*{showActionButtons && permissions.manageContactToImports ? (*/}
                            {showActionButtons ? (
                                <a role="button" onClick={() => openItem(id)}>
                                    <Icon className="mybtn-success" size={14} icon={pencil} />
                                </a>
                            ) : (
                                ''
                            )}
                            {contactForImport.matchCode != 'supplierFullMatch' && allowUpdateAction ? (
                                <>
                                    <>
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedContactsUpdate
                                                    ? selectedContactsUpdate.some(
                                                          item =>
                                                              item.importId === id &&
                                                              item.contactId === contactForImport.id
                                                      )
                                                    : false
                                            }
                                            onChange={() => toggleCheckedContactUpdate(id, contactForImport.id)}
                                            disabled={totalContactIds.some(
                                                item =>
                                                    item.importId === id &&
                                                    item.contactId === contactForImport.id &&
                                                    item.blocked === true
                                            )}
                                        />
                                        {' Bijwerken'}
                                    </>
                                </>
                            ) : (
                                ''
                            )}
                        </td>
                        <td style={{ background: contactForImport.matchColor }}>{contactForImport.matchDescription}</td>
                        <td>{contactForImport.number}</td>
                        <td>{contactForImport.initials}</td>
                        <td>{contactForImport.firstName}</td>
                        <td>{contactForImport.lastNamePrefix}</td>
                        <td>{contactForImport.lastName}</td>
                        <td>{contactForImport.street}</td>
                        <td>{contactForImport.housenumber}</td>
                        <td>{contactForImport.addition}</td>
                        <td>{contactForImport.postalCode}</td>
                        <td>{contactForImport.city}</td>
                        <td>{contactForImport.emailContact}</td>
                        <td>{contactForImport.phoneNumber}</td>
                        <td>
                            {eanType === 'Gas' ? contactForImport.esCodeRefGas : contactForImport.esCodeRefElectricity}
                        </td>
                        <td>{eanType === 'Gas' ? contactForImport.esTypeGas : contactForImport.esTypeElectricity}</td>
                        <td>{eanType === 'Gas' ? contactForImport.eanGas : contactForImport.eanElectricity}</td>
                        <td>
                            {eanType === 'Gas' ? contactForImport.esNumberGas : contactForImport.esNumberElectricity}
                        </td>
                    </tr>
                );
            })}
        </>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ContactToImportsListItem);
