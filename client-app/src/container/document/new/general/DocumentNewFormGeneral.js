import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import InputToggle from '../../../../components/form/InputToggle';

const DocumentNewFormProjectGeneral = ({
    document,
    errors,
    contacts = [],
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
    documentTypes,
    administrations,
}) => {
    const {
        administrationId,
        contactId,
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
        administrationId === '' &&
        contactId === '' &&
        contactGroupId === '' &&
        intakeId === '' &&
        opportunityId === '' &&
        taskId === '' &&
        quotationRequestId === '' &&
        housingFileId === '' &&
        projectId === '' &&
        participantId === '' &&
        orderId === '';

    return (
        <div className={'margin-30-bottom'}>
            <div className="row">
                <InputSelect
                    label="Contact"
                    name={'contactId'}
                    value={contactId}
                    options={contacts}
                    optionName={'fullName'}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
                <InputText label="Type" name={'documentTypeName'} value={documentTypeName} readOnly={true} />
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
                />
                <InputSelect
                    label="Intake"
                    name={'intakeId'}
                    value={intakeId}
                    options={intakes}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
            </div>
            <div className="row">
                <InputSelect
                    label="Kans"
                    name={'opportunityId'}
                    value={opportunityId}
                    options={opportunities}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
                <InputSelect
                    label="Taak"
                    name={'taskId'}
                    value={taskId}
                    options={tasks}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
            </div>
            <div className="row">
                <InputSelect
                    label="Offerteverzoek"
                    name={'quotationRequestId'}
                    value={quotationRequestId}
                    options={quotationRequests}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
                <InputSelect
                    label="Woningdossier"
                    name={'housingFileId'}
                    value={housingFileId}
                    options={housingFiles}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
            </div>

            <div className="row">
                <InputSelect
                    label="Project"
                    name={'projectId'}
                    value={projectId}
                    options={projects}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
                />
                <InputSelect
                    label="Deelnemer project"
                    name={'participantId'}
                    value={participantId}
                    options={participants}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && 'required'}
                    error={errors.docLinkedAtAny}
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
                />
                <InputSelect
                    label="Campagne"
                    name={'campaignId'}
                    value={campaignId}
                    options={campaigns}
                    onChangeAction={handleInputChange}
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
                            <label className="col-sm-12">Omschrijving</label>
                        </div>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className="form-control input-sm"
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
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

export default connect(mapStateToProps, null)(DocumentNewFormProjectGeneral);
