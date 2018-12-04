import React, {Component} from 'react';
import validator from 'validator';
import {union} from 'lodash';

import EmailAnswerForm from './EmailAnswerForm';
import EmailAnswerToolbar from './EmailAnswerToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import EmailAPI from '../../../api/email/EmailAPI';
import EmailAddressAPI from '../../../api/contact/EmailAddressAPI';
import {hashHistory} from "react-router";
import EmailTemplateAPI from "../../../api/email-template/EmailTemplateAPI";
import MailboxAPI from "../../../api/mailbox/MailboxAPI";

class EmailAnswerApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            oldEmailId: null,
            emailAddresses: [],
            mailboxAddresses: [],
            originalHtmlBody: "",
            emailTemplates: [],
            email: {
                from: '',
                mailboxId: '',
                to: '',
                cc: '',
                bcc: '',
                subject: '',
                htmlBody: '',
                attachments: [],
            },
            errors: {
                to: false,
                subject: false,
            },
            hasLoaded: false,
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
                emailAddresses: [...this.state.emailAddresses, ...payload],
            });
        });

        let type = '';

        switch(this.props.params.type) {
            case 'beantwoorden':
                type = 'reply';
                break;
            case 'allenbeantwoorden':
                type = 'reply-all';
                break;
            case 'doorsturen':
                type = 'forward';
                break;
            case 'groep':
                type = 'group';
                break;
            default:
                type = 'reply';
        };

        EmailTemplateAPI.fetchEmailTemplatesPeek().then((payload) => {
            this.setState({
                emailTemplates: payload,
            });
        });

        EmailAPI.fetchEmailByType(this.props.params.id, type).then((payload) => {
            const extraOptions = this.createExtraOptions(payload.to, payload.cc, payload.bcc);

            this.setState({
                ...this.state,
                oldEmailId: payload.id,
                originalHtmlBody: payload.htmlBody ? payload.htmlBody : '',
                email: {
                    mailboxId: payload.mailboxId,
                    to: payload.to ? payload.to.join(',') : '',
                    cc: payload.cc ? payload.cc.join(',') : '',
                    bcc: payload.bcc ? payload.bcc.join(',') : '',
                    subject: payload.subject ? payload.subject : '',
                    htmlBody: payload.htmlBody ? payload.htmlBody : '',
                    attachments: payload.attachments ? payload.attachments : '',
                },
                emailAddresses: [...this.state.emailAddresses, ...extraOptions],
                hasLoaded: true,
            });
        });

        MailboxAPI.fetchEmailsLoggedInUserPeek().then((payload) => {
            this.setState({
                mailboxAddresses: payload,
            });
        });
    };

    handleFromIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                mailboxId: selectedOption
            },
        });
    };

    handleEmailTemplates(selectedOption) {
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
                    htmlBody: payload.htmlBody ? (payload.htmlBody + this.state.originalHtmlBody) : this.state.email.htmlBody,
                },
            });
        });


    };

    createExtraOptions(to, cc, bcc) {
        const emailAddresses = union(to, cc, bcc);

        let options = [];

        emailAddresses.map((emailAddress) => {
            options.push({id: emailAddress, name: emailAddress});
        });

        return options;
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

    handleToIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                to: selectedOption
            },
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
                htmlBody: event.target.getContent(({format: 'raw'}))
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

    setButtonLoading = () => {
        this.setState({
            buttonLoading: true
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const { email } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(email.to)){
            errors.to = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + email.mailboxId) || email.mailboxId === null){
            errors.mailboxId = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + email.subject)){
            errors.subject = true;
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
            data.append('oldEmailId', this.state.oldEmailId);
            if(email.attachments) {
                email.attachments.map((file, key) => {
                    if (file.id) {
                        data.append('oldAttachments[' + key + ']', JSON.stringify(file));
                    }
                    else {
                        data.append('attachments[' + key + ']', file);
                    }
                });
            }

            this.setButtonLoading();

            EmailAPI.newEmail(data, email.mailboxId).then(() => {
                //close the email we reply/forward
                if(this.state.oldEmailId) {
                    EmailAPI.setStatus(this.state.oldEmailId, 'closed').then(() => {
                        hashHistory.push(`/emails/inbox`);
                    });
                }
                else{
                    hashHistory.push(`/emails/inbox`);
                }
            }).catch(function (error) {
                console.log(error)
            });
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className="panel-small">
                                <EmailAnswerToolbar loading={this.state.buttonLoading} handleSubmit={this.handleSubmit} type={this.props.params.type} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <EmailAnswerForm
                            email={this.state.email}
                            emailAddresses={this.state.emailAddresses}
                            errors={this.state.errors}
                            hasLoaded={this.state.hasLoaded}
                            handleSubmit={this.handleSubmit}
                            handleToIds={this.handleToIds}
                            handleCcIds={this.handleCcIds}
                            handleBccIds={this.handleBccIds}
                            handleInputChange={this.handleInputChange}
                            handleTextChange={this.handleTextChange}
                            addAttachment={this.addAttachment}
                            emailTemplates={this.state.emailTemplates}
                            handleEmailTemplates={this.handleEmailTemplates}
                            deleteAttachment={this.deleteAttachment}
                            mailboxAddresses={this.state.mailboxAddresses}
                            handleFromIds={this.handleFromIds}
                        />

                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

export default EmailAnswerApp;