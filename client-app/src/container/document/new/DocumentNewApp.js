import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';
import moment from 'moment';

import DocumentNewForm from './DocumentNewForm';
import DocumentNewToolbar from './DocumentNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import {isEqual} from "lodash";
import ContactGroupAPI from "../../../api/contact-group/ContactGroupAPI";
import RegistrationsAPI from "../../../api/registration/RegistrationsAPI";
import OpportunitiesAPI from "../../../api/opportunity/OpportunitiesAPI";
import ContactsAPI from "../../../api/contact/ContactsAPI";

class DocumentNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            contactsGroups: [],
            registrations: [],
            opportunities: [],
            document: {
                contactId: '',
                contactGroupId: '',
                registrationId: '',
                opportunityId: '',
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
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
    };

    componentDidMount() {
        ContactsAPI.getContactsPeek().then((payload) => {
            this.setState({ contacts: payload });
        });

        RegistrationsAPI.peekRegistrations().then((payload) => {
            this.setState({ registrations: payload });
        });

        ContactGroupAPI.peekContactGroups().then((payload) => {
            this.setState({ contactGroups: payload });
        });

        OpportunitiesAPI.peekOpportunities().then((payload) => {
            this.setState({ opportunities: payload });
        });

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
            registrationId,
            opportunityId,
            documentType,
            description,
            documentGroup,
            templateId,
            freeText1,
            freeText2,
            filename,
            sentById,
            attachment
        } = this.state.document;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(contactId) && validator.isEmpty(contactGroupId) && validator.isEmpty(registrationId) && validator.isEmpty(opportunityId)){
            errors.docLinkedAtAny = true;
            hasErrors = true;
        };

        if(validator.isEmpty(documentGroup)){
            errors.documentGroup = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if(!hasErrors) {
            const data = new FormData();

            data.append('contactId', contactId);
            data.append('contactGroupId', contactGroupId);
            data.append('registrationId', registrationId);
            data.append('opportunityId', opportunityId);
            data.append('documentType', documentType);
            data.append('description', description);
            data.append('documentGroup', documentGroup);
            data.append('templateId', templateId);
            data.append('freeText1', freeText1);
            data.append('freeText2', freeText2);
            data.append('filename', filename);
            data.append('sentById', sentById);
            data.append('attachment', attachment);

            DocumentDetailsAPI.newDocument(data).then((payload) => {
                console.log(payload);
                hashHistory.push(`/documenten`);
            }).catch(function (error) {
                console.log(error)
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
                            registrations={this.state.registrations}
                            opportunities={this.state.opportunities}
                            errors={this.state.errors}
                            handleSubmit={this.handleSubmit}
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

export default DocumentNewApp;