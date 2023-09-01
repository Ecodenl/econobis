import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import FreeFieldsAPI from '../../../../api/free-fields/FreeFieldsAPI';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputToggle from '../../../../components/form/InputToggle';
import { fetchFreeFieldDetails } from '../../../../actions/free-field/FreeFieldDetailsActions';

class FreeFieldDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freeField: {
                ...props.freeField,
            },
            errors: {
                table_id: false,
                field_format_id: false,
                field_name: false,
                mandatory: false,
                visible_portal: false,
                change_portal: false,
                default_value: false,
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

    handleSubmit = event => {
        event.preventDefault();

        const { freeField } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        // if (validator.isEmpty(freeField.table_id)) {
        //     errors.table_id = true;
        //     hasErrors = true;
        // }
        //
        // if (validator.isEmpty(freeField.field_format_id)) {
        //     errors.field_format_id = true;
        //     hasErrors = true;
        // }
        //
        // if (validator.isEmpty(freeField.field_name)) {
        //     errors.field_name = true;
        //     hasErrors = true;
        // }

        // if (validator.isEmpty(freeField.mandatory)) {
        //     errors.field_name = true;
        //     hasErrors = true;
        // }
        //
        // if (validator.isEmpty(freeField.visible_portal)) {
        //     errors.field_name = true;
        //     hasErrors = true;
        // }
        //
        // if (validator.isEmpty(freeField.change_portal)) {
        //     errors.field_name = true;
        //     hasErrors = true;
        // }

        // if (validator.isEmpty(freeField.default_value)) {
        //     errors.field_name = true;
        //     hasErrors = true;
        // }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            FreeFieldsAPI.updateFreeField(freeField)
                .then(payload => {
                    this.props.fetchFreeFieldDetails(freeField.id);
                    this.props.switchToView();
                })
                .catch(error => {
                    console.log(error);
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            table_id,
            field_format_id,
            field_name,
            mandatory,
            visible_portal,
            change_portal,
            default_value,
        } = this.state.freeField;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Op onderdeel"
                                name={'table_id'}
                                value={table_id}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.table_id}
                            />
                            <InputText
                                label="Type"
                                name={'field_format_id'}
                                value={field_format_id}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.field_format_id}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Veld naam"
                                name={'field_name'}
                                value={field_name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.field_name}
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
                                name={'visible_portal'}
                                value={visible_portal}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.visible_portal}
                            />
                            <InputToggle
                                label={'Aan te passen in portaal'}
                                name={'change_portal'}
                                value={change_portal}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.change_portal}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Standaard waarde"
                                name={'default_value'}
                                value={default_value}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.default_value}
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

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(null, mapDispatchToProps)(FreeFieldDetailsFormGeneralEdit);
