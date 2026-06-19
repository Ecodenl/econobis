import React, { useState } from 'react';

import Modal from '../../../../../../components/modal/Modal';
import moment from 'moment';
import InputDate from '../../../../../../components/form/InputDate';
import validator from 'validator';
import ProjectRevenueAPI from '../../../../../../api/project//ProjectRevenueAPI';
import { fetchRevenue, getDistribution } from '../../../../../../actions/project/ProjectDetailsActions';
import { connect } from 'react-redux';

const RevenueFormSetConfirmModal = ({ revenue, setErrorModal, closeModalConfirm, fetchRevenue, getDistribution }) => {
    const [dateConfirmed, setDateConfirmed] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const [errors, setErrors] = useState({
        dateTerminated: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        dateTerminated: '',
    });

    const onChangeDateConfirmed = value => {
        setDateConfirmed(value);
    };

    const confirmAction = () => {
        let errors = {
            dateConfirmed: false,
        };
        let errorMessages = {
            dateConfirmed: '',
        };
        let hasErrors = false;

        if (!dateConfirmed || validator.isEmpty(dateConfirmed)) {
            errors.dateConfirmed = true;
            errorMessages.dateConfirmed = 'Ongeldige datum';
            hasErrors = true;
        }

        setErrors(errors);
        setErrorMessages(errorMessages);

        if (!hasErrors) {
            setIsSaving(true);

            ProjectRevenueAPI.updateProjectRevenueConfirm(revenue.id, { dateConfirmed })
                .then(payload => {
                    fetchRevenue(revenue.id);
                    setTimeout(() => {
                        getDistribution(revenue.id, 0);
                    }, 250);

                    closeModalConfirm();
                    setIsSaving(false);
                })
                .catch(error => {
                    // let errorObject = JSON.parse(JSON.stringify(error));
                    let errorMessage = 'Er is iets misgegaan bij definitief maken. Probeer het opnieuw.';
                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }
                    setErrorModal(errorMessage);
                    setIsSaving(false);
                });
        }
    };

    const projectTypeCodeRef = revenue?.project?.projectType?.codeRef ?? '';

    return (
        <Modal
            modalClassName={'modal-lg'}
            buttonConfirmText="Bevestigen"
            closeModal={closeModalConfirm}
            confirmAction={confirmAction}
            loading={isSaving}
            loadText="Bezig met verwerken"
            title="Bevestigen"
        >
            <p>
                Weet u zeker dat u deze {revenue.category.codeRef === 'redemptionEuro' ? 'aflossing' : 'opbrengst'}{' '}
                definitief wilt maken?
            </p>
            <div className="row">
                <InputDate
                    label={'Datum definitief'}
                    name={'dateConfirmed'}
                    value={dateConfirmed}
                    onChangeAction={onChangeDateConfirmed}
                    required={true}
                    error={errors.dateConfirmed}
                    errorMessage={errorMessages.dateConfirmed}
                />
            </div>

            <p>
                <span style={{ color: 'red' }}>Je kunt deze hierna niet meer aanpassen.</span>
            </p>
            {revenue.project.dateEntry !== null ? (
                <p>
                    <span style={{ color: 'red' }}>
                        Standaard ingangsdatum mutaties ({moment(revenue.project.dateEntry).format('DD-MM-YYYY')}) bij
                        dit project zal komen te vervallen.
                    </span>
                    <br />
                </p>
            ) : null}
            {(!revenue.payPercentage || revenue.payPercentage == 0) &&
            (!revenue.payAmount || revenue.payAmount == 0) &&
            (!revenue.revenue || revenue.revenue == 0) &&
            (!revenue.payPercentageValidFromKeyAmount || revenue.payPercentageValidFromKeyAmount == 0) ? (
                revenue.category.codeRef === 'redemptionEuro' ? (
                    <p>
                        <span style={{ color: 'red' }}>Aflossing is 0 !!</span>
                    </p>
                ) : projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                    <p>
                        <span style={{ color: 'red' }}>Uitkering (rente) is 0 !!</span>
                    </p>
                ) : projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <p>
                        <span style={{ color: 'red' }}>Resultaat is 0 !!</span>
                    </p>
                ) : null
            ) : null}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchRevenue: id => {
        dispatch(fetchRevenue(id));
    },
    getDistribution: (id, page) => {
        dispatch(getDistribution({ id, page }));
    },
});

const mapStateToProps = state => {
    return {
        revenue: state.projectRevenue,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenueFormSetConfirmModal);
