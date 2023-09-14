import React, { Component } from 'react';
import validator from 'validator';
import FreeFieldsAPI from '../../../../api/free-fields/FreeFieldsAPI';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputToggle from '../../../../components/form/InputToggle';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import axios from 'axios';

class FreeFieldDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            tableId,
            fieldFormatId,
            fieldName,
            mandatory,
            visiblePortal,
            changePortal,
            defaultValue,
        } = props.freeField;

        this.state = {
            freeField: {
                id,
                tableId,
                fieldFormatId,
                fieldName,
                visiblePortal,
                changePortal,
                mandatory,
                defaultValue,
            },
            freeFieldsTables: [],
            freeFieldsFieldFormats: [],
            errors: {
                tableId: false,
                fieldFormatId: false,
                fieldName: false,
                mandatory: false,
                visiblePortal: false,
                changePortal: false,
                defaultValue: false,
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
        let hasErrors = false;

        if (validator.isEmpty(freeField.tableId + '')) {
            errors.tableId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldFormatId + '')) {
            errors.fieldFormatId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldName)) {
            errors.fieldName = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.mandatory + '')) {
            errors.mandatory = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.visiblePortal + '')) {
            errors.visiblePortal = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.changePortal + '')) {
            errors.changePortal = true;
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.defaultValue)) {
            errors.defaultValue = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            FreeFieldsAPI.updateFreeFieldsField(freeField)
                .then(payload => {
                    this.props.fetchFreeField();
                    this.props.switchToView();
                })
                .catch(error => {
                    console.log(error);
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            tableId,
            fieldFormatId,
            fieldName,
            mandatory,
            visiblePortal,
            changePortal,
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
                                error={this.state.errors.freeFieldsTables}
                            />
                            <InputReactSelect
                                label={'Type'}
                                id="fieldFormatId"
                                name={'fieldFormatId'}
                                options={this.state.freeFieldsFieldFormats}
                                value={fieldFormatId}
                                onChangeAction={this.handleReactSelectChange}
                                required={'required'}
                                error={this.state.errors.freeFieldsFieldFormats}
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
                                error={this.state.errors.mandatory}
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
                            />
                            <InputToggle
                                label={'Aan te passen in portaal'}
                                name={'changePortal'}
                                value={changePortal}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.changePortal}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Standaard waarde"
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
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

export default FreeFieldDetailsFormGeneralEdit;
