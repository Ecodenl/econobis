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
            <p>Verwijder telefoonnummer: <strong> {`${props.number}` } </strong></p>

            { props.primary && <p className={'text-danger'}><strong>Let op!</strong> Dit is een primair telefoonnummer</p> }
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deletePhoneNumber: (id) => {
        dispatch(deletePhoneNumber(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailsPhoneDelete);
