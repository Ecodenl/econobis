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
import { checkFieldRecord } from '../../../../helpers/FreeFieldsHelpers';
import ViewText from '../../../../components/form/ViewText';

class FreeFieldDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            tableId,
            tablePrefixFieldNameWebform,
            fieldFormatId,
            fieldName,
            fieldNameWebform,
            visiblePortal,
            changePortal,
            mandatory,
            defaultValue,
            exportable,
            sortOrder,
            mask,
        } = props.freeField;

        this.state = {
            freeField: {
                id,
                tableId,
                tablePrefixFieldNameWebform,
                fieldFormatId,
                fieldName,
                fieldNameWebform,
                visiblePortal,
                changePortal,
                mandatory,
                defaultValue,
                exportable,
                sortOrder,
                mask,
            },
            freeFieldsTables: [],
            freeFieldsFieldFormats: [],
            errors: {
                tableId: false,
                fieldFormatId: false,
                fieldName: false,
                fieldNameWebform: false,
                visiblePortal: false,
                changePortal: false,
                mandatory: false,
                defaultValue: false,
                exportable: false,
                sortOrder: false,
                mask: false,
            },
            errorsMessage: {
                tableId: '',
                fieldFormatId: '',
                fieldName: '',
                fieldNameWebform: '',
                visiblePortal: '',
                changePortal: '',
                mandatory: '',
                defaultValue: '',
                exportable: '',
                sortOrder: '',
                mask: '',
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

        const response = checkFieldRecord({
            fieldFormatType: 'defaultValue',
            defaultValue: this.state.freeField.defaultValue,
            mandatory: this.state.freeField.mandatory,
            mask: this.state.freeField.mask,
        });
        if (response) {
            errorsMessage.defaultValue = response;
            errors.defaultValue = true;
            hasErrors = true;
        }

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

        if (
            freeField.fieldNameWebform != null &&
            !validator.isEmpty(freeField.fieldNameWebform) &&
            !freeField.fieldNameWebform.match(/^[a-z0-9_]+$/)
        ) {
            errors.fieldNameWebform = true;
            errorsMessage.fieldNameWebform = 'Waarde ongeldig';
            hasErrors = true;
        }

        // if (validator.isEmpty(freeField.mandatory + '')) {
        //     errors.mandatory = true;
        //     errorsMessage.mandatory = 'verplicht';
        //     hasErrors = true;
        // }

        // if (validator.isEmpty(freeField.visiblePortal + '')) {
        //     errors.visiblePortal = true;
        //     errorsMessage.visiblePortal = 'verplicht';
        //     hasErrors = true;
        // }

        // if (validator.isEmpty(freeField.changePortal + '')) {
        //     errors.changePortal = true;
        //     errorsMessage.changePortal = 'verplicht';
        //     hasErrors = true;
        // }

        if (freeField.mandatory && validator.isEmpty(freeField.defaultValue)) {
            errors.defaultValue = true;
            errorsMessage.defaultValue = 'verplicht';
            hasErrors = true;
        }

        // if (validator.isEmpty(freeField.exportable + '')) {
        //     errors.exportable = true;
        //     errorsMessage.exportable = 'verplicht';
        //     hasErrors = true;
        // }

        if (validator.isEmpty(freeField.sortOrder + '')) {
            errors.sortOrder = true;
            errorsMessage.sortOrder = 'verplicht';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorsMessage: errorsMessage });

        // If no errors send form
        !hasErrors &&
            FreeFieldsAPI.updateFreeFieldsField(freeField)
                .then(() => {
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
            tablePrefixFieldNameWebform,
            fieldFormatId,
            fieldName,
            fieldNameWebform,
            visiblePortal,
            changePortal,
            mandatory,
            defaultValue,
            exportable,
            sortOrder,
            mask,
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
                                // onChangeAction={this.handleReactSelectChange}
                                // required={'required'}
                                // error={this.state.errors.tableId}
                                // errorMessage={this.state.errorsMessage.tableId}
                                disabled={true}
                            />
                            <InputReactSelect
                                label={'Type'}
                                id="fieldFormatId"
                                name={'fieldFormatId'}
                                options={this.state.freeFieldsFieldFormats}
                                value={fieldFormatId}
                                // onChangeAction={this.handleReactSelectChange}
                                // required={'required'}
                                // error={this.state.errors.fieldFormatId}
                                // errorMessage={this.state.errorsMessage.fieldFormatId}
                                disabled={true}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Veldnaam"
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
                                // required={'required'}
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
                                // required={'required'}
                                error={this.state.errors.visiblePortal}
                                errorMessage={this.state.errorsMessage.visiblePortal}
                            />
                            <InputToggle
                                label={'Aan te passen in portaal'}
                                name={'changePortal'}
                                value={changePortal}
                                onChangeAction={this.handleInputChange}
                                // required={'required'}
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
                                required={mandatory ? 'required' : ''}
                                error={this.state.errors.defaultValue}
                                errorMessage={this.state.errorsMessage.defaultValue}
                            />
                            <InputToggle
                                label={'Exporteerbaar'}
                                name={'exportable'}
                                value={exportable}
                                onChangeAction={this.handleInputChange}
                                // required={'required'}
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

                        {tablePrefixFieldNameWebform != null ? (
                            <div className="row">
                                <ViewText
                                    className={'form-group col-sm-6 '}
                                    label={'Veldnaam webformulier'}
                                    value={fieldNameWebform ? tablePrefixFieldNameWebform + fieldNameWebform : ''}
                                />
                                <InputText
                                    label="Wijzig veldnaam webformulier"
                                    name={'fieldNameWebform'}
                                    value={fieldNameWebform}
                                    size={'col-sm-5'}
                                    onChangeAction={this.handleInputChange}
                                    error={this.state.errors.fieldNameWebform}
                                    errorMessage={this.state.errorsMessage.fieldNameWebform}
                                    textToolTip={
                                        'Te gebruiken veldnaam voor webformulier in camel_case notatie. Alleen kleine letters, cijfers en liggend streepje (undescore) toegestaan.' +
                                        'Veldnamen voor webformulieren hebben altijd een vaste prefix, afhankelijk van onderdeel.'
                                    }
                                />
                            </div>
                        ) : null}

                        <hr />
                        <div className="row">
                            <InputText
                                label="Masker"
                                name={'mask'}
                                value={mask}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.mask}
                                errorMessage={this.state.errorsMessage.mask}
                            />
                            <div className="form-group col-sm-3 ">
                                <div className="col-sm-12">
                                    Legenda:
                                    <br />
                                    9 = nummer
                                    <br />
                                    a = letter
                                    <br />x = nummer / letter
                                    {/*<br />? = optioneel (alles na het ? is optioneel)*/}
                                    <br />
                                    Alle andere karakters zullen letterlijk moeten worden gebruikt
                                </div>
                            </div>
                            <div className="form-group col-sm-3">
                                <div className="col-sm-6">
                                    Voorbeelden:
                                    <br />
                                    999-999
                                    <br />
                                    9a9/999a
                                    <br />
                                    999-99-9999
                                    <br />
                                    xx.xx.xxxx.xx
                                    {/*<br />*/}
                                    {/*99999?-9999*/}
                                    {/*<br />*/}
                                    {/*99999?-9999*/}
                                </div>
                                <div className="col-sm-6">
                                    <br />
                                    123-760
                                    <br />
                                    3q2/887w
                                    <br />
                                    987-65-4329
                                    <br />
                                    12.qq.12aw.3r
                                    {/*<br />*/}
                                    {/*23462*/}
                                    {/*<br />*/}
                                    {/*23462-1231*/}
                                </div>
                            </div>
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
