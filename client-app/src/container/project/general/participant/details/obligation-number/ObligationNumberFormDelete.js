import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../../components/modal/Modal';
import { deleteObligationNumber } from '../../../../../../actions/participants-project/ParticipantProjectDetailsActions';

const ObligationNumberFormDelete = props => {
    const confirmAction = () => {
        props.deleteObligationNumber(props.id);
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
                Verwijder obligatienummer <strong> {`${props.number}`} </strong>?
            </p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteObligationNumber: id => {
        dispatch(deleteObligationNumber(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ObligationNumberFormDelete);
