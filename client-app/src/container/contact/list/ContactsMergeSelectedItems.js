import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { mergeSelectedContacts } from '../../../actions/contact/ContactsActions';

const ContactsMergeSelectedItems = props => {
    const confirmAction = () => {
        let contactIds = [];

        props.contacts.map(contact => contact.checked === true && contactIds.push(contact.id));

        props.mergeSelectedContacts(contactIds);
        props.fetchContactsData(); // Todo; pas opnieuw fetchen na succesvol mergen
        props.toggleShowMergeSelectedItems();
    };

    const countCheckedContact = () => {
        let count = 0;

        props.contacts.map(contact => contact.checked === true && count++);

        return count;
    };

    return (
        <Modal
            buttonConfirmText="Samenvoegen"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleShowMergeSelectedItems}
            confirmAction={() => confirmAction()}
            title="Contacten samenvoegen"
        >
            {countCheckedContact() === 2 ? (
                <div>
                    Weet je zeker dat je deze 2 contacten wilt samenvoegen? <br />
                    Gegevens worden overgenomen naar het eerste contact, het tweede contact wordt verwijderd.
                </div>
            ) : (
                <div>Selecteer exact 2 contacten om te kunnen samenvoegen.</div>
            )}
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        contacts: state.contacts.list.data,
    };
};

const mapDispatchToProps = dispatch => ({
    mergeSelectedContacts: contactIds => {
        dispatch(mergeSelectedContacts(contactIds));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsMergeSelectedItems);
