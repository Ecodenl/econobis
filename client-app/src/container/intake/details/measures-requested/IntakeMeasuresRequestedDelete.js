import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteIntakeMeasureRequested } from '../../../../actions/intake/IntakeDetailsActions';

const IntakeMeasuresRequestedDelete = props => {
    const confirmAction = () => {
        props.deleteIntakeMeasureRequested(props.intakeId, props.id);
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
            <p>
                Verwijder maatregel gewenst: <strong> {`${props.name}`} </strong>
            </p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        intakeId: state.intakeDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteIntakeMeasureRequested: (intakeId, measureId) => {
        dispatch(deleteIntakeMeasureRequested(intakeId, measureId));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntakeMeasuresRequestedDelete);
