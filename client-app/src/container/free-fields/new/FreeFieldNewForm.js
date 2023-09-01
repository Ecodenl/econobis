import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import InputToggle from '../../../components/form/InputToggle';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';

class FreeFieldNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freeField: {
                tableId: '',
                fieldFormatId: '',
                fieldName: '',
                visiblePortal: false,
                changePortal: false,
                mandatory: false,
                defaultValue: '',
            },
            errors: {
                tableId: false,
                fieldFormatId: false,
                fieldName: false,
                visiblePortal: false,
                changePortal: false,
                mandatory: false,
                defaultValue: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            freeField: {
                ...this.state.freeField,
                [name]: value,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            freeField: {
                ...this.state.freeField,
                [name]: selectedOption,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { freeField } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(freeField.tableId)) {
            errors.tableId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldFormatId)) {
            errors.fieldFormatId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldName)) {
            errors.fieldName = true;
            hasErrors = true;
        }

        // if (validator.isEmpty(freeField.visiblePortal)) {
        //     errors.visiblePortal = true;
        //     hasErrors = true;
        // }
        //
        // if (validator.isEmpty(freeField.changePortal)) {
        //     errors.changePortal = true;
        //     hasErrors = true;
        // }
        //
        // if (validator.isEmpty(freeField.mandatory)) {
        //     errors.mandatory = true;
        //     hasErrors = true;
        // }

        if (validator.isEmpty(freeField.defaultValue)) {
            errors.defaultValue = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            FreeFieldsAPI.newFreeField(freeField)
                .then(payload => {
                    this.props.fetchSystemData();

                    hashHistory.push(`/free-fields/${payload.data.data.id}`);
                })
                .catch(function(error) {
                    alert('Er is iets mis gegaan met opslaan!');
                });
    };

    render() {
        const {
            tableId,
            fieldFormatId,
            fieldName,
            visiblePortal,
            changePortal,
            mandatory,
            defaultValue,
        } = this.state.freeField;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Op onderdeel"
                                name={'tableId'}
                                value={tableId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.tableId}
                            />
                            <InputText
                                label="Type"
                                name={'fieldFormatId'}
                                value={fieldFormatId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.fieldFormatId}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Veld naam"
                                name={'fieldName'}
                                value={fieldName}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.fieldName}
                            />
                            <InputToggle
                                label={'Verplicht'}
                                name={'mandatory'}
                                value={mandatory}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Zichtbaar in portaal'}
                                name={'visiblePortal'}
                                value={visiblePortal}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                            />
                            <InputToggle
                                label={'Aan te passen in portaal'}
                                name={'changePortal'}
                                value={changePortal}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Standaardwaarde"
                                name={'defaultValue'}
                                value={defaultValue}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.defaultValue}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(null, mapDispatchToProps)(FreeFieldNewForm);
