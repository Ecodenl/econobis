import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import { fetchParticipantProjectDetails } from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';
import InputDate from '../../../components/form/InputDate';
import InputText from '../../../components/form/InputText';
import moment from 'moment';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';
import InputToggle from '../../../components/form/InputToggle';
import { hashHistory } from 'react-router';
import ViewText from '../../../components/form/ViewText';
import validator from 'validator';

const ParticipantDetailsTerminate = ({
    participantProject,
    setErrorModal,
    closeDeleteItemModal,
    projectTypeCodeRef,
    fetchParticipantProjectDetails,
}) => {
    const [dateTerminated, setDateTerminated] = useState(
        moment(participantProject.dateTerminatedAllowedFrom).format('Y-MM-DD')
    );
    const [dateTerminatedAllowedFrom, setDateTerminatedAllowedFrom] = useState(
        moment(participantProject.dateTerminatedAllowedFrom).format('Y-MM-DD')
    );
    const [dateTerminatedAllowedTo, setDateTerminatedAllowedTo] = useState(
        moment(participantProject.dateTerminatedAllowedTo).format('Y-MM-DD')
    );

    const [payPercentage, setPayPercentage] = useState(0);
    const [redirectRevenueSplit, setRedirectRevenueSplit] = useState(true);
    const [errors, setErrors] = useState({
        dateTerminated: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        dateTerminated: '',
    });

    const onChangeDateTerminated = value => {
        setDateTerminated(value);
    };

    const onChangePayPercentage = event => {
        const value = event.target.value;
        setPayPercentage(value);
    };

    const onChangeRedirectRevenueSplit = event => {
        const value = event.target.checked;
        setRedirectRevenueSplit(value);
    };

    const confirmAction = () => {
        let errors = {
            dateTerminated: false,
        };
        let errorMessages = {
            dateTerminated: '',
        };
        let hasErrors = false;

        if (validator.isEmpty(dateTerminated)) {
            errors.dateTerminated = true;
            errorMessages.dateTerminated = 'Ongeldige datum';
            hasErrors = true;
        }

        setErrors(errors);
        setErrorMessages(errorMessages);

        if (!hasErrors) {
            ParticipantProjectDetailsAPI.terminateParticipantProject(participantProject.id, {
                dateTerminated,
                payPercentage,
            })
                .then(payload => {
                    fetchParticipantProjectDetails(participantProject.id);
                    closeDeleteItemModal();
                    if (
                        projectTypeCodeRef === 'postalcode_link_capital' &&
                        redirectRevenueSplit &&
                        payload.data.projectsArray &&
                        payload.data.projectsArray.length > 0
                    ) {
                        if (payload.data.projectsArray.success) {
                            hashHistory.push(`${payload.data.revenuePartsKwhRedirect}`);
                        } else {
                            setErrorModal(payload.data.projectsArray.errorMessage);
                        }
                    }
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
                    <ViewText
                        label={'Datum laatste mutatie storting/terugbetaling'}
                        value={
                            participantProject.dateEntryLastMutation
                                ? moment(participantProject.dateEntryLastMutation).format('DD-MM-Y')
                                : ''
                        }
                    />
                </div>
                <div className="row">
                    <InputDate
                        label={'Datum beëindigen'}
                        name="dateTerminated"
                        value={dateTerminated}
                        onChangeAction={onChangeDateTerminated}
                        disabledBefore={dateTerminatedAllowedFrom}
                        disabledAfter={dateTerminatedAllowedTo}
                        error={errors.dateTerminated}
                        errorMessage={errorMessages.dateTerminated}
                        readOnly={dateTerminatedAllowedFrom == dateTerminatedAllowedTo}
                    />
                    {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                        <InputText
                            type={'number'}
                            label={'Uitkeringspercentage'}
                            name="payPercentage"
                            value={payPercentage}
                            onChangeAction={onChangePayPercentage}
                        />
                    ) : null}
                </div>
                {projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <div className="row">
                        <InputToggle
                            label={'Na beëindigen maken eindafrekening voor teruggave EB'}
                            name={'redirectRevenueSplit'}
                            onChangeAction={onChangeRedirectRevenueSplit}
                            value={redirectRevenueSplit}
                        />
                    </div>
                ) : null}
                {projectTypeCodeRef === 'loan' ? (
                    <p className={'has-error-message'}>
                        LET OP: zodra een deelname beëindigd is zal deze NOOIT meer in nieuw aangemaakte opbrengst
                        verdelingen voorkomen, ook niet als je een nieuwe opbrengst verdeling aanmaakt op de datum voor
                        de beëindiging.
                    </p>
                ) : null}
            </Modal>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: participantProjectId => {
        dispatch(fetchParticipantProjectDetails(participantProjectId));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantDetailsTerminate);
