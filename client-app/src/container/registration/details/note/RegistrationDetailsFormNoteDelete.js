import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteRegistrationNote } from '../../../../actions/registration/RegistrationDetailsActions';

const RegistrationDetailsNoteDelete = (props) => {
    const confirmAction = () => {
        props.deleteRegistrationNote(props.id);
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
            Verwijder opmerking: <strong> {`${props.id}` } </strong>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRegistrationNote: (id) => {
        dispatch(deleteRegistrationNote(id));
    },
});


export default connect(null, mapDispatchToProps)(RegistrationDetailsNoteDelete);
