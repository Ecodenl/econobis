import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContact } from '../../../actions/contact/ContactsActions';

const ContactsDeleteItem = props => {
    const confirmAction = () => {
        props.deleteContact(props.id);
        props.closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder contact: <strong> {props.fullName} </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContact: id => {
        dispatch(deleteContact(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactsDeleteItem);
