import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../../components/modal/Modal';
import { deleteParticipationTransaction } from '../../../../../../actions/participants-production-project/ParticipantProductionProjectDetailsActions';

const TransactionFormDelete = props => {
    const confirmAction = () => {
        props.deleteParticipationTransaction(props.id);
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
            <p>Verwijder transactie?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteParticipationTransaction: id => {
        dispatch(deleteParticipationTransaction(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(TransactionFormDelete);
