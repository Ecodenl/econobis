import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteRegistrationMeasureTaken } from '../../../../actions/registration/RegistrationDetailsActions';

const RegistrationMeasuresTakenDelete = (props) => {
    const confirmAction = () => {
        props.deleteRegistrationMeasureTaken(props.id);
        props.closeDeleteItemModal();
    };
    console.log(props);
    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
          <p>Verwijder maatregel genomen: <strong> {`${props.name}` } </strong></p>

        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRegistrationMeasureTaken: (id) => {
        dispatch(deleteRegistrationMeasureTaken(id));
    },
});

export default connect(null, mapDispatchToProps)(RegistrationMeasuresTakenDelete);