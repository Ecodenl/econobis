import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import InputToggle from '../../../components/form/InputToggle';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';
import axios from 'axios';
import InputReactSelect from '../../../components/form/InputReactSelect';

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
            freeFieldsTables: [],
            freeFieldsFieldFormats: [],
            errors: {
                tableId: false,
                fieldFormatId: false,
                fieldName: false,
                visiblePortal: false,
                changePortal: false,
                mandatory: false,
                defaultValue: false,
                freeFieldsTables: false,
                freeFieldsFieldFormats: false,
            },
            errorsMessage: {
                tableId: false,
                fieldFormatId: false,
                fieldName: false,
                visiblePortal: false,
                changePortal: false,
                mandatory: false,
                defaultValue: false,
                freeFieldsTables: false,
                freeFieldsFieldFormats: false,
            },
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        axios.all([FreeFieldsAPI.peekFreeFieldsTables(), FreeFieldsAPI.peekFreeFieldsFieldFormats()]).then(
            axios.spread((payloadFreeFieldsTables, payloadFreeFieldsFieldFormats) => {
                this.setState({
                    freeFieldsTables: payloadFreeFieldsTables.data.data,
                    freeFieldsFieldFormats: payloadFreeFieldsFieldFormats.data.data,
                });
            })
        );
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
        let errorsMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(freeField.tableId + '')) {
            errors.tableId = true;
            errorsMessage.tableId = "verplicht";
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldFormatId + '')) {
            errors.fieldFormatId = true;
            errorsMessage.fieldFormatId = "verplicht";
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldName)) {
            errors.fieldName = true;
            errorsMessage.fieldName = "verplicht";
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.mandatory + '')) {
            errors.mandatory = true;
            errorsMessage.mandatory = "verplicht";
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.visiblePortal + '')) {
            errors.visiblePortal = true;
            errorsMessage.visiblePortal = "verplicht";
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.changePortal + '')) {
            errors.changePortal = true;
            errorsMessage.changePortal = "verplicht";
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.defaultValue)) {
            errors.defaultValue = true;
            errorsMessage.defaultValue = "verplicht";
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorsMessage: errorsMessage });

        // If no errors send form
        !hasErrors &&
            FreeFieldsAPI.newFreeFieldsField(freeField)
                .then(payload => {
                    hashHistory.push(`/vrije-velden/${payload.data.id}`);
                })
                .catch(function(error) {
                    console.log(error);
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
                            <InputReactSelect
                                label={'Op onderdeel'}
                                id="tableId"
                                name={'tableId'}
                                options={this.state.freeFieldsTables}
                                value={tableId}
                                onChangeAction={this.handleReactSelectChange}
                                required={'required'}
                                error={this.state.errors.tableId}
                                errorMessage={this.state.errorsMessage.tableId}
                            />
                            <InputReactSelect
                                label={'Type'}
                                id="fieldFormatId"
                                name={'fieldFormatId'}
                                options={this.state.freeFieldsFieldFormats}
                                value={fieldFormatId}
                                onChangeAction={this.handleReactSelectChange}
                                required={'required'}
                                error={this.state.errors.fieldFormatId}
                                errorMessage={this.state.errorsMessage.fieldFormatId}
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
                                errorMessage={this.state.errorsMessage.fieldName}
                            />
                            <InputToggle
                                label={'Verplicht'}
                                name={'mandatory'}
                                value={mandatory}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.mandatory}
                                errorMessage={this.state.errorsMessage.mandatory}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Zichtbaar in portaal'}
                                name={'visiblePortal'}
                                value={visiblePortal}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.visiblePortal}
                                errorMessage={this.state.errorsMessage.visiblePortal}
                            />
                            <InputToggle
                                label={'Aan te passen in portaal'}
                                name={'changePortal'}
                                value={changePortal}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.changePortal}
                                errorMessage={this.state.errorsMessage.changePortal}
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
                                errorMessage={this.state.errorsMessage.defaultValue}
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

export default FreeFieldNewForm;
