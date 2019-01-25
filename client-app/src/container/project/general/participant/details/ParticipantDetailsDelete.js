import React from 'react';

import Modal from '../../../../../components/modal/Modal';
import { deleteParticipantProject } from '../../../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';

const ParticipantDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteParticipantProject(props.id);
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
            <p>Weet u zeker dat u deze deelname wilt verwijderen?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteParticipantProject: id => {
        dispatch(deleteParticipantProject(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ParticipantDetailsDelete);
