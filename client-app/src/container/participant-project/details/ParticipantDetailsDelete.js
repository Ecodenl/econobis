import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteParticipantProject } from '../../../actions/participants-project/ParticipantProjectDetailsActions';

const ParticipantDetailsDelete = ({ id, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteParticipantProject(id));
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
            <p>Weet u zeker dat u deze deelname wilt verwijderen?</p>
        </Modal>
    );
};

export default ParticipantDetailsDelete;
