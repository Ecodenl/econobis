import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import { updateDocument } from '../../../../actions/document/DocumentDetailsActions';
import DocumentDetailsAPI from '../../../../api/document/DocumentDetailsAPI';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import IntakesAPI from '../../../../api/intake/IntakesAPI';
import OpportunitiesAPI from '../../../../api/opportunity/OpportunitiesAPI';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import TasksAPI from '../../../../api/task/TasksAPI';
import HousingFileAPI from '../../../../api/housing-file/HousingFilesAPI';
import MeasureAPI from '../../../../api/measure/MeasureAPI';
import CampaignAPI from '../../../../api/campaign/CampaignsAPI';
import QuotationRequestsAPI from '../../../../api/quotation-request/QuotationRequestsAPI';
import ParticipantsProjectAPI from '../../../../api/participant-project/ParticipantsProjectAPI';
import ProjectsAPI from '../../../../api/project/ProjectsAPI';
import OrdersAPI from '../../../../api/order/OrdersAPI';
import InputToggle from '../../../../components/form/InputToggle';
import AsyncSelectSet from '../../../../components/form/AsyncSelectSet';

class DocumentDetailsFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            administrationId,
            orderId,
            projectId,
            participantId,
            contactId,
            contact,
            contactGroupId,
            intakeId,
            opportunityId,
            campaignId,
            housingFileId,
            quotationRequestId,
            measureId,
            taskId,
            documentType,
            documentCreatedFrom,
            description,
            freeText1,
            freeText2,
            documentGroup,
            template,
            filename,
            showOnPortal,
        } = props.documentDetails;

        this.state = {
            contacts: [],
            contactGroups: [],
            intakes: [],
            opportunities: [],
            campaigns: [],
            housingFiles: [],
            quotationRequests: [],
            measures: [],
            tasks: [],
            participants: [],
            projects: [],
            orders: [],
            administrations: [],
            document: {
                id: id,
                administrationId: administrationId || '',
                contactId: contactId || '',
                selectedContact: contact
                    ? {
                          id: contact.id,
                          fullName: contact.fullName + ' (' + contact.number + ')',
                          primaryAddressId: contact.primaryAddressId,
                      }
                    : null,
                contactGroupId: contactGroupId || '',
                intakeId: intakeId || '',
                opportunityId: opportunityId || '',
                campaignId: campaignId || '',
                housingFileId: housingFileId || '',
                quotationRequestId: quotationRequestId || '',
                measureId: measureId || '',
                taskId: taskId || '',
                projectId: projectId || '',
                participantId: participantId || '',
                orderId: orderId || '',
                documentType: documentType && documentType.id,
                documentCreatedFrom: documentCreatedFrom && documentCreatedFrom.id,
                description: description,
                freeText1: freeText1,
                freeText2: freeText2,
                documentGroup: documentGroup && documentGroup.id,
                template: template && template.id,
                showOnPortal: showOnPortal,
            },
            errors: {
                docLinkedAtAny: false,
                description: false,
            },
            errorMessage: {
                docLinkedAtAny: '',
                description: '',
            },
            searchTermContact: '',
            isLoadingContact: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setSearchTermContact(searchTermContact) {
        this.setState({
            ...this.state,
            searchTermContact: searchTermContact,
        });
    }
    setLoadingContact(isLoadingContact) {
        this.setState({
            ...this.state,
            isLoadingContact: isLoadingContact,
        });
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({ contacts: payload });
        });

        IntakesAPI.peekIntakes().then(payload => {
            this.setState({ intakes: payload });
        });

        ContactGroupAPI.peekContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });

        OpportunitiesAPI.peekOpportunities().then(payload => {
            this.setState({ opportunities: payload });
        });

        CampaignAPI.peekCampaigns().then(payload => {
            this.setState({ campaigns: payload });
        });

        HousingFileAPI.peekHousingFiles().then(payload => {
            this.setState({ housingFiles: payload });
        });

        QuotationRequestsAPI.peekQuotationRequests().then(payload => {
            this.setState({ quotationRequests: payload });
        });

        TasksAPI.peekTasks().then(payload => {
            this.setState({ tasks: payload });
        });

        MeasureAPI.peekMeasures().then(payload => {
            this.setState({ measures: payload });
        });

        ProjectsAPI.peekProjects().then(payload => {
            this.setState({ projects: payload });
        });

        this.setParticipants(this.props.documentDetails.projectId);

        OrdersAPI.peekOrders().then(payload => {
            this.setState({ orders: payload });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                [name]: value,
            },
        });
    }

    handleInputChangeContactId = selectedOption => {
        console.log(selectedOption);

        const selectedContactId = selectedOption ? selectedOption.id : null;
        if (selectedContactId) {
            this.setState({
                ...this.state,
                document: {
                    ...this.state.document,
                    contactId: selectedContactId,
                    selectedContact: selectedOption,
                },
            });
        }
    };

    handleProjectChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                [name]: value,
            },
        });
        this.setParticipants(value);
    }

    setParticipants(value) {
        ParticipantsProjectAPI.peekParticipantsProjects().then(payload => {
            let participants = [];

            payload.forEach(function(participant) {
                if (participant.projectId == value) {
                    participants.push({ id: participant.id, name: participant.name, projectId: participant.projectId });
                }
            });

            this.setState({
                participants: participants,
            });
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { document } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (
            validator.isEmpty(document.contactId + '') &&
            validator.isEmpty(document.contactGroupId + '') &&
            // validator.isEmpty(document.intakeId + '') &&            // intake hoort minimaal bij een contact
            // validator.isEmpty(document.opportunityId + '') &&       // opportunity hoort minimaal bij een contact
            validator.isEmpty(document.taskId + '') &&
            // validator.isEmpty(document.quotationRequestId + '') &&  // quotationRequest hoort minimaal bij een contact
            // validator.isEmpty(document.housingFileId + '') &&       // housingFile hoort minimaal bij een contact
            validator.isEmpty(document.projectId + '') &&
            validator.isEmpty(document.participantId + '') && // participant hoort minimaal bij een project
            validator.isEmpty(document.orderId + '') &&
            validator.isEmpty(document.administrationId + '') &&
            validator.isEmpty(document.measureId + '') &&
            validator.isEmpty(document.campaignId + '')
        ) {
            errors.docLinkedAtAny = true;
            errorMessage.docLinkedAtAny =
                'Minimaal 1 van de volgende gegevens moet geselecteerd zijn: Contact, Groep, Taak, Project, Deelnemer, Order, Administratie, Maatregel of Campagne.';
            hasErrors = true;
        }

        if (validator.isEmpty(document.description + '')) {
            errors.description = true;
            errorMessage.description = 'Verplicht';
            hasErrors = true;
        }

        if (
            !validator.isEmpty(document.participantId + '') &&
            !validator.isEmpty(document.projectId + '') &&
            !validator.isEmpty(document.contactId + '') &&
            validator.isEmpty(document.contactGroupId + '') &&
            validator.isEmpty(document.intakeId + '') &&
            validator.isEmpty(document.opportunityId + '') &&
            validator.isEmpty(document.taskId + '') &&
            validator.isEmpty(document.quotationRequestId + '') &&
            validator.isEmpty(document.housingFileId + '') &&
            validator.isEmpty(document.orderId + '') &&
            validator.isEmpty(document.administrationId + '') &&
            validator.isEmpty(document.measureId + '') &&
            validator.isEmpty(document.campaignId + '')
        ) {
            document.documentCreatedFrom = 'participant';
        } else if (
            !validator.isEmpty(document.projectId + '') &&
            validator.isEmpty(document.participantId + '') &&
            validator.isEmpty(document.contactId + '') &&
            validator.isEmpty(document.contactGroupId + '') &&
            validator.isEmpty(document.intakeId + '') &&
            validator.isEmpty(document.opportunityId + '') &&
            validator.isEmpty(document.taskId + '') &&
            validator.isEmpty(document.quotationRequestId + '') &&
            validator.isEmpty(document.housingFileId + '') &&
            validator.isEmpty(document.orderId + '') &&
            validator.isEmpty(document.administrationId + '') &&
            validator.isEmpty(document.measureId + '') &&
            validator.isEmpty(document.campaignId + '') &&
            document.documentGroup != 'revenue'
        ) {
            document.documentCreatedFrom = 'project';
        } else if (
            !validator.isEmpty(document.administrationId + '') &&
            validator.isEmpty(document.projectId + '') &&
            validator.isEmpty(document.participantId + '') &&
            validator.isEmpty(document.contactId + '') &&
            validator.isEmpty(document.contactGroupId + '') &&
            validator.isEmpty(document.intakeId + '') &&
            validator.isEmpty(document.opportunityId + '') &&
            validator.isEmpty(document.taskId + '') &&
            validator.isEmpty(document.quotationRequestId + '') &&
            validator.isEmpty(document.housingFileId + '') &&
            validator.isEmpty(document.orderId + '') &&
            validator.isEmpty(document.measureId + '') &&
            validator.isEmpty(document.campaignId + '') &&
            document.documentGroup != 'revenue'
        ) {
            document.documentCreatedFrom = 'administration';
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        !hasErrors &&
            DocumentDetailsAPI.updateDocument(document).then(payload => {
                this.props.updateDocument(payload.data.data);

                this.props.switchToView();
            });
    };

    render() {
        const {
            document,
            errors,
            errorMessage,
            orders,
            contacts,
            contactGroups,
            intakes,
            opportunities,
            campaigns,
            housingFiles,
            quotationRequests,
            measures,
            tasks,
            projects,
            participants,
        } = this.state;
        const {
            administrationId,
            orderId,
            contactId,
            selectedContact,
            contactGroupId,
            intakeId,
            opportunityId,
            campaignId,
            housingFileId,
            quotationRequestId,
            measureId,
            taskId,
            documentType,
            description,
            freeText1,
            freeText2,
            participantId,
            projectId,
            showOnPortal,
        } = document;

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
            if (this.state.searchTermContact.length <= 1) return;

            this.setLoadingContact(true);

            try {
                const results = await ContactsAPI.fetchContactSearch(this.state.searchTermContact);
                this.setLoadingContact(false);
                return results.data.data;
            } catch (error) {
                this.setLoadingContact(false);
                // console.log(error);
            }
        };

        const handleInputSearchChange = value => {
            this.setSearchTermContact(value);
        };

        return (
            <div>
                <div>
                    {errors.docLinkedAtAny && (
                        <div className="row">
                            <div className="col-sm-12">
                                <span className="has-error-message"> {errorMessage.docLinkedAtAny}</span>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <InputText
                            label="Type"
                            name={'documentType'}
                            value={
                                this.props.documentDetails.documentType && this.props.documentDetails.documentType.name
                            }
                            readOnly={true}
                        />
                    </div>
                    <div className="row">
                        <div className="row">
                            <AsyncSelectSet
                                label={'Contact'}
                                name={'contactId'}
                                id={'contactId'}
                                loadOptions={getContactOptions}
                                optionName={'fullName'}
                                value={selectedContact}
                                onChangeAction={this.handleInputChangeContactId}
                                required={'required'}
                                error={errors.docLinkedAtAny}
                                isLoading={this.state.isLoadingContact}
                                handleInputChange={handleInputSearchChange}
                                multi={false}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <InputSelect
                            label="Groep"
                            name={'contactGroupId'}
                            value={contactGroupId}
                            options={contactGroups}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && 'required'}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Intake"
                            name={'intakeId'}
                            value={intakeId}
                            options={intakes}
                            onChangeAction={this.handleInputChange}
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
                            onChangeAction={this.handleInputChange}
                            // required={oneOfFieldRequired && 'required'}
                            // error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Taak"
                            name={'taskId'}
                            value={taskId}
                            options={tasks}
                            onChangeAction={this.handleInputChange}
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
                            onChangeAction={this.handleInputChange}
                            // required={oneOfFieldRequired && 'required'}
                            // error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Woningdossier"
                            name={'housingFileId'}
                            value={housingFileId}
                            options={housingFiles}
                            onChangeAction={this.handleInputChange}
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
                            onChangeAction={this.handleProjectChange}
                            required={oneOfFieldRequired && 'required'}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Deelnemer project"
                            name={'participantId'}
                            value={participantId}
                            options={projectId ? participants : []}
                            placeholder={projectId ? '' : 'Kies eerst een project'}
                            onChangeAction={this.handleInputChange}
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
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && 'required'}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Administratie"
                            name={'administrationId'}
                            value={administrationId}
                            options={this.props.administrations}
                            onChangeAction={this.handleInputChange}
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
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && 'required'}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Campagne"
                            name={'campaignId'}
                            value={campaignId}
                            options={campaigns}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && 'required'}
                            error={errors.docLinkedAtAny}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label="Tonen op portal"
                            name={'showOnPortal'}
                            value={showOnPortal}
                            onChangeAction={this.handleInputChange}
                            disabled={true}
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
                                        className={
                                            'form-control input-sm ' + (errors && errors.description ? 'has-error' : '')
                                        }
                                        name="description"
                                        value={description}
                                        onChange={this.handleInputChange}
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

                    {documentType === 'upload' ? (
                        <div className="row margin-30-top">
                            <InputText
                                label="Documentgroep"
                                name={'documentGroup'}
                                value={
                                    this.props.documentDetails.documentGroup &&
                                    this.props.documentDetails.documentGroup.name
                                }
                                readOnly={true}
                            />
                            <InputText
                                label="Bestandsnaam"
                                name={'filename'}
                                value={this.props.documentDetails.filename}
                                readOnly={true}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="row margin-30-top">
                                <InputText
                                    label="Documentgroep"
                                    name={'documentGroup'}
                                    value={
                                        this.props.documentDetails.documentGroup &&
                                        this.props.documentDetails.documentGroup.name
                                    }
                                    readOnly={true}
                                />
                                <InputText
                                    label="Template"
                                    name={'template'}
                                    value={
                                        this.props.documentDetails.template && this.props.documentDetails.template.name
                                    }
                                    readOnly={true}
                                />
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-sm-12">Tekst veld 1</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="freeText1"
                                                value={freeText1}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-sm-12">Tekst veld 2</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="freeText2"
                                                value={freeText2}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateDocument: document => {
        dispatch(updateDocument(document));
    },
});

const mapStateToProps = state => {
    return {
        documentDetails: state.documentDetails,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsFormEdit);
