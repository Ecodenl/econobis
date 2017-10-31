import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteNote } from '../../../actions/ContactDetailsActions';

const ContactDetailsNoteDelete = (props) => {
    const confirmAction = () => {
        props.deleteNote(props.id);
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
    deleteNote: (id) => {
        dispatch(deleteNote(id));
    },
});


export default connect(null, mapDispatchToProps)(ContactDetailsNoteDelete);
