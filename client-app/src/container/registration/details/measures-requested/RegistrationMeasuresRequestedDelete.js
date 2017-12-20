import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteRegistrationMeasureRequested } from '../../../../actions/registration/RegistrationDetailsActions';

const RegistrationMeasuresRequestedDelete = (props) => {
    const confirmAction = () => {
        props.deleteRegistrationMeasureRequested(props.id);
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
          <p>Verwijder maatregel gewenst: <strong> {`${props.name}` } </strong></p>

        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRegistrationMeasureRequested: (id) => {
        dispatch(deleteRegistrationMeasureRequested(id));
    },
});

export default connect(null, mapDispatchToProps)(RegistrationMeasuresRequestedDelete);