import React, { Component } from 'react';
import { connect } from 'react-redux';

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';

import { fetchDocumentTemplate } from '../../../../actions/document-templates/DocumentTemplateDetailsActions';
import validator from 'validator';
import DocumentTemplateAPI from '../../../../api/document-template/DocumentTemplateAPI';
import moment from 'moment/moment';
import InputText from '../../../../components/form/InputText';
import ViewText from '../../../../components/form/ViewText';
import InputSelect from '../../../../components/form/InputSelect';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import InputToggle from '../../../../components/form/InputToggle';
import InputTinyMCE from '../../../../components/form/InputTinyMCE';

class DocumentTemplateFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            name,
            documentGroup,
            documentTemplateType,
            roles,
            characteristic,
            htmlBody,
            allowChangeHtmlBody,
            baseTemplate,
            headerTemplate,
            footerTemplate,
            active,
        } = props.documentTemplate;

        this.state = {
            footerTemplates: [],
            headerTemplates: [],
            baseTemplates: [],
            documentTemplate: {
                id,
                name,
                documentGroupId: documentGroup ? documentGroup.id : '',
                roleIds: roles && roles.map(role => role.id).join(','),
                roleIdsSelected: roles ? roles : [],
                characteristic: characteristic ? characteristic : '',
                htmlBody: htmlBody ? htmlBody : '',
                allowChangeHtmlBody,
                baseTemplateId: baseTemplate ? baseTemplate.id : '',
                headerTemplateId: headerTemplate ? headerTemplate.id : '',
                footerTemplateId: footerTemplate ? footerTemplate.id : '',
                active,
            },
            errors: {
                name: false,
                group: false,
            },
            isGeneral: !!(documentTemplateType && documentTemplateType.id === 'general'),
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleRoleIds = this.handleRoleIds.bind(this);
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

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            DocumentTemplateAPI.updateDocumentTemplate(documentTemplate).then(payload => {
                this.props.fetchDocumentTemplate(payload.id);
                this.props.switchToView();
            });
    };

    render() {
        const {
            name,
            documentGroupId,
            roleIds,
            roleIdsSelected,
            characteristic,
            htmlBody,
            allowChangeHtmlBody,
            baseTemplateId,
            headerTemplateId,
            footerTemplateId,
            active,
        } = this.state.documentTemplate;
        const { number, createdAt, documentTemplateType, createdBy } = this.props.documentTemplate;
        const initialHtmlBody = this.props.documentTemplate.htmlBody;

        return (
            <div>
                <div className="row">
                    <InputText
                        label={'Naam'}
                        size={'col-sm-6'}
                        name={'name'}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.name}
                    />
                    <ViewText label={'Template nummer'} value={number} />
                </div>

                <div className="row">
                    <InputSelect
                        label="Documentgroep"
                        name={'documentGroupId'}
                        value={documentGroupId}
                        options={this.props.documentGroups}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.group}
                    />
                    <ViewText label={'Documenttype'} value={documentTemplateType ? documentTemplateType.name : ''} />
                </div>

                <div className="row">
                    <InputText
                        label={'Kenmerk'}
                        size={'col-sm-6'}
                        name={'characteristic'}
                        value={characteristic}
                        onChangeAction={this.handleInputChange}
                    />
                    {this.state.isGeneral && (
                        <InputMultiSelect
                            label="Rollen"
                            name="roleIds"
                            value={roleIdsSelected}
                            options={this.props.roles}
                            onChangeAction={this.handleRoleIds}
                        />
                    )}
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <InputTinyMCE
                                label={'Tekst'}
                                initialValue={initialHtmlBody}
                                value={htmlBody}
                                onChangeAction={this.handleTextChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <InputToggle
                        label={'Tekst wijzigbaar bij document'}
                        name={'allowChangeHtmlBody'}
                        value={allowChangeHtmlBody}
                        onChangeAction={this.handleInputChange}
                        id={'allowChangeHtmlBody'}
                    />
                </div>
                {this.state.isGeneral && (
                    <div className="row">
                        <InputSelect
                            label="Basis template"
                            name={'baseTemplateId'}
                            value={baseTemplateId}
                            options={this.state.baseTemplates}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                )}
                {this.state.isGeneral && (
                    <div className="row">
                        <InputSelect
                            label="Koptekst"
                            name={'headerTemplateId'}
                            value={headerTemplateId}
                            options={this.state.headerTemplates}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                )}
                {this.state.isGeneral && (
                    <div className="row">
                        <InputSelect
                            label="Footer template"
                            name={'footerTemplateId'}
                            value={footerTemplateId}
                            options={this.state.footerTemplates}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                )}

                <div className="row">
                    <InputToggle
                        label={'Actief'}
                        name={'active'}
                        value={active}
                        onChangeAction={this.handleInputChange}
                        id={'active'}
                    />
                </div>

                <div className="row">
                    <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
                    <ViewText
                        label={'Gemaakt door'}
                        value={createdBy ? createdBy.fullName : 'Onbekend'}
                        link={createdBy ? '/gebruiker/' + createdBy.id : ''}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDocumentTemplate: id => {
        dispatch(fetchDocumentTemplate(id));
    },
});

const mapStateToProps = state => {
    return {
        documentTemplate: state.documentTemplateDetails,
        documentGroups: state.systemData.documentGroups,
        roles: state.systemData.roles,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTemplateFormEdit);
