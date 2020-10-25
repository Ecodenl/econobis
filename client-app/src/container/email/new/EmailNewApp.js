import React, { Component } from 'react';
import { browserHistory, hashHistory } from 'react-router';
import validator from 'validator';

import EmailNewForm from './EmailNewForm';
import EmailNewToolbar from './EmailNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import EmailAPI from '../../../api/email/EmailAPI';
import EmailAddressAPI from '../../../api/contact/EmailAddressAPI';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import Modal from '../../../components/modal/Modal';

class EmailNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            buttonLoading: false,
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
                quotationRequestId: props.params.quotationRequestId ? props.params.quotationRequestId : '',
                intakeId: props.params.intakeId ? props.params.intakeId : '',
                replyTypeId: props.params.replyTypeId ? props.params.replyTypeId : '',
                oldEmailId: '',
                // groupId: '',
            },
            errors: {
                from: false,
                to: false,
                subject: false,
            },
        };

        //todo wim
        // console.log("hallo?");
        // console.log(this.state.email);
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
        if (this.props.params.contactId) {
            EmailAddressAPI.fetchPrimaryEmailAddressId(this.props.params.contactId).then(payload => {
                this.setState({
                    ...this.state,
                    email: {
                        ...this.state.email,
                        to: payload.join(','),
                    },
                });
            });
        }

        EmailAddressAPI.fetchEmailAddressessPeek().then(payload => {
            this.setState(
                {
                    emailAddresses: payload,
                },
                () => {
                    if (this.props.params.groupId && this.props.params.type) {
                        EmailAPI.fetchEmailGroup(this.props.params.groupId).then(payload => {
                            let emailAddresses = this.state.emailAddresses;

                            emailAddresses.push({ id: '@group_' + this.props.params.groupId, name: payload });

                            this.setState({
                                ...this.state,
                                emailAddresses: emailAddresses,
                                email: {
                                    ...this.state.email,
                                    [this.props.params.type]: '@group_' + this.props.params.groupId,
                                },
                            });
                        });
                    }
                }
            );
        });

        MailboxAPI.fetchMailboxesLoggedInUserPeek().then(payload => {
            this.setState({
                mailboxAddresses: payload,
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
                        to: payload.join(','),
                    },
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
                                to: payload.join(','),
                            },
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
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                to: selectedOption,
            },
        });
    }

    handleEmailTemplates(selectedOption) {
        // .setContent(content, {format : 'raw'})
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
                },
            });
        });
    }

    handleCcIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                cc: selectedOption,
            },
        });
    }

    handleBccIds(selectedOption) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                bcc: selectedOption,
            },
        });
    }

    handleTextChange(event) {
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                htmlBody: event.target.getContent({ format: 'raw' }),
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

    goBack = () => {
        if (this.state.email.htmlBody !== '' || this.state.email.subject !== '') {
            this.toggleShowModal();
        } else {
            browserHistory.goBack();
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

        if (validator.isEmpty('' + email.to)) {
            errors.to = true;
            hasErrors = true;
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

        function handleNewConcept2(data, mailboxId, emailId) {
            EmailAPI.newConcept2(data, mailboxId, emailId)
                .then(() => {
                    hashHistory.push(`/emails/concept`);
                })
                .catch(function(error) {});
        }
        function handleNewEmail(data, mailboxId, emailId) {
            EmailAPI.newEmail(data, mailboxId, emailId)
                .then(() => {
                    browserHistory.goBack();
                })
                .catch(function(error) {});
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
            const data = new FormData();
            //

            data.append('to', JSON.stringify(email.to));
            data.append('cc', JSON.stringify(email.cc));
            data.append('bcc', JSON.stringify(email.bcc));
            // data.append('subject', email.subject);
            // data.append('htmlBody', email.htmlBody);
            data.append('quotationRequestId', email.quotationRequestId);
            data.append('intakeId', email.intakeId);
            email.attachments.map((file, key) => {
                data.append('attachments[' + key + ']', file);
            });

            if (concept) {
                EmailAPI.newConcept(email, email.from)
                    .then(emailId => {
                        handleNewConcept2(data, email.from, emailId.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                this.setButtonLoading();

                EmailAPI.newConcept(email, email.from)
                    .then(emailId => {
                        handleNewEmail(data, email.from, emailId.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }

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
                <div className="col-md-3" />

                {this.state.showModal && (
                    <Modal
                        buttonConfirmText="Verlaten"
                        closeModal={this.toggleShowModal}
                        confirmAction={browserHistory.goBack}
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

export default connect(mapStateToProps)(EmailNewApp);
