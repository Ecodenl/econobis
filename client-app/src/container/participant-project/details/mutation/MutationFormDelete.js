import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteParticipationMutation } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';

const MutationFormDelete = props => {
    const confirmAction = () => {
        props.deleteParticipationMutation(props.id);
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
            <p>Verwijder mutatie?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteParticipationMutation: id => {
        dispatch(deleteParticipationMutation(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(MutationFormDelete);
