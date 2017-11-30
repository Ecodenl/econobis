import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Modal from '../../components/modal/Modal';
import { deleteRegistration } from '../../../actions/registration/RegistrationDetailsActions';

const RegistrationDetailsDelete = (props) => {
    const confirmAction = () => {
        props.deleteRegistration(props.id);

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
            <p>Verwijder aanmelding: <strong> {`${props.fullName}` } </strong></p>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRegistration: (id) => {
        dispatch(deleteRegistration(id));
    },
});

export default connect(null, mapDispatchToProps)(RegistrationDetailsDelete);
