import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import ContactToImportsAPI from '../../../api/contact-to-imports/ContactToImportsAPI';
import axiosInstance from '../../../api/default-setup/AxiosInstance';

function ContactToImportsListItem({
    showCheckboxNew,
    checkedNew,
    toggleCheckedImportNew,
    showCheckboxUpdate,
    selectedContactsUpdate,
    toggleCheckedContactUpdate,
    id,
    number,
    firstName,
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
    matchCode,
    contactForImports,
    refreshContactToImports,
}) {
    const [showActionButtons, setShowActionButtons] = useState(false);

    function updateContactFromContactToImport(contactToImport, contactForImport) {
        ContactToImportsAPI.getContactFromContactToImport(contactToImport)
            .then(payload => {
                return axiosInstance.post(`/person/${contactForImport}`, payload.data);
            })
            .then(payload => {
                ContactToImportsAPI.setContactToImportStatus(
                    contactToImport,
                    'geïmporteerd update',
                    payload.data.data.id
                );
            })
            .then(() => {
                setTimeout(() => {
                    refreshContactToImports();
                }, 200);
            });
    }

    function createNewContactFromContactToImport(contactToImport) {
        ContactToImportsAPI.getContactFromContactToImport(contactToImport)
            .then(payload => {
                return axiosInstance.post('/person', payload.data);
            })
            .then(payload => {
                ContactToImportsAPI.setContactToImportStatus(
                    contactToImport,
                    'geïmporteerd nieuw',
                    payload.data.data.id
                );
            })
            .then(() => {
                setTimeout(() => {
                    refreshContactToImports();
                }, 200);
            });
    }

    // const matchCodeText = matchCode => {
    //     switch (matchCode) {
    //         case 'new':
    //             return 'Nog verwerken';
    //         case 'supplierFullMatch':
    //             return 'Match klant';
    //         case 'supplierIgnoreEsNumber':
    //             return 'Match klant min klantnummer';
    //         case 'supplierIgnoreAddress':
    //             return 'Match klant minus adres';
    //         case 'supplierIgnoreEmail':
    //             return 'Match klant minus E-mail';
    //         case 'supplierIgnoreLastName':
    //             return 'Match klant minus naam';
    //         case 'contactMatch':
    //             return 'Match contact';
    //         case 'contactIgnoreAddress':
    //             return 'Match contact minus adres';
    //         case 'contactIgnoreEmail':
    //             return 'Match contact minus e-mail';
    //         case 'contactIgnoreLastName':
    //             return 'Match contact minus naam';
    //     }
    //     return matchCode;
    // };

    return (
        <>
            <tr style={{ backgroundColor: '#ececec' }}>
                <td>
                    {/*{showActionButtons && permissions.manageContactToImports ? (*/}
                    {/*    <a role="button" onClick={() => openItem(id)}>*/}
                    {/*        <Icon className="mybtn-success" size={14} icon={pencil} />*/}
                    {/*    </a>*/}
                    {/*) : (*/}
                    {/*    ''*/}
                    {/*)}*/}
                    {!showCheckboxUpdate ? (
                        <>
                            <input type="checkbox" checked={checkedNew} onChange={() => toggleCheckedImportNew(id)} />
                            {' Nieuw'}
                        </>
                    ) : null}
                </td>
                <td>{matchCode}</td>
                <td>{number}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{street}</td>
                <td>{housenumber}</td>
                <td>{addition}</td>
                <td>{postalCode}</td>
                <td>{city}</td>
                <td>{emailContact}</td>
                <td>{phoneNumber}</td>
                <td>{ean}</td>
                <td>{eanType}</td>
                <td>{supplierCodeRef}</td>
                <td>{esNumber}</td>
                {/*<td>{matchCode}</td>*/}
                {/*<td>*/}
                {/*    {showActionButtons && permissions.manageContactToImports ? (*/}
                {/*        <a role="button" onClick={() => openItem(id)}>*/}
                {/*            <Icon className="mybtn-success" size={14} icon={pencil} />*/}
                {/*        </a>*/}
                {/*    ) : (*/}
                {/*        ''*/}
                {/*    )}*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        // onChange={() => createNewContactFromContactToImport(id)}*/}
                {/*    />{' '}*/}
                {/*    nieuw*/}
                {/*</td>*/}
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
                            {contactForImport.matchCode != 'supplierFullMatch' ? (
                                <>
                                    {/*{contactForImport.showCheckboxUpdate ? (*/}
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
                                        />
                                        {' Bijwerken'}
                                    </>
                                    {/*) : null}*/}
                                </>
                            ) : (
                                ''
                            )}
                        </td>
                        <td style={{ background: contactForImport.matchColor }}>
                            {/*{matchCodeText(contactForImport.matchCode)}*/}
                            {contactForImport.matchDescription}
                        </td>
                        <td>{contactForImport.number}</td>
                        <td>{contactForImport.firstName}</td>
                        <td>{contactForImport.lastName}</td>
                        <td>{contactForImport.street}</td>
                        <td>{contactForImport.housenumber}</td>
                        <td>{contactForImport.addition}</td>
                        <td>{contactForImport.postalCode}</td>
                        <td>{contactForImport.city}</td>
                        <td>{contactForImport.emailContact}</td>
                        <td>{contactForImport.phoneNumber}</td>
                        <td>{contactForImport.eanElectricity}</td>
                        <td>{contactForImport.esTypeElectricity}</td>
                        <td>{contactForImport.esCodeRefElectricity}</td>
                        <td>{contactForImport.esNumberElectricity}</td>
                        {/*<td style={{ background: contactForImport.matchColor }}>{contactForImport.matchCode}</td>*/}
                        {/*<td>*/}
                        {/*    {showActionButtons && permissions.manageContactToImports ? (*/}
                        {/*        <a role="button" onClick={() => openItem(id)}>*/}
                        {/*            <Icon className="mybtn-success" size={14} icon={pencil} />*/}
                        {/*        </a>*/}
                        {/*    ) : (*/}
                        {/*        ''*/}
                        {/*    )}*/}
                        {/*    {contactForImport.matchCode != 'supplierFullMatch' ? (*/}
                        {/*        <input*/}
                        {/*            type="checkbox"*/}
                        {/*            // onChange={() => updateContactFromContactToImport(id, contactForImport.personId)}*/}
                        {/*        />*/}
                        {/*    ) : (*/}
                        {/*        ''*/}
                        {/*    )}*/}
                        {/*</td>*/}
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
