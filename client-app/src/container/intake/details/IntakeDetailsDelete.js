import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteIntake } from '../../../actions/intake/IntakeDetailsActions';

const IntakeDetailsDelete = ({ id, contactId, fullStreet, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteIntake(id, contactId));
        closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            <p>
                Verwijder intake: <strong> {`${fullStreet}?`} </strong>
            </p>
        </Modal>
    );
};

export default IntakeDetailsDelete;
