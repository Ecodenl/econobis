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
            exportable,
            sortOrder,
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
                exportable,
                sortOrder,
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
                sortOrder: false,
            },
            errorsMessage: {
                tableId: false,
                fieldFormatId: false,
                fieldName: false,
                mandatory: false,
                visiblePortal: false,
                changePortal: false,
                defaultValue: false,
                sortOrder: false,
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
            errorsMessage.tableId = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldFormatId + '')) {
            errors.fieldFormatId = true;
            errorsMessage.fieldFormatId = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.fieldName)) {
            errors.fieldName = true;
            errorsMessage.fieldName = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.mandatory + '')) {
            errors.mandatory = true;
            errorsMessage.mandatory = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.visiblePortal + '')) {
            errors.visiblePortal = true;
            errorsMessage.visiblePortal = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.changePortal + '')) {
            errors.changePortal = true;
            errorsMessage.changePortal = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.defaultValue)) {
            errors.defaultValue = true;
            errorsMessage.defaultValue = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.exportable + '')) {
            errors.exportable = true;
            errorsMessage.exportable = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(freeField.sortOrder + '')) {
            errors.sortOrder = true;
            errorsMessage.sortOrder = 'verplicht';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorsMessage: errorsMessage });

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
            exportable,
            sortOrder,
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
                                errorMessage={this.state.errorsMessage.freeFieldsTables}
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
                                errorMessage={this.state.errorsMessage.freeFieldsFieldFormats}
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
                                label="Standaard waarde"
                                name={'defaultValue'}
                                value={defaultValue}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.defaultValue}
                                errorMessage={this.state.errorsMessage.defaultValue}
                            />
                            <InputToggle
                                label={'Exporteerbaar'}
                                name={'exportable'}
                                value={exportable}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.exportable}
                                errorMessage={this.state.errorsMessage.exportable}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Volgorde"
                                name={'sortOrder'}
                                value={sortOrder}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.sortOrder}
                                errorMessage={this.state.errorsMessage.sortOrder}
                                type={'number'}
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
