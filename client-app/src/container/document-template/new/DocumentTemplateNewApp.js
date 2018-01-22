import React, { Component } from 'react';

import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import DocumentTemplateNewToolbar from './DocumentTemplateNewToolbar';
import DocumentTemplateNew from './DocumentTemplateNew';

import DocumentTemplateAPI from '../../../api/document-template/DocumentTemplateAPI';

class DocumentTemplateNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            documentTemplate: {
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
            documentTemplate: {
                ...this.state.documentTemplate,
                [name]: value
            },
        });
    };

    handleTextChange(event) {
        this.setState({
            ...this.state,
            documentTemplate: {
                ...this.state.documentTemplate,
                htmlBody: event.target.getContent()
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {documentTemplate} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(documentTemplate.name)){
            errors.name = true;
            hasErrors = true;
        };


        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        DocumentTemplateAPI.storeDocumentTemplate(documentTemplate).then(payload => {
            hashHistory.push(`/document-template/${payload.id}`);
        });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <DocumentTemplateNewToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <DocumentTemplateNew
                                documentTemplate={this.state.documentTemplate}
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

export default DocumentTemplateNewApp;