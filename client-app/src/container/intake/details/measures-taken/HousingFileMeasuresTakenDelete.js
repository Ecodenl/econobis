import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteIntakeMeasureTaken } from '../../../../actions/intake/IntakeDetailsActions';

const IntakeMeasuresTakenDelete = (props) => {
    const confirmAction = () => {
        props.deleteIntakeMeasureTaken(props.id);
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
          <p>Verwijder maatregel genomen: <strong> {`${props.name}` } </strong></p>

        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteIntakeMeasureTaken: (id) => {
        dispatch(deleteIntakeMeasureTaken(id));
    },
});

export default connect(null, mapDispatchToProps)(IntakeMeasuresTakenDelete);