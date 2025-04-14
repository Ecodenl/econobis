import React, { Component } from 'react';
import validator from 'validator';
import { union } from 'lodash';

import EmailAnswerForm from './EmailAnswerForm';
import EmailAnswerToolbar from './EmailAnswerToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import EmailAPI from '../../../api/email/EmailAPI';
import { useNavigate } from 'react-router-dom';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';

// Functionele wrapper voor de class component
const EmailAnswerAppWrapper = props => {
    const navigate = useNavigate();
    return <EmailAnswerApp {...props} navigate={navigate} />;
};

class EmailAnswerApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            oldEmailId: null,
            emailAddressesToSelected: [],
            emailAddressesCcSelected: [],
            emailAddressesBccSelected: [],
            mailboxAddresses: [],
            originalHtmlBody: '',
            emailTemplates: [],
            email: {
                from: '',
                mailboxId: '',
                replyTypeId: '',
                oldEmailId: '',
                contactGroupId: '',
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
    }

    componentDidMount() {
        let type = '';

        switch (this.props.params.type) {
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
        }

        EmailAPI.fetchEmailByType(this.props.params.id, type).then(payload => {
            this.setState({
                ...this.state,
                oldEmailId: payload.id,
                originalHtmlBody: payload.htmlBody ? payload.htmlBody : '',
                email: {
                    mailboxId: payload.mailboxId,
                    replyTypeId: payload.replyTypeId ? payload.replyTypeId : '',
                    oldEmailId: payload.id ? payload.id : '',
                    contactGroupId: payload.contactGroupId ? payload.contactGroupId : '',
                    to: payload.to ? payload.to.join(',') : '',
                    cc: payload.cc ? payload.cc.join(',') : '',
                    bcc: payload.bcc ? payload.bcc.join(',') : '',
                    subject: payload.subject ? payload.subject : '',
                    htmlBody: payload.htmlBodyWithEmbeddedImages ? payload.htmlBodyWithEmbeddedImages : '',
                    initialHtmlBody: payload.htmlBodyWithEmbeddedImages ? payload.htmlBodyWithEmbeddedImages : '',
                    attachments: payload.attachments ? payload.attachments : '',
                },
                emailAddressesToSelected: payload.emailAddressesToSelected,
                emailAddressesCcSelected: payload.emailAddressesCcSelected,
                emailAddressesBccSelected: payload.emailAddressesBccSelected,
                hasLoaded: true,
            });
        });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            this.setState({
                emailTemplates: payload,
            });
        });

        MailboxAPI.fetchMailboxesLoggedInUserPeek()
            .then(payload => {
                this.setState({
                    mailboxAddresses: payload.data.data,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    handleEmailTemplates(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                emailTemplateId: selectedOption,
            },
        });
        EmailTemplateAPI.fetchEmailTemplateWithUser(selectedOption).then(payload => {
            this.setState({
                ...this.state,
                email: {
                    ...this.state.email,
                    htmlBody: payload.htmlBody
                        ? payload.htmlBody + this.state.originalHtmlBody
                        : this.state.email.htmlBody,
                    initialHtmlBody: payload.htmlBody
                        ? payload.htmlBody + this.state.originalHtmlBody
                        : this.state.email.htmlBody,
                },
            });
            if (payload.defaultAttachmentDocument) {
                this.addDocumentAsAttachment(payload.defaultAttachmentDocument.id);
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                [name]: value,
            },
        });
    }

    handleFromIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                mailboxId: selectedOption,
            },
        });
    }

    handleToIds(selectedOption) {
        const toIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                to: toIds,
            },
            emailAddressesToSelected: selectedOption,
        });
    }

    handleCcIds(selectedOption) {
        const ccIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                cc: ccIds,
            },
            emailAddressesCcSelected: selectedOption,
        });
    }

    handleBccIds(selectedOption) {
        const bccIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                bcc: bccIds,
            },
            emailAddressesBccSelected: selectedOption,
        });
    }

    handleTextChange(htmlBody) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                htmlBody: htmlBody,
            },
        });
    }

    addAttachment(files) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                attachments: [...this.state.email.attachments, ...files],
            },
        });
    }

    addDocumentAsAttachment(documentId) {
        if (documentId) {
            DocumentDetailsAPI.fetchDocumentDetails(documentId).then(payload => {
                let filename = payload.data.data.filename ? payload.data.data.filename : 'bijlage.pdf';

                DocumentDetailsAPI.download(documentId).then(payload => {
                    this.addAttachment([new File([payload.data], filename)]);
                });
            });
        }
    }

    deleteAttachment(attachmentName) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                attachments: this.state.email.attachments.filter(attachment => attachment.name !== attachmentName),
            },
        });
    }

    setButtonLoading = () => {
        this.setState({
            buttonLoading: true,
        });
    };

    toggleButtonLoading = () => {
        this.setState({
            buttonLoading: !this.state.buttonLoading,
        });
    };

    handleSubmit(event, concept = false) {
        event.preventDefault();

        const { email } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(email.to)) {
            errors.to = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + email.mailboxId) || email.mailboxId === null) {
            errors.mailboxId = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + email.subject)) {
            errors.subject = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        function handleNewConcept2(data, mailboxId, emailId, oldEmailId) {
            EmailAPI.newConcept2(data, mailboxId, emailId)
                .then(() => {
                    //close the email we reply/forward
                    if (oldEmailId) {
                        EmailAPI.setStatus(oldEmailId, 'closed').then(() => {
                            this.props.navigate(`/emails/inbox`);
                        });
                    } else {
                        this.props.navigate(`/emails/concept`);
                    }
                })
                .catch(function(error) {});
        }
        function handleNewEmail(data, mailboxId, emailId, oldEmailId) {
            EmailAPI.newEmail(data, mailboxId, emailId)
                .then(() => {
                    //close the email we reply/forward
                    if (oldEmailId) {
                        EmailAPI.setStatus(oldEmailId, 'closed').then(() => {
                            this.props.navigate(`/emails/inbox`);
                        });
                    } else {
                        this.props.navigate(`/emails/inbox`);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        // If no errors send form
        if (!hasErrors) {
            if (email.to.length > 0) {
                email.to = email.to.split(',');
            }

            if (email.cc.length > 0) {
                email.cc = email.cc.split(',');
            }

            if (email.bcc.length > 0) {
                email.bcc = email.bcc.split(',');
            }

            const editor = window.tinymce.EditorManager.get('tinyMCEUpdateable');
            if (editor !== undefined) {
                email.htmlBody = editor.getContent({ format: 'raw' });
            }

            const data = new FormData();

            data.append('to', JSON.stringify(email.to));
            data.append('cc', JSON.stringify(email.cc));
            data.append('bcc', JSON.stringify(email.bcc));
            // data.append('subject', email.subject);
            // data.append('htmlBody', email.htmlBody);
            data.append('oldEmailId', this.state.oldEmailId);
            // data.append('oldEmailId', email.replyTypeId);
            data.append('replyTypeId', email.replyTypeId);
            data.append('contactGroupId', email.contactGroupId);
            if (email.attachments) {
                /**
                 * alleen bijlages zonder "cid", de cid bijlages zijn inline bijlages en worden bij opslaan automatisch toegevoegd (dmv de verwijzing in oldEmailId)
                 */
                email.attachments
                    .filter(a => !a.cid)
                    .map((file, key) => {
                        if (file.id) {
                            data.append('oldAttachments[' + key + ']', JSON.stringify(file));
                        } else {
                            data.append('attachments[' + key + ']', file);
                        }
                    });
            }

            if (concept) {
                EmailAPI.newConcept(email, email.mailboxId)
                    .then(emailId => {
                        handleNewConcept2(data, email.mailboxId, emailId.data, this.state.oldEmailId);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                this.setButtonLoading();

                EmailAPI.newConcept(email, email.mailboxId)
                    .then(emailId => {
                        handleNewEmail(data, email.mailboxId, emailId.data, this.state.oldEmailId);
                    })
                    .catch(function(error) {
                        console.log(error);
                        this.toggleButtonLoading();
                    });
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className="panel-small">
                                <EmailAnswerToolbar
                                    loading={this.state.buttonLoading}
                                    handleSubmit={this.handleSubmit}
                                    type={this.props.params.type}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <EmailAnswerForm
                            email={this.state.email}
                            emailAddressesToSelected={this.state.emailAddressesToSelected}
                            emailAddressesCcSelected={this.state.emailAddressesCcSelected}
                            emailAddressesBccSelected={this.state.emailAddressesBccSelected}
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
                <div className="col-md-3" />
            </div>
        );
    }
}

export default EmailAnswerAppWrapper;
