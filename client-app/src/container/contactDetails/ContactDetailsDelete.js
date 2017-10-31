import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Modal from '../../components/modal/Modal';
import { deleteContact } from '../../actions/ContactDetailsActions';

const ContactDetailsPhoneDelete = (props) => {
    const confirmAction = () => {
        props.deleteContact(props.id);

        hashHistory.push('/contacten');
    };

    return (
        <Modal
        buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
      >
            <p>Verwijder contact: <strong> {`${props.fullName}` } </strong></p>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContact: (id) => {
        dispatch(deleteContact(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailsPhoneDelete);
