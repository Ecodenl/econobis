import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import DocumentNewForm from './DocumentNewForm';
import DocumentNewToolbar from './DocumentNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import { isEqual } from 'lodash';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import IntakesAPI from '../../../api/intake/IntakesAPI';
import OpportunitiesAPI from '../../../api/opportunity/OpportunitiesAPI';
import DocumentTemplateAPI from '../../../api/document-template/DocumentTemplateAPI';
import MeasureAPI from '../../../api/measure/MeasureAPI';
import TasksAPI from '../../../api/task/TasksAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import CampaignsAPI from '../../../api/campaign/CampaignsAPI';
import HousingFileAPI from '../../../api/housing-file/HousingFilesAPI';
import QuotationRequestsAPI from '../../../api/quotation-request/QuotationRequestsAPI';
import ProjectsAPI from '../../../api/project/ProjectsAPI';
import ParticipantsProjectAPI from '../../../api/participant-project/ParticipantsProjectAPI';
import OrdersAPI from '../../../api/order/OrdersAPI';
import EmailDetailsAPI from '../../../api/email/EmailAPI';
import QuotationRequestDetailsAPI from '../../../api/quotation-request/QuotationRequestDetailsAPI';
import DocumentNewFormProject from './DocumentNewFormProject';
import DocumentNewFormAdministration from './DocumentNewFormAdministration';
import DocumentNewFormParticipant from './DocumentNewFormParticipant';
import ContactDetailsAPI from '../../../api/contact/ContactDetailsAPI';

// Functionele wrapper voor de class component
const DocumentNewAppWrapper = props => {
    const navigate = useNavigate();
    return <DocumentNewApp {...props} navigate={navigate} />;
};

class DocumentNewApp extends Component {
    constructor(props) {
        super(props);

        let documentCreatedFromCodeRef = '';
        if (props.params.participantId) {
            documentCreatedFromCodeRef = 'participant';
        } else if (props.params.opportunityId) {
            documentCreatedFromCodeRef = 'opportunity';
        } else if (props.params.quotationRequestId) {
            documentCreatedFromCodeRef = 'quotationrequest';
        } else if (props.params.housingFileId) {
            documentCreatedFromCodeRef = 'housingfile';
        } else if (props.params.intakeId) {
            documentCreatedFromCodeRef = 'intake';
        } else if (props.params.measureId) {
            documentCreatedFromCodeRef = 'measure';
        } else if (props.params.administrationId) {
            documentCreatedFromCodeRef = 'administration';
        } else if (props.params.campaignId) {
            documentCreatedFromCodeRef = 'campaign';
        } else if (props.params.taskId) {
            documentCreatedFromCodeRef = 'task';
        } else if (props.params.projectId) {
            documentCreatedFromCodeRef = 'project';
        } else if (props.params.orderId) {
            documentCreatedFromCodeRef = 'order';
        } else if (props.params.contactGroupId) {
            documentCreatedFromCodeRef = 'contactgroup';
        } else if (props.params.contactId) {
            documentCreatedFromCodeRef = 'contact';
        } else if (props.params.emailAttachmentId) {
            documentCreatedFromCodeRef = 'emailattachment';
        } else {
            documentCreatedFromCodeRef = 'document';
        }

        const documentCreatedFrom = this.props.documentCreatedFroms.find(item => {
            return item.codeRef == documentCreatedFromCodeRef;
        });

        this.state = {
            contactsGroups: [],
            intakes: [],
            opportunities: [],
            templates: [],
            campaigns: [],
            housingFiles: [],
            quotationRequests: [],
            measures: [],
            tasks: [],
            participants: [],
            projects: [],
            orders: [],
            document: {
                administrationId: this.props.params.administrationId || '',
                contactId: this.props.params.contactId || '',
                selectedContact: null,
                contactGroupId: this.props.params.contactGroupId || '',
                intakeId: this.props.params.intakeId || '',
                opportunityId: this.props.params.opportunityId || '',
                campaignId: this.props.params.campaignId || '',
                housingFileId: this.props.params.housingFileId || '',
                quotationRequestId: this.props.params.quotationRequestId || '',
                measureId: this.props.params.measureId || '',
                taskId: this.props.params.taskId || '',
                projectId: this.props.params.projectId || '',
                participantId: this.props.params.participantId || '',
                orderId: this.props.params.orderId || '',
                documentCreatedFrom: documentCreatedFrom,
                documentType: this.props.params.type,
                description: '',
                documentGroup: '',
                templateId: '',
                allowChangeHtmlBody: false,
                htmlBody: '',
                initialHtmlBody: '',
                freeText1: '',
                freeText2: '',
                sentById: '',
                attachment: '',
                filename: 'temp',
                showOnPortal:
                    this.props.params.showOnPortal && this.props.params.showOnPortal === 'portal' ? true : false,
            },
            errors: {
                docLinkedAtAny: false,
                documentGroup: false,
                uploadFailed: false,
                templateId: false,
                noDocument: false,
                description: false,
            },
            errorMessage: {
                docLinkedAtAny: '',
                documentGroup: '',
                templateId: '',
                noDocument: '',
                description: '',
            },
            searchTermContact: '',
            isLoadingContact: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.handleDocumentGroupChange = this.handleDocumentGroupChange.bind(this);
        this.handleDocumentTemplateChange = this.handleDocumentTemplateChange.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.setSearchTermContact = this.setSearchTermContact.bind(this);
        this.setLoadingContact = this.setLoadingContact.bind(this);
    }

    componentDidMount() {
        if (this.props.params.contactId) {
            ContactDetailsAPI.getContactDetails(this.props.params.contactId).then(payload => {
                if (payload) {
                    this.setState({
                        ...this.state,
                        document: {
                            ...this.state.document,
                            selectedContact: {
                                id: payload.id,
                                fullName: payload.fullName + ' (' + payload.number + ')',
                                primaryAddressId: payload.primaryAddressId,
                            },
                        },
                    });
                }
            });
        }

        IntakesAPI.peekIntakes().then(payload => {
            this.setState({ intakes: payload });
        });

        ContactGroupAPI.peekContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });

        OpportunitiesAPI.peekOpportunities().then(payload => {
            this.setState({ opportunities: payload });
        });

        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
            this.setState({ templates: payload });
        });

        CampaignsAPI.peekCampaigns().then(payload => {
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

        OrdersAPI.peekOrders().then(payload => {
            this.setState({ orders: payload });
        });

        if (this.props.params.emailAttachmentId) {
            EmailDetailsAPI.downloadAttachment(this.props.params.emailAttachmentId).then(payload => {
                const file = [new File([payload.data], payload.headers['x-filename'])];
                file.name = payload.headers['x-filename'];
                this.setState({
                    ...this.state,
                    document: {
                        ...this.state.document,
                        attachment: file[0],
                        filename: payload.headers['x-filename'],
                        contactId: payload.headers['x-contactid'] ? payload.headers['x-contactid'] : '',
                    },
                });
            });
        }
        if (this.props.params.quotationRequestId) {
            QuotationRequestDetailsAPI.fetchQuotationRequestDetails(this.props.params.quotationRequestId)
                .then(payload => {
                    this.setState({
                        ...this.state,
                        document: {
                            ...this.state.document,
                            contactId: payload.opportunity.intake.contact.id,
                            intakeId: payload.opportunity.intake.id,
                            opportunityId: payload.opportunity.id,
                            measureId:
                                payload.opportunity.measures && payload.opportunity.measures.length == 1
                                    ? payload.opportunity.measures[0].id
                                    : '',
                            campaignId: payload.opportunity.intake.campaign.id,
                        },
                    });
                })
                .finally(() => this.callFetchContact());
        }
        if (this.props.params.projectId) {
            this.setParticipants(this.props.params.projectId);
        }
    }

    callFetchContact() {
        ContactDetailsAPI.getContactDetails(this.state.document.contactId).then(payload => {
            if (payload) {
                this.setState({
                    ...this.state,
                    document: {
                        ...this.state.document,
                        selectedContact: {
                            id: payload.id,
                            fullName: payload.fullName + ' (' + payload.number + ')',
                            primaryAddressId: payload.primaryAddressId,
                        },
                    },
                });
            }
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

    handleDocumentGroupChange(selectedOption) {
        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                documentGroup: selectedOption,
                templateId: '',
                allowChangeHtmlBody: false,
                htmlBody: '',
                initialHtmlBody: '',
            },
        });

        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
            let templates = [];

            payload.forEach(function(template) {
                if (template.group == selectedOption) {
                    templates.push({ id: template.id, name: template.name });
                }
            });

            this.setState({
                templates: templates,
            });
        });
    }

    handleDocumentTemplateChange(selectedOption) {
        DocumentTemplateAPI.fetchDocumentTemplate(selectedOption)
            .then(payload => {
                this.setState({
                    ...this.state,
                    document: {
                        ...this.state.document,
                        templateId: selectedOption,
                        allowChangeHtmlBody: payload.allowChangeHtmlBody,
                        htmlBody: payload.htmlBody ? payload.htmlBody : this.state.document.htmlBody,
                        initialHtmlBody: payload.htmlBody ? payload.htmlBody : this.state.document.htmlBody,
                    },
                });
            })
            .catch($error => {
                this.setState({
                    ...this.state,
                    document: {
                        ...this.state.document,
                        templateId: selectedOption,
                        allowChangeHtmlBody: false,
                        htmlBody: '',
                        initialHtmlBody: '',
                    },
                });
            });
    }

    handleTextChange(htmlBody) {
        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                htmlBody: htmlBody,
            },
        });
    }

    onDropAccepted(files) {
        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                attachment: files[0],
                filename: files[0].name,
            },
        });
    }

    onDropRejected() {
        this.setState({
            ...this.state,
            errors: {
                ...this.state.errors,
                uploadFailed: true,
            },
        });
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

    handleSubmit(event) {
        event.preventDefault();

        const {
            administrationId,
            contactId,
            contactGroupId,
            intakeId,
            opportunityId,
            documentCreatedFrom,
            documentType,
            description,
            documentGroup,
            templateId,
            htmlBody,
            freeText1,
            freeText2,
            filename,
            sentById,
            campaignId,
            housingFileId,
            quotationRequestId,
            measureId,
            taskId,
            projectId,
            participantId,
            orderId,
            attachment,
            showOnPortal,
        } = this.state.document;

        // Validation
        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (
            validator.isEmpty(contactId + '') &&
            validator.isEmpty(contactGroupId + '') &&
            // validator.isEmpty(intakeId + '') &&            // intake hoort minimaal bij een contact
            // validator.isEmpty(opportunityId + '') &&       // opportunity hoort minimaal bij een contact
            validator.isEmpty(taskId + '') &&
            // validator.isEmpty(quotationRequestId + '') &&  // quotationRequest hoort minimaal bij een contact
            // validator.isEmpty(housingFileId + '') &&       // housingFile hoort minimaal bij een contact
            validator.isEmpty(projectId + '') &&
            validator.isEmpty(participantId + '') && // participant hoort minimaal bij een project
            validator.isEmpty(orderId + '') &&
            validator.isEmpty(administrationId + '') &&
            validator.isEmpty(measureId + '') &&
            validator.isEmpty(campaignId + '')
        ) {
            errors.docLinkedAtAny = true;
            errorMessage.docLinkedAtAny =
                'Minimaal 1 van de volgende gegevens moet geselecteerd zijn: Contact, Groep, Taak, Project, Deelnemer, Order, Administratie, Maatregel of Campagne.';
            hasErrors = true;
        }

        if (validator.isEmpty(description + '')) {
            errors.description = true;
            errorMessage.description = 'Verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(documentGroup + '')) {
            errors.documentGroup = true;
            errorMessage.documentGroup = 'Verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(templateId + '') && documentType == 'internal') {
            errors.templateId = true;
            errorMessage.templateId = 'Verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(attachment + '') && documentType == 'upload') {
            errors.noDocument = true;
            errorMessage.noDocument = 'Verplicht';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        if (!hasErrors) {
            const data = new FormData();

            data.append('administrationId', administrationId);
            data.append('contactId', contactId);
            data.append('contactGroupId', contactGroupId);
            data.append('intakeId', intakeId);
            data.append('opportunityId', opportunityId);
            data.append('documentCreatedFromId', documentCreatedFrom.id);
            data.append('documentType', documentType);
            data.append('description', description);
            data.append('documentGroup', documentGroup);
            data.append('templateId', templateId);
            data.append('htmlBody', htmlBody);
            data.append('freeText1', freeText1);
            data.append('freeText2', freeText2);
            data.append('filename', filename);
            data.append('sentById', sentById);
            data.append('campaignId', campaignId);
            data.append('housingFileId', housingFileId);
            data.append('quotationRequestId', quotationRequestId);
            data.append('measureId', measureId);
            data.append('taskId', taskId);
            data.append('projectId', projectId);
            data.append('participantId', participantId);
            data.append('orderId', orderId);
            data.append('attachment', attachment);
            data.append('showOnPortal', showOnPortal);

            DocumentDetailsAPI.newDocument(data)
                .then(payload => {
                    if (payload.data.data.filename.toLowerCase().endsWith('.pdf')) {
                        this.props.navigate(`/document/inzien/${payload.data.data.id}`);
                    } else {
                        this.props.navigate(`/document/${payload.data.data.id}`);
                    }
                })
                .catch(error => {
                    this.props.setError(error.response.status);
                });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody className="panel-small">
                                <DocumentNewToolbar
                                    handleSubmit={this.handleSubmit}
                                    documentCreatedFromName={this.state.document.documentCreatedFrom.name}
                                />
                            </PanelBody>
                        </Panel>
                    </div>
                    <div className="col-md-12">
                        {this.state.document.documentCreatedFrom.codeRef === 'project' ? (
                            <DocumentNewFormProject
                                document={this.state.document}
                                templates={this.state.templates}
                                projects={this.state.projects}
                                errors={this.state.errors}
                                errorMessage={this.state.errorMessage}
                                handleSubmit={this.handleSubmit}
                                handleDocumentGroupChange={this.handleDocumentGroupChange}
                                handleInputChange={this.handleInputChange}
                                handleTextChange={this.handleTextChange}
                                handleDocumentTemplateChange={this.handleDocumentTemplateChange}
                                onDropAccepted={this.onDropAccepted}
                                onDropRejected={this.onDropRejected}
                            />
                        ) : this.state.document.documentCreatedFrom.codeRef === 'administration' ? (
                            <DocumentNewFormAdministration
                                document={this.state.document}
                                templates={this.state.templates}
                                errors={this.state.errors}
                                errorMessage={this.state.errorMessage}
                                handleSubmit={this.handleSubmit}
                                handleDocumentGroupChange={this.handleDocumentGroupChange}
                                handleInputChange={this.handleInputChange}
                                handleTextChange={this.handleTextChange}
                                handleDocumentTemplateChange={this.handleDocumentTemplateChange}
                                onDropAccepted={this.onDropAccepted}
                                onDropRejected={this.onDropRejected}
                            />
                        ) : this.state.document.documentCreatedFrom.codeRef === 'participant' ? (
                            <DocumentNewFormParticipant
                                document={this.state.document}
                                templates={this.state.templates}
                                projects={this.state.projects}
                                participants={this.state.participants}
                                errors={this.state.errors}
                                errorMessage={this.state.errorMessage}
                                handleSubmit={this.handleSubmit}
                                handleProjectChange={this.handleProjectChange}
                                handleDocumentGroupChange={this.handleDocumentGroupChange}
                                handleInputChange={this.handleInputChange}
                                handleTextChange={this.handleTextChange}
                                handleDocumentTemplateChange={this.handleDocumentTemplateChange}
                                onDropAccepted={this.onDropAccepted}
                                onDropRejected={this.onDropRejected}
                            />
                        ) : (
                            <DocumentNewForm
                                document={this.state.document}
                                contactGroups={this.state.contactGroups}
                                intakes={this.state.intakes}
                                opportunities={this.state.opportunities}
                                templates={this.state.templates}
                                tasks={this.state.tasks}
                                measures={this.state.measures}
                                quotationRequests={this.state.quotationRequests}
                                housingFiles={this.state.housingFiles}
                                campaigns={this.state.campaigns}
                                projects={this.state.projects}
                                participants={this.state.participants}
                                orders={this.state.orders}
                                errors={this.state.errors}
                                errorMessage={this.state.errorMessage}
                                handleSubmit={this.handleSubmit}
                                handleProjectChange={this.handleProjectChange}
                                handleDocumentGroupChange={this.handleDocumentGroupChange}
                                handleInputChange={this.handleInputChange}
                                handleTextChange={this.handleTextChange}
                                handleDocumentTemplateChange={this.handleDocumentTemplateChange}
                                onDropAccepted={this.onDropAccepted}
                                onDropRejected={this.onDropRejected}
                                handleInputChangeContactId={this.handleInputChangeContactId}
                                searchTermContact={this.state.searchTermContact}
                                isLoadingContact={this.state.isLoadingContact}
                                setSearchTermContact={this.setSearchTermContact}
                                setLoadingContact={this.setLoadingContact}
                            />
                        )}
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: http_code => {
        dispatch(setError(http_code));
    },
});

const mapStateToProps = state => {
    return {
        documentCreatedFroms: state.systemData.documentCreatedFroms,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentNewAppWrapper);
