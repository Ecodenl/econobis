import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';

import EmailNewForm from './EmailNewForm';
import EmailNewToolbar from './EmailNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import EmailAPI from '../../../api/email/EmailAPI';
import EmailAddressAPI from '../../../api/contact/EmailAddressAPI';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import {isEqual} from "lodash";

class EmailNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddresses: [],
            mailboxAddresses: [],
            emailTemplates: [],
            email: {
                from: '',
                to: '',
                cc: '',
                bcc: '',
                templateId: '',
                subject: '',
                htmlBody: '',
                attachments: [],
            },
            errors: {
                from: false,
                to: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFromIds = this.handleFromIds.bind(this);
        this.handleEmailTemplates = this.handleEmailTemplates.bind(this);
        this.handleToIds = this.handleToIds.bind(this);
        this.handleCcIds = this.handleCcIds.bind(this);
        this.handleBccIds = this.handleBccIds.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.addAttachment = this.addAttachment.bind(this);
        this.deleteAttachment = this.deleteAttachment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        EmailAddressAPI.fetchEmailAddressessPeek().then((payload) => {
            this.setState({
                emailAddresses: payload,
            });
        });
        MailboxAPI.fetchEmailsLoggedInUserPeek().then((payload) => {
            this.setState({
                mailboxAddresses: payload,
            });
        });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then((payload) => {
            this.setState({
                emailTemplates: payload,
            });
        });

        if(this.props.params.groupId){
            EmailAPI.fetchEmailGroup(this.props.params.groupId).then((payload) => {
                this.setState({
                    ...this.state,
                    email: {
                        ...this.state.email,
                        to: payload.join(',')
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
            email: {
                ...this.state.email,
                [name]: value
            },
        });
    };

    handleFromIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                from: selectedOption
            },
        });
    };

    handleToIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                to: selectedOption
            },
        });
    };

    handleEmailTemplates(selectedOption) {
        // .setContent(content, {format : 'raw'})
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                emailTemplateId: selectedOption
            },
        });
        EmailTemplateAPI.fetchEmailTemplateWithUser(selectedOption).then((payload) => {
            this.setState({
                ...this.state,
                email: {
                    ...this.state.email,
                    subject: payload.subject ? payload.subject : this.state.subject,
                    htmlBody: payload.htmlBody ? payload.htmlBody : this.state.htmlBody,
                },
            });
        });


    };

    handleCcIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                cc: selectedOption
            },
        });
    };

    handleBccIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                bcc: selectedOption
            },
        });
    };

    handleTextChange(event) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                htmlBody: event.target.getContent()
            },
        });
    };

    addAttachment(files) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                attachments: [
                    ...this.state.email.attachments,
                    ...files,
                ]
            },
        });
    };

    deleteAttachment(attachmentName) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                attachments: this.state.email.attachments.filter((attachment) => attachment.name !== attachmentName),
            },
        });
    };

    handleSubmit(event, concept = false) {
        event.preventDefault();

        const { email } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(email.to)){
            errors.to = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + email.from)){
            errors.from = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if(!hasErrors) {
            if (email.to.length > 0) {
                email.to = email.to.split(',');
            }

            if (email.cc.length > 0) {
                email.cc = email.cc.split(',');
            }

            if (email.bcc.length > 0) {
                email.bcc = email.bcc.split(',');
            }
            const data = new FormData();

            data.append('to', JSON.stringify(email.to));
            data.append('cc', JSON.stringify(email.cc));
            data.append('bcc', JSON.stringify(email.bcc));
            data.append('subject', email.subject);
            data.append('htmlBody', email.htmlBody);
            email.attachments.map((file, key) => {
                data.append('attachments[' +  key +  ']', file);
            });

            if(concept) {
                EmailAPI.newConcept(data, email.from).then(() => {
                    hashHistory.push(`/emails/concept`);
                }).catch(function (error) {
                    console.log(error)
                });
            }
            else{
                EmailAPI.newEmail(data, email.from).then(() => {
                    hashHistory.push(`/emails/sent`);
                }).catch(function (error) {
                    console.log(error)
                });
            }
        }
    };


    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody className="panel-small">
                                <EmailNewToolbar handleSubmit={this.handleSubmit}/>
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12">
                        <EmailNewForm
                            email={this.state.email}
                            emailAddresses={this.state.emailAddresses}
                            mailboxAddresses={this.state.mailboxAddresses}
                            emailTemplates={this.state.emailTemplates}
                            errors={this.state.errors}
                            handleSubmit={this.handleSubmit}
                            handleFromIds={this.handleFromIds}
                            handleEmailTemplates={this.handleEmailTemplates}
                            handleToIds={this.handleToIds}
                            handleCcIds={this.handleCcIds}
                            handleBccIds={this.handleBccIds}
                            handleInputChange={this.handleInputChange}
                            handleTextChange={this.handleTextChange}
                            addAttachment={this.addAttachment}
                            deleteAttachment={this.deleteAttachment}
                        />

                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

export default EmailNewApp;