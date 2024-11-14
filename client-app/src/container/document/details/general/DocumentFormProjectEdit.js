import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import InputText from '../../../../components/form/InputText';
import { updateDocument } from '../../../../actions/document/DocumentDetailsActions';
import DocumentDetailsAPI from '../../../../api/document/DocumentDetailsAPI';
import InputToggle from '../../../../components/form/InputToggle';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

class DocumentDetailsFormProjectEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            project,
            documentType,
            description,
            documentGroup,
            template,
            htmlBody,
            freeText1,
            freeText2,
            filename,
            showOnPortal,
        } = props.documentDetails;

        this.state = {
            documentTypeId: documentType?.id ?? '',
            hasTemplate: template ? true : false,
            document: {
                id: id,
                projectName: project?.name ?? '',
                documentTypeName: documentType?.name ?? '',
                description: description,
                documentGroupName: documentGroup?.name ?? '',
                templateName: template?.name ?? '',
                templateHtmlBody: template?.htmlBody ?? '',
                htmlBody: htmlBody,
                freeText1: freeText1,
                freeText2: freeText2,
                filename: filename,
                showOnPortal: showOnPortal,
            },
            errors: {
                docLinkedAtAny: false,
                documentGroup: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {}

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { document } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(document.description + '')) {
            errors.description = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            DocumentDetailsAPI.updateDocument(document).then(payload => {
                this.props.updateDocument(payload.data.data);

                this.props.switchToView();
            });
    };

    render() {
        const { documentTypeId, hasTemplate, document, errors } = this.state;
        const {
            projectName,
            documentTypeName,
            description,
            documentGroupName,
            templateName,
            templateHtmlBody,
            htmlBody,
            freeText1,
            freeText2,
            filename,
            showOnPortal,
        } = document;

        return (
            <div>
                <div>
                    <div className="row">
                        <InputText label="Project" name={'project'} value={projectName} readOnly={true} />
                        <InputText label="Type" name={'documentType'} value={documentTypeName} readOnly={true} />
                    </div>

                    <div className="row">
                        <InputToggle
                            label="Tonen op portal"
                            name={'showOnPortal'}
                            value={showOnPortal}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12 required">Omschrijving</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className={
                                            'form-control input-sm ' + (errors && errors.description ? 'has-error' : '')
                                        }
                                        name="description"
                                        value={description}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {documentTypeId === 'upload' ? (
                        <>
                            <div className="row margin-30-top">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-sm-12">Documentgroep</label>
                                        </div>
                                        <div className="col-sm-9">{documentGroupName}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-sm-12">Bestandsnaam</label>
                                        </div>
                                        <div className="col-sm-9">{filename}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="row margin-30-top">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-sm-12">Documentgroep</label>
                                        </div>
                                        <div className="col-sm-9">{documentGroupName}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-sm-12">Template</label>
                                        </div>
                                        <div className="col-sm-9">{templateName}</div>
                                    </div>
                                </div>
                            </div>

                            {hasTemplate ? (
                                <div className="row">
                                    <div className="form-group col-sm-12">
                                        <div className="row">
                                            <ViewHtmlAsText
                                                label={'Template inhoud'}
                                                value={htmlBody && htmlBody != '' ? htmlBody : templateHtmlBody}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <div className="row">
                                <div className="form-group col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-sm-12">Tekst veld 1</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="freeText1"
                                                value={freeText1}
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
                                            <label className="col-sm-12">Tekst veld 2</label>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="freeText2"
                                                value={freeText2}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
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
    updateDocument: document => {
        dispatch(updateDocument(document));
    },
});

const mapStateToProps = state => {
    return {
        documentDetails: state.documentDetails,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsFormProjectEdit);
