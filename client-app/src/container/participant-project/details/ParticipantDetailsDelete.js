import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteParticipantProject } from '../../../actions/participants-project/ParticipantProjectDetailsActions';

const ParticipantDetailsDelete = ({ id, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.participantProjectDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteParticipantProject(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate(-1);
            dispatch({ type: 'RESET_DELETE_PARTICIPANT_SUCCESS' });
        }
    }, [deleteSuccess, navigate, dispatch]);

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
