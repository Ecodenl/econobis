import React from 'react';

import Modal from '../../../components/modal/Modal';
import { deleteIntake } from '../../../actions/intake/IntakeDetailsActions';
import { connect } from 'react-redux';

const IntakeDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteIntake(props.id, props.contactId);

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
                Verwijder intake: <strong> {`${props.fullStreet}?`} </strong>
            </p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteIntake: (id, contactId) => {
        dispatch(deleteIntake(id, contactId));
    },
});

export default connect(null, mapDispatchToProps)(IntakeDetailsDelete);
