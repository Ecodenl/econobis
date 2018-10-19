import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';

import DocumentNewForm from './DocumentNewForm';
import DocumentNewToolbar from './DocumentNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import {isEqual} from "lodash";
import ContactGroupAPI from "../../../api/contact-group/ContactGroupAPI";
import IntakesAPI from "../../../api/intake/IntakesAPI";
import OpportunitiesAPI from "../../../api/opportunity/OpportunitiesAPI";
import ContactsAPI from "../../../api/contact/ContactsAPI";
import DocumentTemplateAPI from "../../../api/document-template/DocumentTemplateAPI";
import MeasureAPI from "../../../api/measure/MeasureAPI";
import TasksAPI from "../../../api/task/TasksAPI";
import {setError} from "../../../actions/general/ErrorActions";
import {connect} from "react-redux";
import CampaignAPI from "../../../api/campaign/CampaignsAPI";
import HousingFileAPI from "../../../api/housing-file/HousingFilesAPI";
import QuotationRequestsAPI from "../../../api/quotation-request/QuotationRequestsAPI";
import ProductionProjectsAPI from "../../../api/production-project/ProductionProjectsAPI";
import ParticipantsProductionProjectAPI from "../../../api/participant-production-project/ParticipantsProductionProjectAPI";
import OrdersAPI from "../../../api/order/OrdersAPI";
import EmailDetailsAPI from "../../../api/email/EmailAPI";

class DocumentNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            contactsGroups: [],
            intakes: [],
            opportunities: [],
            templates: [],
            campaigns: [],
            housingFiles: [],
            quotationRequests: [],
            measures: [],
            tasks: [],
            productionProjects: [],
            participants: [],
            orders: [],
            document: {
                contactId: this.props.params.contactId || '',
                contactGroupId: this.props.params.contactGroupId || '',
                intakeId: this.props.params.intakeId || '',
                opportunityId: this.props.params.opportunityId || '',
                campaignId: this.props.params.campaignId || '',
                housingFileId: this.props.params.housingFileId || '',
                quotationRequestId: this.props.params.quotationRequestId || '',
                measureId: this.props.params.measureId || '',
                taskId: this.props.params.taskId || '',
                productionProjectId: this.props.params.productionProjectId || '',
                participantId: this.props.params.participantId || '',
                orderId: this.props.params.orderId || '',
                documentType: this.props.params.type,
                description: '',
                documentGroup: '',
                templateId: '',
                freeText1: '',
                freeText2: '',
                sentById: '',
                attachment: '',
                filename: 'temp'
            },
            errors: {
                docLinkedAtAny: false,
                documentGroup: false,
                uploadFailed: false,
                templateId: false,
                noDocument: false
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.handleDocumentGroupChange = this.handleDocumentGroupChange.bind(this);
    };

    componentDidMount() {
        ContactsAPI.getContactsPeek().then((payload) => {
            this.setState({ contacts: payload });
        });

        IntakesAPI.peekIntakes().then((payload) => {
            this.setState({ intakes: payload });
        });

        ContactGroupAPI.peekContactGroups().then((payload) => {
            this.setState({ contactGroups: payload });
        });

        OpportunitiesAPI.peekOpportunities().then((payload) => {
            this.setState({ opportunities: payload });
        });

        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then((payload) => {
            this.setState({ templates: payload });
        });

        CampaignAPI.peekCampaigns().then((payload) => {
            this.setState({ campaigns: payload });
        });

        HousingFileAPI.peekHousingFiles().then((payload) => {
            this.setState({ housingFiles: payload });
        });

        QuotationRequestsAPI.peekQuotationRequests().then((payload) => {
            this.setState({ quotationRequests: payload });
        });

        TasksAPI.peekTasks().then((payload) => {
            this.setState({ tasks: payload });
        });

        MeasureAPI.peekMeasures().then((payload) => {
            this.setState({ measures: payload });
        });

        ProductionProjectsAPI.peekProductionProjects().then((payload) => {
            this.setState({ productionProjects: payload });
        });

        ParticipantsProductionProjectAPI.peekParticipantsProductionProjects().then((payload) => {
            this.setState({ participants: payload });
        });

        OrdersAPI.peekOrders().then((payload) => {
            this.setState({ orders: payload });
        });

        if(this.props.params.emailAttachmentId){
            EmailDetailsAPI.downloadAttachment(this.props.params.emailAttachmentId).then((payload) => {
                const file = [new File([payload.data], payload.headers['x-filename'])];
                file.name =  payload.headers['x-filename'];
                this.setState({
                    ...this.state,
                    document: {
                        ...this.state.document,
                        attachment: file[0],
                        filename: payload.headers['x-filename'],
                        contactId: payload.headers['x-contactid'],
                    },
                });
            });
        }
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                [name]: value
            },
        });
    };

    handleDocumentGroupChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                [name]: value
            },
        });

        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then((payload) => {
            let templates = [];

            payload.forEach(function (template) {
                if (template.group == value) {
                    templates.push({id: template.id, name: template.name});
                }
            });

            this.setState({
                templates: templates,
            });
        });
    };

    onDropAccepted(files) {
        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                attachment: files[0],
                filename: files[0].name,
            },
        });
    };

    onDropRejected() {
        this.setState({
            ...this.state,
            errors: {
                ...this.state.errors,
                uploadFailed: true
            }
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const {
            contactId,
            contactGroupId,
            intakeId,
            opportunityId,
            documentType,
            description,
            documentGroup,
            templateId,
            freeText1,
            freeText2,
            filename,
            sentById,
            campaignId,
            housingFileId,
            quotationRequestId,
            measureId,
            taskId,
            productionProjectId,
            participantId,
            orderId,
            attachment
        } = this.state.document;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(contactId) && validator.isEmpty(contactGroupId) && validator.isEmpty(intakeId) && validator.isEmpty(opportunityId) && validator.isEmpty(housingFileId) && validator.isEmpty(quotationRequestId) && validator.isEmpty(productionProjectId) && validator.isEmpty(participantId) && validator.isEmpty(taskId) && validator.isEmpty(orderId)){
            errors.docLinkedAtAny = true;
            hasErrors = true;
        };

        if(validator.isEmpty(documentGroup)){
            errors.documentGroup = true;
            hasErrors = true;
        };

        if(validator.isEmpty(templateId) && documentType == 'internal'){
            errors.templateId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(attachment + '') && documentType == 'upload'){
            errors.noDocument = true;
            hasErrors = true;
        };



        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if(!hasErrors) {
            const data = new FormData();

            data.append('contactId', contactId);
            data.append('contactGroupId', contactGroupId);
            data.append('intakeId', intakeId);
            data.append('opportunityId', opportunityId);
            data.append('documentType', documentType);
            data.append('description', description);
            data.append('documentGroup', documentGroup);
            data.append('templateId', templateId);
            data.append('freeText1', freeText1);
            data.append('freeText2', freeText2);
            data.append('filename', filename);
            data.append('sentById', sentById);
            data.append('campaignId', campaignId);
            data.append('housingFileId', housingFileId);
            data.append('quotationRequestId', quotationRequestId);
            data.append('measureId', measureId);
            data.append('taskId', taskId);
            data.append('productionProjectId', productionProjectId);
            data.append('participantId', participantId);
            data.append('orderId', orderId);
            data.append('attachment', attachment);

            DocumentDetailsAPI.newDocument(data).then((payload) => {
                if(payload.data.data.filename.endsWith('.pdf')){
                    hashHistory.push(`/document/inzien/${payload.data.data.id}`);
                }else{
                    hashHistory.push(`/document/${payload.data.data.id}`);
                }

            }).catch(error => {
                this.props.setError(error.response.status);
            });
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody className="panel-small">
                                <DocumentNewToolbar handleSubmit={this.handleSubmit}/>
                            </PanelBody>
                        </Panel>
                    </div>
                    <div className="col-md-12">
                        <DocumentNewForm
                            document={this.state.document}
                            contacts={this.state.contacts}
                            contactGroups={this.state.contactGroups}
                            intakes={this.state.intakes}
                            opportunities={this.state.opportunities}
                            templates={this.state.templates}
                            tasks={this.state.tasks}
                            measures={this.state.measures}
                            quotationRequests={this.state.quotationRequests}
                            housingFiles={this.state.housingFiles}
                            campaigns={this.state.campaigns}
                            productionProjects={this.state.productionProjects}
                            participants={this.state.participants}
                            orders={this.state.orders}
                            errors={this.state.errors}
                            handleSubmit={this.handleSubmit}
                            handleDocumentGroupChange={this.handleDocumentGroupChange}
                            handleInputChange={this.handleInputChange}
                            onDropAccepted={this.onDropAccepted}
                            onDropRejected={this.onDropRejected}
                        />

                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code) => {
        dispatch(setError(http_code));
    },
});

export default connect(null, mapDispatchToProps)(DocumentNewApp);