import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import validator from 'validator';

import EmailNewForm from './EmailNewForm';
import EmailNewToolbar from './EmailNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import EmailAPI from '../../../api/email/EmailAPI';
import EmailAddressAPI from '../../../api/contact/EmailAddressAPI';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import { connect } from 'react-redux';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import Modal from '../../../components/modal/Modal';

// Functionele wrapper voor de class component
const EmailNewAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <EmailNewApp {...props} navigate={navigate} params={params} />;
};

class EmailNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            buttonLoading: false,
            emailAddressesToSelected: [],
            emailAddressesCcSelected: [],
            emailAddressesBccSelected: [],
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
                initialHtmlBody: '',
                attachments: [],
                quotationRequestId: props.params.quotationRequestId ? props.params.quotationRequestId : '',
                opportunityId: props.params.opportunityId ? props.params.opportunityId : '',
                intakeId: props.params.intakeId ? props.params.intakeId : '',
                taskId: props.params.taskId ? props.params.taskId : '',
                replyTypeId: props.params.replyTypeId ? props.params.replyTypeId : '',
                oldEmailId: '',
                contactGroupId: props.params.contactGroupId ? props.params.contactGroupId : '',
            },
            contactGroupName: '',
            errors: {
                from: false,
                to: false,
                subject: false,
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
        this.addDocumentAsAttachment = this.addDocumentAsAttachment.bind(this);
        this.deleteAttachment = this.deleteAttachment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.params.occupantId) {
            EmailAddressAPI.fetchPrimaryEmailAddressId(this.props.params.occupantId).then(payload => {
                this.setState({
                    ...this.state,
                    email: {
                        ...this.state.email,
                        to: payload['emailIds'].join(','),
                    },
                    emailAddressesToSelected: payload['emailAddressesToSelected'],
                });
            });
            if (this.props.params.contactId) {
                EmailAddressAPI.fetchPrimaryEmailAddressId(this.props.params.contactId).then(payload => {
                    this.setState({
                        ...this.state,
                        email: {
                            ...this.state.email,
                            cc: payload['emailIds'].join(','),
                        },
                        emailAddressesCcSelected: payload['emailAddressesToSelected'],
                    });
                });
            }
        } else {
            if (this.props.params.contactId) {
                EmailAddressAPI.fetchPrimaryEmailAddressId(this.props.params.contactId).then(payload => {
                    this.setState({
                        ...this.state,
                        email: {
                            ...this.state.email,
                            to: payload['emailIds'].join(','),
                        },
                        emailAddressesToSelected: payload['emailAddressesToSelected'],
                    });
                });
            }
        }
        if (this.props.params.contactGroupId) {
            EmailAPI.fetchEmailGroup(this.props.params.contactGroupId).then(payload => {
                this.setState({
                    contactGroupName: payload,
                });
            });
        }

        MailboxAPI.fetchMailboxesLoggedInUserPeek().then(payload => {
            this.setState({
                mailboxAddresses: payload.data.data,
            });
        });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            this.setState({
                emailTemplates: payload,
            });
        });

        if (this.props.params.type === 'bulk' && this.props.toIds) {
            EmailAddressAPI.fetchPrimaryEmailAddressId(this.props.toIds).then(payload => {
                this.setState({
                    ...this.state,
                    email: {
                        ...this.state.email,
                        to: payload['emailIds'].join(','),
                    },
                    emailAddressesToSelected: payload['emailAddressesToSelected'],
                });
            });
        }
        if (this.props.params.documentId) {
            DocumentDetailsAPI.fetchDocumentDetails(this.props.params.documentId).then(payload => {
                if (payload.data.data.contact) {
                    EmailAddressAPI.fetchPrimaryEmailAddressId(payload.data.data.contact.id).then(payload => {
                        this.setState({
                            ...this.state,
                            email: {
                                ...this.state.email,
                                to: payload['emailIds'].join(','),
                            },
                            emailAddressesToSelected: payload['emailAddressesToSelected'],
                        });
                    });
                }
                let filename = payload.data.data.filename ? payload.data.data.filename : 'bijlage.pdf';

                DocumentDetailsAPI.download(this.props.params.documentId).then(payload => {
                    this.addAttachment([new File([payload.data], filename)]);
                });
            });
        }
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
                    subject: payload.subject ? payload.subject : this.state.email.subject,
                    htmlBody: payload.htmlBody ? payload.htmlBody : this.state.email.htmlBody,
                    initialHtmlBody: payload.htmlBody ? payload.htmlBody : this.state.email.htmlBody,
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
                from: selectedOption,
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

    goBack = () => {
        if (this.state.email.htmlBody !== '' || this.state.email.subject !== '') {
            this.toggleShowModal();
        } else {
            this.props.navigate(-1);
        }
    };

    toggleShowModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    handleSubmit(event, concept = false) {
        event.preventDefault();

        const { email } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty('' + email.contactGroupId)) {
            if (validator.isEmpty('' + email.to)) {
                errors.to = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty('' + email.from)) {
            errors.from = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + email.subject)) {
            errors.subject = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

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
            const data = new FormData();

            data.append('to', JSON.stringify(email.to));
            data.append('cc', JSON.stringify(email.cc));
            data.append('bcc', JSON.stringify(email.bcc));
            // data.append('subject', email.subject);
            // data.append('htmlBody', email.htmlBody);
            data.append('quotationRequestId', email.quotationRequestId);
            data.append('opportunityId', email.opportunityId);
            data.append('intakeId', email.intakeId);
            data.append('taskId', email.taskId);
            data.append('contactGroupId', email.contactGroupId);
            email.attachments.map((file, key) => {
                data.append('attachments[' + key + ']', file);
            });

            if (concept) {
                EmailAPI.newConcept(email, email.from)
                    .then(emailId => {
                        this.handleNewConcept2(data, email.from, emailId.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                        this.toggleButtonLoading();
                    });
            } else {
                this.setButtonLoading();

                EmailAPI.newConcept(email, email.from)
                    .then(emailId => {
                        this.handleNewEmail(data, email.from, emailId.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                        this.toggleButtonLoading();
                    });
            }
        }
    }

    handleNewConcept2 = (data, mailboxId, emailId) => {
        EmailAPI.newConcept2(data, mailboxId, emailId)
            .then(() => {
                this.props.navigate(`/emails/concept`);
            })
            .catch(error => {});
    };

    handleNewEmail = (data, mailboxId, emailId) => {
        EmailAPI.newEmail(data, mailboxId, emailId)
            .then(() => {
                this.props.navigate(-1);
            })
            .catch(error => {});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody className="panel-small">
                                <EmailNewToolbar
                                    loading={this.state.buttonLoading}
                                    handleSubmit={this.handleSubmit}
                                    goBack={this.goBack}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12">
                        <EmailNewForm
                            email={this.state.email}
                            contactGroupName={this.state.contactGroupName}
                            emailAddressesToSelected={this.state.emailAddressesToSelected}
                            emailAddressesCcSelected={this.state.emailAddressesCcSelected}
                            emailAddressesBccSelected={this.state.emailAddressesBccSelected}
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
                            addDocumentAsAttachment={this.addDocumentAsAttachment}
                            deleteAttachment={this.deleteAttachment}
                        />
                    </div>
                </div>
                <div className="col-md-3" />

                {this.state.showModal && (
                    <Modal
                        buttonConfirmText="Verlaten"
                        closeModal={this.toggleShowModal}
                        confirmAction={this.props.navigate(-1)}
                        title="Bevestigen"
                    >
                        <p>Weet u zeker dat u deze pagina wilt verlaten zonder deze e-mail op te slaan als concept?</p>
                    </Modal>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        toIds: state.bulkMailTo.toIds,
    };
};

export default connect(mapStateToProps)(EmailNewAppWrapper);
