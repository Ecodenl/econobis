import React from 'react';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputText from '../../../components/form/InputText';
import InputDate from '../../../components/form/InputDate';

const ParticipantNewForm = ({
    participation,
    errors,
    handleInputChange,
    handleInputChangeDate,
    handleSubmit,
    contacts,
    projects,
    participantMutationStatuses,
}) => {
    const {
        contactId,
        statusId,
        projectId,
        quantityInterest,
        dateInterest,
        quantityOption,
        dateOption,
        quantityGranted,
        dateGranted,
        quantityFinal,
        dateContractRetour,
        datePayment,
        dateEntry,
    } = participation;
    const status = participantMutationStatuses.find(
        participantMutationStatuses => participantMutationStatuses.id == statusId
    );
    const statusCodeRef = status ? status.codeRef : null;

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                <InputSelect
                    label={'Contact'}
                    name={'contactId'}
                    id={'contactId'}
                    options={contacts}
                    optionName={'fullName'}
                    value={contactId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.contactId}
                />
                <InputSelect
                    label={'Status'}
                    name={'statusId'}
                    id={'statusId'}
                    options={participantMutationStatuses}
                    value={statusId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.statusId}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Project'}
                    name={'projectId'}
                    id={'projectId'}
                    options={projects}
                    value={projectId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.projectId}
                />
            </div>

            {statusCodeRef === 'interest' ? (
                <div className="row">
                    <InputText
                        label={'Aantal interesse'}
                        name={'quantityInterest'}
                        id={'quantityInterest'}
                        value={quantityInterest}
                        onChangeAction={handleInputChange}
                    />

                    <InputDate
                        label={'Interesse datum'}
                        name={'dateInterest'}
                        id={'dateInterest'}
                        value={dateInterest}
                        onChangeAction={handleInputChangeDate}
                    />
                </div>
            ) : null}

            {statusCodeRef === 'option' ? (
                <div className="row">
                    <InputText
                        label={'Aantal optie'}
                        name={'quantityOption'}
                        id={'quantityOption'}
                        value={quantityOption}
                        onChangeAction={handleInputChange}
                        required={'required'}
                        error={errors.quantityOption}
                    />

                    <InputDate
                        label={'Optiedatum'}
                        name={'dateOption'}
                        id={'dateOption'}
                        value={dateOption}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateOption}
                    />
                </div>
            ) : null}

            {statusCodeRef === 'granted' ? (
                <div className="row">
                    <InputText
                        label={'Aantal toegekend'}
                        name={'quantityGranted'}
                        id={'quantityGranted'}
                        value={quantityGranted}
                        onChangeAction={handleInputChange}
                        required={'required'}
                        error={errors.quantityGranted}
                    />
                    <InputDate
                        label={'Toewijzingsdatum'}
                        name={'dateGranted'}
                        id={'dateGranted'}
                        value={dateGranted}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateGranted}
                    />
                </div>
            ) : null}

            {statusCodeRef === 'final' ? (
                <React.Fragment>
                    <div className="row">
                        <InputText
                            label={'Aantal definitief'}
                            name={'quantityFinal'}
                            id={'quantityFinal'}
                            value={quantityFinal}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityFinal}
                        />
                        <InputDate
                            label={'Toewijzingsdatum'}
                            name={'dateGranted'}
                            id={'dateGranted'}
                            value={dateGranted}
                            onChangeAction={handleInputChangeDate}
                            required={'required'}
                            error={errors.dateGranted}
                        />
                    </div>
                    <div className="row">
                        <InputDate
                            label={'Contract retour'}
                            name={'dateContractRetour'}
                            id={'dateContractRetour'}
                            value={dateContractRetour}
                            onChangeAction={handleInputChangeDate}
                            required={'required'}
                            error={errors.dateContractRetour}
                        />
                        <InputDate
                            label={'Betaaldatum'}
                            name={'datePayment'}
                            id={'datePayment'}
                            value={datePayment}
                            onChangeAction={handleInputChangeDate}
                            required={'required'}
                            error={errors.datePayment}
                        />
                    </div>
                    <div className="row">
                        <InputDate
                            label={'Ingangsdatum'}
                            name={'dateEntry'}
                            id={'dateEntry'}
                            value={dateEntry}
                            onChangeAction={handleInputChangeDate}
                            required={'required'}
                            error={errors.dateEntry}
                        />
                    </div>
                </React.Fragment>
            ) : null}

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                </div>
            </PanelFooter>
        </form>
    );
};

export default ParticipantNewForm;
