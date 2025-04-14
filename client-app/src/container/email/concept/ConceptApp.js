import React, { Component } from 'react';
import validator from 'validator';
import { union } from 'lodash';

import ConceptForm from './ConceptForm';
import ConceptToolbar from './ConceptToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import EmailAPI from '../../../api/email/EmailAPI';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const ConceptAppWrapper = props => {
    const navigate = useNavigate();
    return <ConceptApp {...props} navigate={navigate} />;
};

class ConceptApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            emailAddressesToSelected: [],
            emailAddressesCcSelected: [],
            emailAddressesBccSelected: [],
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
            contactGroupName: '',
            errors: {
                to: false,
                subject: false,
            },
            hasLoaded: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleToIds = this.handleToIds.bind(this);
        this.handleCcIds = this.handleCcIds.bind(this);
        this.handleBccIds = this.handleBccIds.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.addAttachment = this.addAttachment.bind(this);
        this.deleteAttachment = this.deleteAttachment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeEmail = this.removeEmail.bind(this);
    }

    componentDidMount() {
        EmailAPI.fetchEmail(this.props.params.id).then(payload => {
            this.setState(
                {
                    ...this.state,
                    email: {
                        id: payload.id,
                        from: payload.from,
                        mailboxId: payload.mailboxId,
                        to: payload.to ? payload.to.join(',') : '',
                        cc: payload.cc ? payload.cc.join(',') : '',
                        bcc: payload.bcc ? payload.bcc.join(',') : '',
                        subject: payload.subject ? payload.subject : '',
                        htmlBody: payload.htmlBodyWithEmbeddedImages ? payload.htmlBodyWithEmbeddedImages : '',
                        initialHtmlBody: payload.htmlBodyWithEmbeddedImages ? payload.htmlBodyWithEmbeddedImages : '',
                        attachments: payload.attachments ? payload.attachments : '',
                        quotationRequestId: payload.quotationRequestId ? payload.quotationRequestId : '',
                        intakeId: payload.intakeId ? payload.intakeId : '',
                        taskId: payload.taskId ? payload.taskId : '',
                        replyTypeId: payload.replyTypeId ? payload.replyTypeId : '',
                        oldEmailId: payload.oldEmailId ? payload.oldEmailId : '',
                        contactGroupId: payload.contactGroupId ? payload.contactGroupId : '',
                    },
                    emailAddressesToSelected: payload.emailAddressesToSelected,
                    emailAddressesCcSelected: payload.emailAddressesCcSelected,
                    emailAddressesBccSelected: payload.emailAddressesBccSelected,
                    hasLoaded: true,
                },
                () => {
                    // todo omzetten van to id`s naar emailadressen voor options
                    // console.log("To: " + payload.to);
                    if (payload.contactGroupId) {
                        EmailAPI.fetchEmailGroup(payload.contactGroupId).then(name => {
                            this.setState({
                                contactGroupName: name,
                            });
                        });
                    }
                }
            );
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
        const data = new FormData();

        files.map((file, key) => {
            data.append('attachments[' + key + ']', file);
        });
        EmailAPI.storeAttachment(this.state.email.id, data).then(payload => {
            this.setState({
                ...this.state,
                email: {
                    ...this.state.email,
                    attachments: payload.data.data,
                },
            });
            // todo WM: opschonen!!
            console.log('Test calling window.URL.revokeObjectURL(file.preview)');
            files.map((file, key) => {
                window.URL.revokeObjectURL(file.preview);
            });
        });
    }

    deleteAttachment(name, id) {
        EmailAPI.deleteAttachment(id).then(() => {
            this.setState({
                ...this.state,
                email: {
                    ...this.state.email,
                    attachments: this.state.email.attachments.filter(attachment => attachment.name !== name),
                },
            });
        });
    }

    setButtonLoading = () => {
        this.setState({
            buttonLoading: true,
        });
    };

    handleSubmit(event, concept = false) {
        event.preventDefault();

        const { email } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty('' + email.contactGroupId)) {
            if (validator.isEmpty(email.to)) {
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

        function handleUpdateConcept2(data, emailId) {
            EmailAPI.updateConcept2(data, emailId)
                .then(() => {
                    this.props.navigate(`/emails/concept`);
                })
                .catch(function(error) {});
        }

        function handleSendConcept(data, emailId) {
            EmailAPI.sendConcept(data, emailId)
                .then(() => {
                    this.props.navigate(`/emails/sent`);
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

            data.append('to', JSON.stringify(email.to));
            data.append('cc', JSON.stringify(email.cc));
            data.append('bcc', JSON.stringify(email.bcc));
            // data.append('subject', email.subject);
            // data.append('htmlBody', email.htmlBody);
            data.append('quotationRequestId', email.quotationRequestId);
            data.append('intakeId', email.intakeId);
            data.append('taskId', email.taskId);
            data.append('replyTypeId', email.replyTypeId);
            data.append('oldEmailId', email.oldEmailId);
            data.append('contactGroupId', email.contactGroupId);

            if (concept) {
                EmailAPI.updateConcept(email, this.props.params.id)
                    .then(emailId => {
                        handleUpdateConcept2(data, emailId.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                this.setButtonLoading();

                EmailAPI.updateConcept(email, this.props.params.id)
                    .then(emailId => {
                        handleSendConcept(data, emailId.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }

    removeEmail() {
        EmailAPI.deleteEmail(this.props.params.id).then(() => {
            navigate(-1)();
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className="panel-small">
                                <ConceptToolbar
                                    loading={this.state.buttonLoading}
                                    handleSubmit={this.handleSubmit}
                                    removeEmail={this.removeEmail}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ConceptForm
                            email={this.state.email}
                            contactGroupName={this.state.contactGroupName}
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
                            deleteAttachment={this.deleteAttachment}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default ConceptAppWrapper;
