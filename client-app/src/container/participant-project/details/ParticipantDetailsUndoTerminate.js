import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import { fetchParticipantProjectDetails } from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';

const ParticipantDetailsTerminate = ({
    participantProjectId,
    closeDeleteItemModal,
    projectTypeCodeRef,
    fetchParticipantProjectDetails,
}) => {
    const [dateTerminated, setDateTerminated] = useState(null);

    const confirmAction = () => {
        setDateTerminated(null);
        ParticipantProjectDetailsAPI.undoTerminateParticipantProject(participantProjectId, {
            dateTerminated,
        })
            .then(payload => {
                fetchParticipantProjectDetails(participantProjectId);
                closeDeleteItemModal();
            })
            .catch(error => {
                alert('Er is iets misgegaan bij het opslaan. Herlaad de pagina.');
            });
    };

    return (
        <Modal
            buttonConfirmText="Deelname beëindiging ongedaan maken"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Beëindigen"
            modalClassName={'modal-lg'}
        >
            <p>Weet u zeker dat u deze beëindigde deelname weer ongedaan wilt maken?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: participantProjectId => {
        dispatch(fetchParticipantProjectDetails(participantProjectId));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ParticipantDetailsTerminate);
