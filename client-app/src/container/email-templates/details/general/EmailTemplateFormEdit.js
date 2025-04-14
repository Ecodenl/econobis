import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';

import { fetchEmailTemplate } from '../../../../actions/email-templates/EmailTemplateDetailsActions';
import InputTinyMCE from '../../../../components/form/InputTinyMCE';
import validator from 'validator';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputSelect from '../../../../components/form/InputSelect';
import DocumentsAPI from '../../../../api/document/DocumentsAPI';

class EmailTemplateFormEdit extends Component {
    constructor(props) {
        super(props);
        const { id, name, subject, htmlBody, defaultAttachmentDocument } = props.emailTemplate;

        this.state = {
            defaultEmailDocuments: [],
            emailTemplate: {
                id,
                name,
                subject: subject ? subject : '',
                htmlBody: htmlBody ? htmlBody : '',
                defaultAttachmentDocumentId: defaultAttachmentDocument ? defaultAttachmentDocument.id : '',
            },
            errors: {
                name: false,
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
            EmailTemplateAPI.updateEmailTemplate(emailTemplate).then(payload => {
                this.props.fetchEmailTemplate(payload.id);
                this.props.switchToView();
            });
    };

    render() {
        const { name, subject, htmlBody, defaultAttachmentDocumentId } = this.state.emailTemplate;
        const { createdBy } = this.props.emailTemplate;
        const initialHtmlBody = this.props.emailTemplate.htmlBody;
        return (
            <div>
                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12 required">Naam</label>
                            </div>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className={`form-control input-sm ` + (this.state.errors.name ? 'has-error' : '')}
                                    name="name"
                                    value={name}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12">Standaard onderwerp</label>
                            </div>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    name="subject"
                                    value={subject}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <InputSelect
                        label="Standaard E-mail bijlage"
                        name={'defaultAttachmentDocumentId'}
                        value={defaultAttachmentDocumentId}
                        options={this.state.defaultEmailDocuments}
                        optionName={'filename'}
                        onChangeAction={this.handleInputChange}
                    />
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

                <div className="row margin-10-top" onClick={this.props.switchToEdit}>
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12">Gemaakt door</label>
                            </div>
                            <div className="col-sm-9">
                                <Link to={createdBy ? 'gebruiker/' + createdBy.id : ''} className="link-underline">
                                    {createdBy ? createdBy.fullName : ''}
                                </Link>
                            </div>
                        </div>
                    </div>
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
    fetchEmailTemplate: id => {
        dispatch(fetchEmailTemplate(id));
    },
});

const mapStateToProps = state => {
    return {
        emailTemplate: state.emailTemplate,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateFormEdit);
