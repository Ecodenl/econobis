import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import InputToggle from '../../../../components/form/InputToggle';
import AsyncSelectSet from '../../../../components/form/AsyncSelectSet';
import ContactsAPI from '../../../../api/contact/ContactsAPI';

const DocumentNewFormGeneral = ({
    document,
    errors,
    errorMessage,
    contactGroups = [],
    intakes = [],
    opportunities = [],
    tasks = [],
    quotationRequests = [],
    housingFiles = [],
    projects = [],
    participants = [],
    orders = [],
    measures = [],
    campaigns = [],
    handleInputChange,
    handleProjectChange,
    documentTypes,
    administrations,
    handleInputChangeContactId,
    searchTermContact,
    isLoadingContact,
    setSearchTermContact,
    setLoadingContact,
}) => {
    const {
        documentCreatedFrom,
        administrationId,
        contactId,
        selectedContact,
        contactGroupId,
        intakeId,
        opportunityId,
        documentType,
        description,
        taskId,
        quotationRequestId,
        housingFileId,
        projectId,
        participantId,
        orderId,
        measureId,
        campaignId,
        showOnPortal,
    } = document;
    const documentTypeName = documentTypes.find(item => {
        return item.id == documentType;
    }).name;
    const oneOfFieldRequired =
        contactId === '' &&
        contactGroupId === '' &&
        // intakeId === '' &&            // intake hoort minimaal bij een contact
        // opportunityId === '' &&       // opportunity hoort minimaal bij een contact
        taskId === '' &&
        // quotationRequestId === '' &&  // quotationRequest hoort minimaal bij een contact
        // housingFileId === '' &&       // housingFile hoort minimaal bij een contact
        projectId === '' &&
        participantId === '' && // participant hoort minimaal bij een project
        orderId === '' &&
        administrationId === '' &&
        measureId === '' &&
        campaignId === '';

    const getContactOptions = async () => {
        if (searchTermContact.length <= 1) return;

        setLoadingContact(true);

        try {
            const results = await ContactsAPI.fetchContactSearch(searchTermContact);
            setLoadingContact(false);
            return results.data.data;
        } catch (error) {
            setLoadingContact(false);
            // console.log(error);
        }
    };

    const handleInputSearchChange = value => {
        setSearchTermContact(value);
    };

    return (
        <div className={'margin-30-bottom'}>
            {errors.docLinkedAtAny && (
                <div className="row">
                    <div className="col-sm-12">
                        <span className="has-error-message"> {errorMessage.docLinkedAtAny}</span>
                    </div>
                </div>
            )}
            <div className="row">
                {/*<InputSelect*/}
                {/*    label="Contact"*/}
                {/*    name={'contactId'}*/}
                {/*    value={contactId}*/}
                {/*    options={contacts}*/}
                {/*    optionName={'fullName'}*/}
                {/*    onChangeAction={handleInputChange}*/}
                {/*    required={oneOfFieldRequired && 'required'}*/}
                {/*    error={errors.docLinkedAtAny}*/}
                {/*/>*/}
                <InputText label="Type" name={'documentTypeName'} value={documentTypeName} readOnly={true} />
            </div>
            {documentCreatedFrom.codeRef === 'emailattachment' ? (
                <div className="row">
                    <AsyncSelectSet
                        label={'Contacten uit email'}
                        name={'contactIdEmail'}
                        id={'contactIdEmail'}
                        size={'col-sm-6'}
                        loadOptions={getContactOptions}
                        optionName={'fullName'}
                        value={selectedContact}
                        onChangeAction={handleInputChangeContactId}
                        required={'required'}
                        error={errors.docLinkedAtAny}
                        isLoading={isLoadingContact}
                        handleInputChange={handleInputSearchChange}
                        multi={false}
                    />
                </div>
            ) : null}
            <div className="row">
                <AsyncSelectSet
                    label={'Contact'}
                    name={'contactId'}
                    id={'contactId'}
                    size={'col-sm-6'}
                    loadOptions={getContactOptions}
                    optionName={'fullName'}
                    value={selectedContact}
                    onChangeAction={handleInputChangeContactId}
                    required={'required'}
                    error={errors.docLinkedAtAny}
                    isLoading={isLoadingContact}
                    handleInputChange={handleInputSearchChange}
                    multi={false}
                    disabled={[
                        'contact',
                        'intake',
                        'opportunity',
                        'quotationrequest',
                        'housingfile',
                        'participant',
                    ].includes(documentCreatedFrom.codeRef)}
                />
            </div>
            <div className="row">
                <InputSelect
                    label="Groep"
                    name={'contactGroupId'}
                    value={contactGroupId}
                    options={contactGroups}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                    readOnly={['contactgroup'].includes(documentCreatedFrom.codeRef)}
                />
                <InputSelect
                    label="Intake"
                    name={'intakeId'}
                    value={intakeId}
                    options={intakes}
                    onChangeAction={handleInputChange}
                    readOnly={['intake', 'quotationrequest', 'opportunity'].includes(documentCreatedFrom.codeRef)}
                    // required={oneOfFieldRequired && 'required'}
                    // error={errors.docLinkedAtAny}
                />
            </div>
            <div className="row">
                <InputSelect
                    label="Kans"
                    name={'opportunityId'}
                    value={opportunityId}
                    options={opportunities}
                    onChangeAction={handleInputChange}
                    readOnly={['opportunity', 'quotationrequest'].includes(documentCreatedFrom.codeRef)}
                    // required={oneOfFieldRequired && 'required'}
                    // error={errors.docLinkedAtAny}
                />
                <InputSelect
                    label="Taak"
                    name={'taskId'}
                    value={taskId}
                    options={tasks}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                    readOnly={['task'].includes(documentCreatedFrom.codeRef)}
                />
            </div>
            <div className="row">
                <InputSelect
                    label="Kansactie"
                    name={'quotationRequestId'}
                    value={quotationRequestId}
                    options={quotationRequests}
                    onChangeAction={handleInputChange}
                    readOnly={['quotationrequest'].includes(documentCreatedFrom.codeRef)}
                    // required={oneOfFieldRequired && 'required'}
                    // error={errors.docLinkedAtAny}
                />
                <InputSelect
                    label="Woningdossier"
                    name={'housingFileId'}
                    value={housingFileId}
                    options={housingFiles}
                    onChangeAction={handleInputChange}
                    readOnly={['housingfile'].includes(documentCreatedFrom.codeRef)}
                    // required={oneOfFieldRequired && 'required'}
                    // error={errors.docLinkedAtAny}
                />
            </div>

            <div className="row">
                <InputSelect
                    label="Project"
                    name={'projectId'}
                    value={projectId}
                    options={projects}
                    onChangeAction={handleProjectChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
                <InputSelect
                    label="Deelnemer project"
                    name={'participantId'}
                    value={participantId}
                    options={projectId ? participants : []}
                    placeholder={projectId ? '' : 'Kies eerst een project'}
                    onChangeAction={handleInputChange}
                    // required={oneOfFieldRequired && 'required'}
                    // error={errors.docLinkedAtAny}
                />
            </div>

            <div className="row">
                <InputSelect
                    label="Order"
                    name={'orderId'}
                    value={orderId}
                    options={orders}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                    readOnly={['order'].includes(documentCreatedFrom.codeRef)}
                />
                <InputSelect
                    label="Administratie"
                    name={'administrationId'}
                    value={administrationId}
                    options={administrations}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
            </div>

            <div className="row">
                <InputSelect
                    label="Maatregel"
                    name={'measureId'}
                    value={measureId}
                    options={measures}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                    readOnly={['measure'].includes(documentCreatedFrom.codeRef)}
                />
                <InputSelect
                    label="Campagne"
                    name={'campaignId'}
                    value={campaignId}
                    options={campaigns}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                    readOnly={['campaign', 'quotationrequest'].includes(documentCreatedFrom.codeRef)}
                />
            </div>

            <div className="row">
                <InputToggle
                    label="Tonen op portal"
                    name={'showOnPortal'}
                    value={showOnPortal}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12 required">Omschrijving</label>
                        </div>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={'form-control input-sm ' + (errors && errors.description ? 'has-error' : '')}
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
                        {errors.description && (
                            <div className="col-sm-3">
                                <span className="has-error-message"> {errorMessage.description}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentTypes: state.systemData.documentTypes,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps, null)(DocumentNewFormGeneral);
