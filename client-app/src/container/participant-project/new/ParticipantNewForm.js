import React, { useState } from 'react';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputText from '../../../components/form/InputText';
import InputDate from '../../../components/form/InputDate';
import InputReactSelectLong from '../../../components/form/InputReactSelectLong';
import AsyncSelectSet from '../../../components/form/AsyncSelectSet';
import ContactsAPI from '../../../api/contact/ContactsAPI';

function ParticipantNewForm(props) {
    const [searchTermContact, setSearchTermContact] = useState('');
    const [isLoadingContact, setLoadingContact] = useState(false);

    let {
        participation,
        errors,
        handleInputChange,
        handleInputChangeDate,
        handleInputChangeContactId,
        handleInputChangeAddressId,
        handleInputChangeProjectId,
        handleSubmit,
        selectedContact,
        addresses,
        projects,
        participantMutationStatuses,
        projectTypeCodeRef,
        isSceProject,
        disableProjectSelection,
        disableClientSelection,
        isLoading,
    } = props;

    const {
        addressId,
        statusId,
        projectId,
        quantityInterest,
        amountInterest,
        dateInterest,
        quantityOption,
        amountOption,
        dateOption,
        quantityGranted,
        amountGranted,
        dateGranted,
        quantityFinal,
        amountFinal,
        dateContractRetour,
        datePayment,
        paymentReference,
        dateEntry,
        disableBeforeEntryDate,
    } = participation;
    const status = participantMutationStatuses?.find(
        participantMutationStatusItem => participantMutationStatusItem.id == statusId
    );
    const statusCodeRef = status ? status.codeRef : null;

    const getContactOptions = async () => {
        if (searchTermContact.length <= 1) return [];

        setLoadingContact(true);

        try {
            const results = await ContactsAPI.fetchContactSearch(searchTermContact);
            setLoadingContact(false);
            return results.data.data || [];
        } catch (error) {
            // console.log(error);
            return [];
        } finally {
            setLoadingContact(false);
        }
    };

    function handleInputSearchChange(value) {
        setSearchTermContact(value);
    }

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                <InputReactSelectLong
                    label={'Project'}
                    name={'projectId'}
                    id={'projectId'}
                    options={projects}
                    value={projectId ? Number(projectId) : null}
                    onChangeAction={handleInputChangeProjectId}
                    required={'required'}
                    error={errors.projectId}
                    errorMessage={errors.projectId ? 'Verplicht' : ''}
                    disabled={disableProjectSelection}
                />
            </div>

            <div className="row">
                <AsyncSelectSet
                    label={'Contact'}
                    name={'contactId'}
                    id={'contactId'}
                    loadOptions={getContactOptions}
                    optionName={'fullName'}
                    value={selectedContact}
                    onChangeAction={handleInputChangeContactId}
                    required={'required'}
                    error={errors.contactId}
                    errorMessage={errors.contactId ? 'Verplicht' : ''}
                    disabled={disableClientSelection}
                    isLoading={isLoadingContact}
                    handleInputChange={handleInputSearchChange}
                    multi={false}
                />
            </div>
            <div className="row">
                <InputReactSelectLong
                    label={'Adres'}
                    name={'addressId'}
                    id={'addressId'}
                    options={addresses}
                    optionName={'streetPostalCodeCity'}
                    value={addressId ? Number(addressId) : null}
                    onChangeAction={handleInputChangeAddressId}
                    required={'required'}
                    disabled={projectTypeCodeRef !== 'postalcode_link_capital' && !isSceProject}
                    error={errors.addressId}
                    errorMessage={
                        errors.addressId
                            ? 'Verplicht (indien geen adres beschikbaar, controleer adresgegevens bij contact)'
                            : ''
                    }
                />
            </div>
            <div className="row">
                <InputSelect
                    label={'Status'}
                    name={'statusId'}
                    id={'statusId'}
                    options={participantMutationStatuses}
                    value={statusId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.statusId}
                    errorMessage={errors.statusId ? 'Verplicht' : ''}
                />
            </div>
            {statusCodeRef === 'interest' ? (
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag interesse'}
                            name={'amountInterest'}
                            id={'amountInterest'}
                            value={amountInterest}
                            onChangeAction={handleInputChange}
                            error={errors.amountInterest}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal interesse'}
                            name={'quantityInterest'}
                            id={'quantityInterest'}
                            value={quantityInterest}
                            onChangeAction={handleInputChange}
                            error={errors.quantityInterest}
                        />
                    )}

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
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag inschrijving'}
                            name={'amountOption'}
                            id={'amountOption'}
                            value={amountOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountOption}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal inschrijving'}
                            name={'quantityOption'}
                            id={'quantityOption'}
                            value={quantityOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityOption}
                        />
                    )}

                    <InputDate
                        label={'Inschrijvingsdatum'}
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
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag toegekend'}
                            name={'amountGranted'}
                            id={'amountGranted'}
                            value={amountGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountGranted}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal toegekend'}
                            name={'quantityGranted'}
                            id={'quantityGranted'}
                            value={quantityGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityGranted}
                        />
                    )}

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
                        {projectTypeCodeRef === 'loan' ? (
                            <InputText
                                type={'number'}
                                label={'Bedrag definitief'}
                                name={'amountFinal'}
                                id={'amountFinal'}
                                value={amountFinal}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.amountFinal}
                            />
                        ) : (
                            <InputText
                                type={'number'}
                                label={'Aantal definitief'}
                                name={'quantityFinal'}
                                id={'quantityFinal'}
                                value={quantityFinal}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.quantityFinal}
                            />
                        )}
                        <InputDate
                            label={'Toewijzingsdatum'}
                            name={'dateGranted'}
                            id={'dateGranted'}
                            value={dateGranted}
                            onChangeAction={handleInputChangeDate}
                        />
                    </div>
                    <div className="row">
                        <InputDate
                            label={'Contract retour'}
                            name={'dateContractRetour'}
                            id={'dateContractRetour'}
                            value={dateContractRetour}
                            onChangeAction={handleInputChangeDate}
                        />
                        <InputDate
                            label={'Betaaldatum'}
                            name={'datePayment'}
                            id={'datePayment'}
                            value={datePayment}
                            onChangeAction={handleInputChangeDate}
                        />
                    </div>
                    <div className="row">
                        <InputDate
                            label={'Ingangsdatum'}
                            name={'dateEntry'}
                            id={'dateEntry'}
                            value={dateEntry}
                            onChangeAction={handleInputChangeDate}
                            disabledBefore={disableBeforeEntryDate}
                            required={'required'}
                            error={errors.dateEntry}
                        />
                        <InputText
                            label={'Betalingskenmerk'}
                            id={'paymentReference'}
                            name={'paymentReference'}
                            value={paymentReference}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                </React.Fragment>
            ) : null}
            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} loading={isLoading} />
                </div>
            </PanelFooter>
        </form>
    );
}

export default ParticipantNewForm;
