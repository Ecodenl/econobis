import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import { fetchParticipantProjectDetails } from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';
import InputDate from '../../../components/form/InputDate';
import InputText from '../../../components/form/InputText';
import moment from 'moment';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';

const ParticipantDetailsTerminate = ({
    participantProjectId,
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
            ParticipantProjectDetailsAPI.terminateParticipantProject(participantProjectId, {
                dateTerminated,
                payoutPercentageTerminated,
            })
                .then(payload => {
                    fetchParticipantProjectDetails(participantProjectId);
                    closeDeleteItemModal();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij het opslaan. Herlaad de pagina.');
                });
        }
    };

    return (
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
                    disabledAfter={moment().format('Y-MM-DD')}
                />
                {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                    <InputText
                        label={'Uitkeringspercentage'}
                        name="payoutPercentageTerminated"
                        value={payoutPercentageTerminated}
                        onChangeAction={onChangePayoutPercentageTerminated}
                    />
                ) : null}
            </div>
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
