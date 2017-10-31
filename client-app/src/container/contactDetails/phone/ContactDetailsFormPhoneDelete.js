import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deletePhoneNumber } from '../../../actions/ContactDetailsActions';

const ContactDetailsPhoneDelete = (props) => {
    const confirmAction = () => {
        props.deletePhoneNumber(props.id);
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
            Verwijder telefoonnummer: <strong> {`${props.number}` } </strong>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deletePhoneNumber: (id) => {
        dispatch(deletePhoneNumber(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailsPhoneDelete);
