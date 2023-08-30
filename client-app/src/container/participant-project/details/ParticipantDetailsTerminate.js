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
    projectRevenueCategories,
}) => {
    const [dateTerminated, setDateTerminated] = useState(
        participantProject.participationsDefinitive == 0 && participantProject.amountDefinitive == 0
            ? moment(participantProject.dateEntryLastMutation)
                  .subtract(1, 'days')
                  .format('Y-MM-DD')
            : moment(participantProject.dateTerminatedAllowedFrom).format('Y-MM-DD')
    );
    const [dateTerminatedAllowedFrom, setDateTerminatedAllowedFrom] = useState(
        participantProject.participationsDefinitive == 0 && participantProject.amountDefinitive == 0
            ? moment(participantProject.dateEntryLastMutation)
                  .subtract(1, 'days')
                  .format('Y-MM-DD')
            : moment(participantProject.dateTerminatedAllowedFrom).format('Y-MM-DD')
    );
    const [dateTerminatedAllowedTo, setDateTerminatedAllowedTo] = useState(
        participantProject.participationsDefinitive == 0 && participantProject.amountDefinitive == 0
            ? moment(participantProject.dateEntryLastMutation)
                  .subtract(1, 'days')
                  .format('Y-MM-DD')
            : moment()
                  .add(1, 'years')
                  .format('Y-MM-DD')
    );

    const [payoutPercentageTerminated, setPayoutPercentageTerminated] = useState(0);
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

    const onChangePayoutPercentageTerminated = event => {
        const value = event.target.value;
        setPayoutPercentageTerminated(value);
    };

    const onChangeRedirectRevenueSplit = event => {
        const value = event.target.checked;
        setRedirectRevenueSplit(value);
    };

    const revenueKwhSplitCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueKwhSplit'
    ).id;

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
                payoutPercentageTerminated,
            })
                .then(payload => {
                    fetchParticipantProjectDetails(participantProject.id);
                    closeDeleteItemModal();
                    if (projectTypeCodeRef === 'postalcode_link_capital' && redirectRevenueSplit) {
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
                        // readOnly={participantProject.participationsDefinitive == 0  && participantProject.amountDefinitive == 0}
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
                <p className={'has-error-message'}>
                    LET OP: zodra een deelname beëindigd is zal deze NOOIT meer in nieuw aangemaakte opbrengst
                    verdelingen voorkomen, ook niet als je een nieuwe opbrengst verdeling aanmaakt op de datum voor de
                    beëindiging.
                </p>
            </Modal>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: participantProjectId => {
        dispatch(fetchParticipantProjectDetails(participantProjectId));
    },
});
const mapStateToProps = state => {
    return {
        projectRevenueCategories: state.systemData.projectRevenueCategories,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantDetailsTerminate);
