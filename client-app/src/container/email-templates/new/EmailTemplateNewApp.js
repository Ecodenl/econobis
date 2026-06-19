import React, { Component } from 'react';

import validator from 'validator';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

import EmailTemplateNewToolbar from './EmailTemplateNewToolbar';
import EmailTemplateNew from './EmailTemplateNew';

import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import DocumentsAPI from '../../../api/document/DocumentsAPI';

// Functionele wrapper voor de class component
const EmailTemplateNewAppWrapper = props => {
    const navigate = useNavigate();
    return <EmailTemplateNewApp {...props} navigate={navigate} />;
};

class EmailTemplateNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultEmailDocuments: [],
            emailTemplate: {
                name: '',
                subject: '',
                initialHtmlBody: '',
                htmlBody: '',
            },
            errors: {
                name: false,
                hasErrors: false,
            },
        };

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidMount() {
        DocumentsAPI.fetchDefaultEmailDocumentsPeek().then(payload => {
            this.setState({
                defaultEmailDocuments: payload,
            });
        });
    }
    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            emailTemplate: {
                ...this.state.emailTemplate,
                [name]: value,
            },
        });
    };

    handleTextChange(value, editor) {
        this.setState({
            ...this.state,
            emailTemplate: {
                ...this.state.emailTemplate,
                htmlBody: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { emailTemplate } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(emailTemplate.name)) {
            errors.name = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            EmailTemplateAPI.storeEmailTemplate(emailTemplate).then(payload => {
                this.props.navigate(`/email-template/${payload.id}`);
            });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <EmailTemplateNewToolbar />
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <EmailTemplateNew
                                emailTemplate={this.state.emailTemplate}
                                errors={this.state.errors}
                                handleInputChange={this.handleInputChange}
                                defaultEmailDocuments={this.state.defaultEmailDocuments}
                                handleTextChange={this.handleTextChange}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailTemplateNewAppWrapper;
