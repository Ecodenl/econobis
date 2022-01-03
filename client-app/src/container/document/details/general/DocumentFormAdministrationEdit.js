import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import InputText from '../../../../components/form/InputText';
import { updateDocument } from '../../../../actions/document/DocumentDetailsActions';
import DocumentDetailsAPI from '../../../../api/document/DocumentDetailsAPI';
import InputToggle from '../../../../components/form/InputToggle';

class DocumentDetailsFormAdministrationEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            administration,
            documentType,
            description,
            freeText1,
            freeText2,
            documentGroup,
            template,
            showOnPortal,
        } = props.documentDetails;

        this.state = {
            document: {
                id: id,
                // administration: administration && administration.id,
                documentType: documentType && documentType.id,
                description: description,
                freeText1: freeText1,
                freeText2: freeText2,
                documentGroup: documentGroup && documentGroup.id,
                template: template && template.id,
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
        const { document, errors } = this.state;
        const { documentType, description, freeText1, freeText2, showOnPortal } = document;

        return (
            <div>
                <div>
                    <div className="row">
                        <InputText
                            label="Administration"
                            name={'administration'}
                            value={
                                this.props.documentDetails.administration &&
                                this.props.documentDetails.administration.name
                            }
                            readOnly={true}
                        />
                        <InputText
                            label="Type"
                            name={'documentType'}
                            value={
                                this.props.documentDetails.documentType && this.props.documentDetails.documentType.name
                            }
                            readOnly={true}
                        />
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
                                    <label className="col-sm-12">Omschrijving</label>
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
                                        required={'required'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {documentType === 'upload' ? (
                        <div className="row margin-30-top">
                            <InputText
                                label="Documentgroep"
                                name={'documentGroup'}
                                value={
                                    this.props.documentDetails.documentGroup &&
                                    this.props.documentDetails.documentGroup.name
                                }
                                readOnly={true}
                            />
                            <InputText
                                label="Bestandsnaam"
                                name={'filename'}
                                value={this.props.documentDetails.filename}
                                readOnly={true}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="row margin-30-top">
                                <InputText
                                    label="Documentgroep"
                                    name={'documentGroup'}
                                    value={
                                        this.props.documentDetails.documentGroup &&
                                        this.props.documentDetails.documentGroup.name
                                    }
                                    readOnly={true}
                                />
                                <InputText
                                    label="Template"
                                    name={'template'}
                                    value={
                                        this.props.documentDetails.template && this.props.documentDetails.template.name
                                    }
                                    readOnly={true}
                                />
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsFormAdministrationEdit);
