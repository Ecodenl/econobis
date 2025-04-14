import React, { Component } from 'react';

import validator from 'validator';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

import DocumentTemplateNewToolbar from './DocumentTemplateNewToolbar';
import DocumentTemplateNew from './DocumentTemplateNew';

import DocumentTemplateAPI from '../../../api/document-template/DocumentTemplateAPI';
import { connect } from 'react-redux';

// Functionele wrapper voor de class component
const DocumentTemplateNewAppWrapper = props => {
    const navigate = useNavigate();
    return <DocumentTemplateNewApp {...props} navigate={navigate} />;
};

class DocumentTemplateNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            footerTemplates: [],
            headerTemplates: [],
            baseTemplates: [],
            documentTemplate: {
                name: '',
                documentGroupId: '',
                documentTemplateTypeId: '',
                roleIds: '',
                roleIdsSelected: [],
                characteristic: '',
                initialHtmlBody: '',
                htmlBody: '',
                allowChangeHtmlBody: false,
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
    }

    componentDidMount() {
        DocumentTemplateAPI.fetchDocumentTemplatesPeekNotGeneral().then(payload => {
            let footerTemplates = [];
            let headerTemplates = [];
            let baseTemplates = [];

            payload.forEach(function(template) {
                if (template.type === 'footer') {
                    footerTemplates.push({ id: template.id, name: template.name });
                } else if (template.type === 'header') {
                    headerTemplates.push({ id: template.id, name: template.name });
                } else if (template.type === 'base') {
                    baseTemplates.push({ id: template.id, name: template.name });
                }
            });

            this.setState({
                footerTemplates: footerTemplates,
                headerTemplates: headerTemplates,
                baseTemplates: baseTemplates,
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            documentTemplate: {
                ...this.state.documentTemplate,
                [name]: value,
            },
        });
    };

    handleDocumentTemplateType = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if (value === 'general') {
            this.setState({
                ...this.state,
                isGeneral: true,
                documentTemplate: {
                    ...this.state.documentTemplate,
                    documentTemplateTypeId: value,
                },
            });
        } else {
            this.setState({
                ...this.state,
                isGeneral: false,
                documentTemplate: {
                    ...this.state.documentTemplate,
                    documentTemplateTypeId: value,
                    roleIds: '',
                    roleIdsSelected: [],
                    baseTemplateId: '',
                    headerTemplateId: '',
                    footerTemplateId: '',
                },
            });
        }
    };

    handleTextChange(value, editor) {
        this.setState({
            ...this.state,
            documentTemplate: {
                ...this.state.documentTemplate,
                htmlBody: value,
            },
        });
    }

    handleRoleIds = selectedOption => {
        const roleIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            documentTemplate: {
                ...this.state.documentTemplate,
                roleIds: roleIds,
                roleIdsSelected: selectedOption,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { documentTemplate } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(documentTemplate.name)) {
            errors.name = true;
            hasErrors = true;
        }
        if (validator.isEmpty(documentTemplate.documentGroupId)) {
            errors.group = true;
            hasErrors = true;
        }

        if (validator.isEmpty(documentTemplate.documentTemplateTypeId)) {
            errors.type = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            DocumentTemplateAPI.storeDocumentTemplate(documentTemplate).then(payload => {
                this.props.navigate(`/document-template/${payload.id}`);
            });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <DocumentTemplateNewToolbar />
                        </div>
                        <div className="col-md-12 margin-10-top">
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
        );
    }
}

const mapStateToProps = state => {
    return {
        documentGroups: state.systemData.documentGroups,
        documentTemplateTypes: state.systemData.documentTemplateTypes,
        roles: state.systemData.roles,
    };
};

export default connect(mapStateToProps)(DocumentTemplateNewAppWrapper);
