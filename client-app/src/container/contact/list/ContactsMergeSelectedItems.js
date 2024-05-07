import React, { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';
import ContactsAPI from '../../../api/contact/ContactsAPI';

function ContactsMergeSelectedItems({ contacts, fetchContactsData, toggleShowMergeSelectedItems }) {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const contactIds = contacts.data
        .filter(contact => contact.checked)
        .sort((a, b) => {
            return a.checkedAt - b.checkedAt;
        })
        .map(contact => contact.id);
    const contactKeep = contacts.data.find(contact => contact.id === Number(contactIds[0]));
    const contactRemove = contacts.data.find(contact => contact.id === Number(contactIds[1]));

    const confirmAction = () => {
        ContactsAPI.mergeContacts(contactIds[0], contactIds[1])
            .then(function() {
                setMessage('Contacten zijn succesvol samengevoegd');
                fetchContactsData();
                setTimeout(toggleShowMergeSelectedItems, 2000);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.econobis && error.response.data.errors.econobis.length) {
                            // console.log('error 422');
                            // console.log(error.response.data);
                            setMessage('Fout bij samenvoegen contacten:');
                            setErrors(error.response.data.errors.econobis);
                        }
                    } else if (error.response.data && error.response.data.message) {
                        setMessage(
                            'Er is iets misgegaan bij het samenvoegen contacten (' + error.response.status + ').'
                        );
                        let messageErrors = [];
                        if (Array.isArray(error.response.data.message)) {
                            for (const [key, value] of Object.entries(JSON.parse(error.response.data.message))) {
                                messageErrors.push(`${value}`);
                            }
                        } else {
                            messageErrors.push(error.response.data.message);
                        }
                        setErrors(messageErrors);
                    }
                } else {
                    setMessage('Er is iets misgegaan bij het samenvoegen contacten.');
                    setErrors(['Onbekende fout']);
                }
            });
    };

    const countCheckedContact = () => {
        let count = 0;

        contacts.data.map(contact => contact.checked === true && count++);

        return count;
    };

    return (
        <div>
            {errors.length ? (
                <Modal
                    buttonConfirmText="Samenvoegen"
                    buttonClassName={'btn-danger'}
                    closeModal={toggleShowMergeSelectedItems}
                    showConfirmAction={false}
                    title="Contacten samenvoegen"
                >
                    <p>{message}</p>
                    <ul>
                        {errors.map(item => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </Modal>
            ) : (
                <Modal
                    buttonConfirmText="Samenvoegen"
                    buttonClassName={'btn-danger'}
                    closeModal={toggleShowMergeSelectedItems}
                    confirmAction={() => confirmAction()}
                    showConfirmAction={countCheckedContact() === 2}
                    title="Contacten samenvoegen"
                >
                    {countCheckedContact() === 2 ? (
                        <div>
                            Weet je zeker dat je deze 2 contacten wilt samenvoegen? <br />
                            Gegevens worden overgenomen naar het eerst geselecteerde contact{' '}
                            <strong>{contactKeep.number}</strong>, het tweede geselecteerde contact{' '}
                            <strong>{contactRemove.number}</strong> wordt verwijderd.
                        </div>
                    ) : (
                        <div>Selecteer exact 2 contacten om te kunnen samenvoegen.</div>
                    )}
                </Modal>
            )}
        </div>
    );
}

export default ContactsMergeSelectedItems;
