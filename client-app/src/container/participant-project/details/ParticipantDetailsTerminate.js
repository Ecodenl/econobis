import React, { useEffect, useState } from 'react';

import Modal from '../../../components/modal/Modal';
import { fetchParticipantProjectDetails } from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';
import InputDate from '../../../components/form/InputDate';
import moment from 'moment';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';
import InputToggle from '../../../components/form/InputToggle';
import { useNavigate } from 'react-router-dom';
import ViewText from '../../../components/form/ViewText';
import validator from 'validator';

const ParticipantDetailsTerminate = ({
    participantProject,
    setErrorModal,
    closeDeleteItemModal,
    projectTypeCodeRef,
    fetchParticipantProjectDetails,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        getAdditionalInfoForTerminatingOrChangeEntryDate(participantProject.id);
    }, [participantProject.id]);

    function getAdditionalInfoForTerminatingOrChangeEntryDate(participantProjectId) {
        ParticipantProjectDetailsAPI.getAdditionalInfoForTerminatingOrChangeEntryDate(participantProjectId).then(
            payload => {
                setDateTerminated(payload.dateTerminatedAllowedFrom ? payload.dateTerminatedAllowedFrom : '');
                setDateTerminatedAllowedFrom(
                    payload.dateTerminatedAllowedFrom ? payload.dateTerminatedAllowedFrom : ''
                );
                setDateTerminatedAllowedTo(payload.dateTerminatedAllowedTo ? payload.dateTerminatedAllowedTo : '');
                setDateEntryLastMutation(payload.dateEntryLastMutation ? payload.dateEntryLastMutation : '');
            }
        );
    }

    const [dateTerminated, setDateTerminated] = useState(null);
    const [dateEntryLastMutation, setDateEntryLastMutation] = useState(null);
    const [dateTerminatedAllowedFrom, setDateTerminatedAllowedFrom] = useState('');
    const [dateTerminatedAllowedTo, setDateTerminatedAllowedTo] = useState('');

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
                        disabledBefore={dateTerminatedAllowedFrom}
                        disabledAfter={dateTerminatedAllowedTo}
                        error={errors.dateTerminated}
                        errorMessage={errorMessages.dateTerminated}
                        readOnly={dateTerminatedAllowedFrom == dateTerminatedAllowedTo}
                    />
                    {participantProject.participationsDefinitive != 0 ? (
                        <ViewText
                            label={'Datum laatste terugbetaling wordt'}
                            value={
                                dateEntryLastMutation && dateTerminated
                                    ? moment(dateTerminated)
                                          .add(1, 'day')
                                          .format('DD-MM-Y')
                                    : ''
                            }
                        />
                    ) : (
                        <ViewText
                            label={'Datum laatste mutatie inleg/opname was'}
                            value={dateEntryLastMutation ? moment(dateEntryLastMutation).format('DD-MM-Y') : ''}
                        />
                    )}
                </div>
                {/*{projectTypeCodeRef === 'postalcode_link_capital' ? (*/}
                {/*    <div className="row">*/}
                {/*        <InputToggle*/}
                {/*            label={'Na beëindigen maken eindafrekening voor teruggave EB'}*/}
                {/*            name={'redirectRevenueSplit'}*/}
                {/*            onChangeAction={onChangeRedirectRevenueSplit}*/}
                {/*            value={redirectRevenueSplit}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*) : null}*/}
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
