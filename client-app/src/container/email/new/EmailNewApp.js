import React, {Component} from 'react';
import {browserHistory, hashHistory} from 'react-router';
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
import {connect} from "react-redux";
import DocumentDetailsAPI from "../../../api/document/DocumentDetailsAPI";

class EmailNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            emailAddresses: [],
            mailboxAddresses: [],
            emailTemplates: [],
            email: {
                from: '',
                to: props.params.contactId ? props.params.contactId : '',
                cc: '',
                bcc: '',
                templateId: '',
                subject: '',
                htmlBody: '',
                attachments: [],
                quotationRequestId:  props.params.quotationRequestId ? props.params.quotationRequestId : ''
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

        if (this.props.params.type === 'bulk' && this.props.toIds) {
            this.setState({
                ...this.state,
                email: {
                    ...this.state.email,
                    to: this.props.toIds.join(',')
                },
            });
        }
        if (this.props.params.documentId) {

            DocumentDetailsAPI.fetchDocumentDetails(this.props.params.documentId).then((payload) => {
                if(payload.data.data.contact){
                    this.setState({
                        ...this.state,
                        email: {
                            ...this.state.email,
                            to: payload.data.data.contact.id
                        },
                    });
                }
                let filename = payload.data.data.filename ? payload.data.data.filename : 'bijlage.pdf';

                DocumentDetailsAPI.download(this.props.params.documentId).then((payload) => {
                    this.addAttachment([new File([payload.data], filename)]);
                });
            });
        }
    }


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
                    subject: payload.subject ? payload.subject : this.state.email.subject,
                    htmlBody: payload.htmlBody ? payload.htmlBody : this.state.email.htmlBody,
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

    setButtonLoading = () => {
        this.setState({
            buttonLoading: true
        });
    };

    handleSubmit(event, concept = false) {
        event.preventDefault();

        const { email } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty('' + email.to)){
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
            data.append('quotationRequestId', email.quotationRequestId);
            email.attachments.map((file, key) => {
                data.append('attachments[' +  key +  ']', file);
            });

            if(concept) {
                EmailAPI.newConcept(data, email.from).then(() => {
                    hashHistory.push(`/emails/concept`);
                }).catch(function (error) {
                });
            }
            else{
                this.setButtonLoading();

                EmailAPI.newEmail(data, email.from).then(() => {
                    browserHistory.goBack();
                }).catch(function (error) {
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
                                <EmailNewToolbar loading={this.state.buttonLoading} handleSubmit={this.handleSubmit}/>
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

const mapStateToProps = (state) => {
    return {
        toIds: state.bulkMailTo.toIds,
    };
};

export default connect(mapStateToProps)(EmailNewApp);