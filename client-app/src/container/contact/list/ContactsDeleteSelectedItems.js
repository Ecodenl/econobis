import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import {deleteSelectedContacts} from '../../../actions/contact/ContactsActions';

const ContactsDeleteSelectedItems = (props) => {
    const confirmAction = () => {
        let contactIds = [];

        props.contacts.map((contact) => (contact.checked === true && contactIds.push(contact.id)));

        props.deleteSelectedContacts(contactIds);
        props.toggleShowDeleteSelectedItems();
    };

    const countCheckedContact = () => {
        let count = 0;
        props.contacts.map((contact) => (contact.checked === true && count++));

        return count;
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleShowDeleteSelectedItems}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            {
                (countCheckedContact() !== 0 ?
                    <div>Verwijder de geselecteerde <strong>{countCheckedContact()}</strong> contacten?</div>
                    :
                    <div>Geen contacten geselecteerd.</div>
                )
            }
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.list.data,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteSelectedContacts: (contactIds) => {
        dispatch(deleteSelectedContacts(contactIds));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsDeleteSelectedItems);
