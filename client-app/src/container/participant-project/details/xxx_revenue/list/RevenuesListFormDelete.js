import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteRevenueSplit } from '../../../../../actions/participants-project/ParticipantProjectDetailsActions';

const ParticipantProjectRevenuesListFormDelete = props => {
    const confirmAction = () => {
        props.deleteRevenueSplit(props.id);
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
            <p>Verwijder opbrengst?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRevenueSplit: id => {
        dispatch(deleteRevenueSplit(id));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantProjectRevenuesListFormDelete);
