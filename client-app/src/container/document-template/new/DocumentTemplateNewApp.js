import React, { Component } from 'react';

import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import DocumentTemplateNewToolbar from './DocumentTemplateNewToolbar';
import DocumentTemplateNew from './DocumentTemplateNew';

import DocumentTemplateAPI from '../../../api/document-template/DocumentTemplateAPI';
import {connect} from "react-redux";

class DocumentTemplateNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            footerTemplates: [],
            headerTemplates: [],
            baseTemplates: [],
            documentTemplate: {
                name: '',
                documentGroupId:'',
                documentTemplateTypeId:'',
                roleIds: '',
                characteristic: '',
                htmlBody: '',
                baseTemplateId: '',
                headerTemplateId: '',
                footerTemplateId: '',
                active: true,
            },
            errors: {
                name: false,
                group: false,
                type: false,
            },
            isGeneral: false,
        };

        this.handleTextChange = this.handleTextChange.bind(this);

    };

    componentDidMount() {
        DocumentTemplateAPI.fetchDocumentTemplatesPeekNotGeneral().then((payload) => {
            let footerTemplates = [];
            let headerTemplates = [];
            let baseTemplates = [];

            payload.forEach(function (template) {
                if (template.type === 'footer') {
                    footerTemplates.push({id: template.id, name: template.name});
                }
                else if (template.type === 'header') {
                    headerTemplates.push({id: template.id, name: template.name});
                }
                else if (template.type === 'base') {
                    baseTemplates.push({id: template.id, name: template.name});
                }
            });

            this.setState({
                footerTemplates: footerTemplates,
                headerTemplates: headerTemplates,
                baseTemplates: baseTemplates,
            });
        });
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

    handleDocumentTemplateType = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if(value === 'general'){
            this.setState({
                ...this.state,
                isGeneral: true,
                documentTemplate: {
                    ...this.state.documentTemplate,
                    documentTemplateTypeId: value
                },
            });
        }
        else{
            this.setState({
                ...this.state,
                isGeneral: false,
                documentTemplate: {
                    ...this.state.documentTemplate,
                    documentTemplateTypeId: value,
                    roleIds: '',
                    baseTemplateId: '',
                    headerTemplateId: '',
                    footerTemplateId: '',
                },
            });
        }

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

    handleRoleIds = (selectedOption) => {
        this.setState({
            ...this.state,
            documentTemplate: {
                ...this.state.documentTemplate,
                roleIds: selectedOption
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
        if(validator.isEmpty(documentTemplate.documentGroupId)){
            errors.group = true;
            hasErrors = true;
        };

        if(validator.isEmpty(documentTemplate.documentTemplateTypeId)){
            errors.type = true;
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
                                handleDocumentTemplateType={this.handleDocumentTemplateType}
                                isGeneral={this.state.isGeneral}
                                documentGroups={this.props.documentGroups}
                                documentTemplateTypes={this.props.documentTemplateTypes}
                                roles={this.props.roles}
                                handleRoleIds={this.handleRoleIds}
                                footerTemplates={this.state.footerTemplates}
                                headerTemplates={this.state.headerTemplates}
                                baseTemplates={this.state.baseTemplates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        documentGroups: state.systemData.documentGroups,
        documentTemplateTypes: state.systemData.documentTemplateTypes,
        roles: state.systemData.roles,
    }
};

export default connect(mapStateToProps)(DocumentTemplateNewApp);