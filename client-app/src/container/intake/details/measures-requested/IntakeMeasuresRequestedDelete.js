import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteIntakeMeasureRequested } from '../../../../actions/intake/IntakeDetailsActions';

const IntakeMeasuresRequestedDelete = (props) => {
    const confirmAction = () => {
        props.deleteIntakeMeasureRequested(props.id);
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
    deleteIntakeMeasureRequested: (id) => {
        dispatch(deleteIntakeMeasureRequested(id));
    },
});

export default connect(null, mapDispatchToProps)(IntakeMeasuresRequestedDelete);