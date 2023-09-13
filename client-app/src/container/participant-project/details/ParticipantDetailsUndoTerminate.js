import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import { fetchParticipantProjectDetails } from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';

const ParticipantDetailsUndoTerminate = ({
    participantProject,
    setErrorModal,
    closeDeleteItemModal,
    projectTypeCodeRef,
    fetchParticipantProjectDetails,
}) => {
    const [dateTerminated, setDateTerminated] = useState(null);

    const confirmAction = () => {
        setDateTerminated(null);
        ParticipantProjectDetailsAPI.undoTerminateParticipantProject(participantProject.id, {
            dateTerminated,
        })
            .then(payload => {
                fetchParticipantProjectDetails(participantProject.id);
                closeDeleteItemModal();
            })
            .catch(error => {
                let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (errorObject.response.status !== 500) {
                    errorMessage = errorObject.response.data.message;
                }
                setErrorModal(errorMessage);
            });
    };

    return (
        <>
            <Modal
                buttonConfirmText="Deelname beëindiging ongedaan maken"
                buttonClassName={'btn-danger'}
                closeModal={closeDeleteItemModal}
                confirmAction={() => confirmAction()}
                title="Beëindigen ongedaan maken"
                modalClassName={'modal-lg'}
            >
                <p>Weet u zeker dat u deze beëindigde deelname weer ongedaan wilt maken?</p>
            </Modal>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: participantProjectId => {
        dispatch(fetchParticipantProjectDetails(participantProjectId));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantDetailsUndoTerminate);
