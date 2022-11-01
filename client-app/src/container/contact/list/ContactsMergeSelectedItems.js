import React from 'react';
import Modal from "../../../components/modal/Modal";
import ContactsAPI from '../../../api/contact/ContactsAPI';

function ContactsMergeSelectedItems(props) {
    const confirmAction = () => {
        let contactIds = [];

        props.contacts.data.map(contact => contact.checked === true && contactIds.push(contact.id));

        ContactsAPI.mergeContacts(contactIds)
            .then(function () {
                props.fetchContactsData();
                props.toggleShowMergeSelectedItems();
            })
            .catch(function (error) {
                alert(error.response.data.message);
            });
    };

    const countCheckedContact = () => {
        let count = 0;

        props.contacts.data.map(contact => contact.checked === true && count++);

        return count;
    };

    return (
        <div>
            <Modal
                buttonConfirmText="Samenvoegen"
                buttonClassName={'btn-danger'}
                closeModal={props.toggleShowMergeSelectedItems}
                confirmAction={() => confirmAction()}
                title="Contacten samenvoegen"
            >
                {countCheckedContact() === 2 ? (
                    <div>
                        Weet je zeker dat je deze 2 contacten wilt samenvoegen? <br/>
                        Gegevens worden overgenomen naar het eerste contact, het tweede contact wordt verwijderd.
                    </div>
                ) : (
                    <div>Selecteer exact 2 contacten om te kunnen samenvoegen.</div>
                )}
            </Modal>
        </div>
    );
}

export default ContactsMergeSelectedItems;
