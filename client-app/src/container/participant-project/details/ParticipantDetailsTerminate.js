import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import { fetchParticipantProjectDetails } from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';
import InputDate from '../../../components/form/InputDate';
import InputText from '../../../components/form/InputText';
import moment from 'moment';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';

const ParticipantDetailsTerminate = ({
    participantProject,
    setErrorModal,
    closeDeleteItemModal,
    projectTypeCodeRef,
    fetchParticipantProjectDetails,
}) => {
    const [dateTerminated, setDateTerminated] = useState(moment().format('Y-MM-DD'));
    const [payoutPercentageTerminated, setPayoutPercentageTerminated] = useState(0);

    const onChangeDateTerminated = value => {
        setDateTerminated(value);
    };

    const onChangePayoutPercentageTerminated = event => {
        const value = event.target.value;

        setPayoutPercentageTerminated(value);
    };

    const confirmAction = () => {
        if (dateTerminated) {
            ParticipantProjectDetailsAPI.terminateParticipantProject(participantProject.id, {
                dateTerminated,
                payoutPercentageTerminated,
            })
                .then(payload => {
                    fetchParticipantProjectDetails(participantProject.id);
                    closeDeleteItemModal();
                })
                .catch(error => {
                    // let errorObject = JSON.parse(JSON.stringify(error));
                    let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }
                    setErrorModal(errorMessage);
                });
        }
    };

    return (
        <>
            {participantProject.participantInConfirmedRevenue ? (
                <Modal
                    buttonConfirmText="Deelname beëindigen"
                    buttonClassName={'btn-danger'}
                    closeModal={closeDeleteItemModal}
                    showConfirmAction={false}
                    title="Beëindigen"
                    modalClassName={'modal-lg'}
                >
                    <p>
                        Deelname komt nog voor in niet verwerkte definitieve opbrengstverdeling. Beëindiging nog niet
                        mogelijk.
                    </p>
                </Modal>
            ) : (
                <Modal
                    buttonConfirmText="Deelname beëindigen"
                    buttonClassName={'btn-danger'}
                    closeModal={closeDeleteItemModal}
                    confirmAction={() => confirmAction()}
                    title="Beëindigen"
                    modalClassName={'modal-lg'}
                >
                    <p>Weet u zeker dat u deze deelname wilt beëindigen?</p>
                    <div className="row">
                        <InputDate
                            label={'Datum beëindigen'}
                            name="dateTerminated"
                            value={dateTerminated}
                            onChangeAction={onChangeDateTerminated}
                            disabledBefore={moment(participantProject.dateEntryFirstDeposit).format('Y-MM-DD')}
                            disabledAfter={moment().format('Y-MM-DD')}
                        />
                        {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                            <InputText
                                type={'number'}
                                label={'Uitkeringspercentage'}
                                name="payoutPercentageTerminated"
                                value={payoutPercentageTerminated}
                                onChangeAction={onChangePayoutPercentageTerminated}
                            />
                        ) : null}
                    </div>
                </Modal>
            )}
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: participantProjectId => {
        dispatch(fetchParticipantProjectDetails(participantProjectId));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantDetailsTerminate);
