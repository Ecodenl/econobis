import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteEmailAddress } from '../../../actions/ContactDetailsActions';

const ContactDetailsEmailDelete = (props) => {
    const confirmAction = () => {
        props.deleteEmailAddress(props.id);
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
            Verwijder e-mail adres: <strong> {`${props.email}` } </strong>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteEmailAddress: (id) => {
        dispatch(deleteEmailAddress(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailsEmailDelete);
