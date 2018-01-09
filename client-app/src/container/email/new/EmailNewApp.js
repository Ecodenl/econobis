import React, {Component} from 'react';
import validator from 'validator';

import EmailNewForm from './EmailNewForm';
import EmailNewToolbar from './EmailNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import EmailAPI from '../../../api/email/EmailAPI';
import EmailAddressAPI from '../../../api/contact/EmailAddressAPI';

class MailboxNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddresses: [],
            email: {
                to: '',
                cc: '',
                bcc: '',
                subject: '',
                htmlBody: '',
                attachments: [],
            },
            errors: {
                to: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleToIds = this.handleToIds.bind(this);
        this.handleCcIds = this.handleCcIds.bind(this);
        this.handleBccIds = this.handleBccIds.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        EmailAddressAPI.fetchEmailAddressessPeek().then((payload) => {
            this.setState({
                emailAddresses: payload,
            });
        });
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
                htmlBody: event.target.getContent()
            },
        });
    };

    onDrop(files) {
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

    handleSubmit(event) {
        event.preventDefault();

        const { email } = this.state;

        let prepareAttachmentsForSending = [];

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(email.to)){
            errors.to = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            email.attachments.map((file) => {
                let data = new FormData();
                data.set('file', file);

                prepareAttachmentsForSending.push(data);
            });

            email.attachments = prepareAttachmentsForSending;

            if(email.to.length > 0){
                email.to = email.to.split(',');
            }

            if(email.cc.length > 0){
                email.cc = email.cc.split(',');
            }

            if(email.bcc.length > 0){
                email.bcc = email.bcc.split(',');
            }

            console.log(email);

            EmailAPI.newEmail(email).then((payload) => {
                hashHistory.push(`/email/${payload.data.data.id}`);
            }).catch(function (error) {
                console.log(error)
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 extra-space-above">
                        <Panel>
                            <PanelBody className="panel-small">
                                <EmailNewToolbar handleSubmit={this.handleSubmit}/>
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 extra-space-above">
                        <EmailNewForm
                            email={this.state.email}
                            emailAddresses={this.state.emailAddresses}
                            errors={this.state.errors}
                            handleSubmit={this.handleSubmit}
                            handleToIds={this.handleToIds}
                            handleCcIds={this.handleCcIds}
                            handleBccIds={this.handleBccIds}
                            handleInputChange={this.handleInputChange}
                            handleTextChange={this.handleTextChange}
                            onDrop={this.onDrop}
                        />

                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

export default MailboxNewApp;