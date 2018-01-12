import React, { Component } from 'react';

import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import EmailTemplateNewToolbar from './EmailTemplateNewToolbar';
import EmailTemplateNew from './EmailTemplateNew';

import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';

class EmailTemplateNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailTemplate: {
                name: '',
                subject: '',
                htmlBody: '',
            },
            errors: {
                name: false,
                hasErrors: false,
            },
        }

        this.handleTextChange = this.handleTextChange.bind(this);

    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            emailTemplate: {
                ...this.state.emailTemplate,
                [name]: value
            },
        });
    };

    handleTextChange(event) {
        this.setState({
            ...this.state,
            emailTemplate: {
                ...this.state.emailTemplate,
                htmlBody: event.target.getContent()
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {emailTemplate} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(emailTemplate.name)){
            errors.name = true;
            hasErrors = true;
        };


        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        EmailTemplateAPI.storeEmailTemplate(emailTemplate).then(payload => {
            hashHistory.push(`/email-template/${payload.id}`);
        });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <EmailTemplateNewToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <EmailTemplateNew
                                emailTemplate={this.state.emailTemplate}
                                errors={this.state.errors}
                                handleInputChange={this.handleInputChange}
                                handleTextChange={this.handleTextChange}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default EmailTemplateNewApp;