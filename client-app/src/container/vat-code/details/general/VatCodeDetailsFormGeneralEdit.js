import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import VatCodeDetailsAPI from '../../../../api/vat-code/VatCodeDetailsAPI';
import InputDate from '../../../../components/form/InputDate';

class VatCodeDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vatCode: {
                ...props.vatCode,
            },
            errors: {
                startDate: false,
                description: false,
                percentage: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            vatCode: {
                ...this.state.vatCode,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            vatCode: {
                ...this.state.vatCode,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { vatCode } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(vatCode.startDate)) {
            errors.startDate = true;
            hasErrors = true;
        }

        if (validator.isEmpty(vatCode.description)) {
            errors.description = true;
            hasErrors = true;
        }

        if (!vatCode.percentage) {
            errors.percentage = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            VatCodeDetailsAPI.updateVatCode(vatCode)
                .then(payload => {
                    this.props.updateState(vatCode);
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const { startDate, description, percentage, twinfieldCode, twinfieldLedgerCode } = this.state.vatCode;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputDate
                                label="Startdatum"
                                name={'startDate'}
                                value={startDate}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                                error={this.state.errors.startDate}
                            />
                            <InputText
                                label="Omschrijving"
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.description}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                type="number"
                                label="Percentage"
                                name={'percentage'}
                                value={percentage}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.percentage}
                            />
                            <InputText
                                label="Twinfield code"
                                name={'twinfieldCode'}
                                value={twinfieldCode}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Twinfield grootboek code"
                                name={'twinfieldLedgerCode'}
                                value={twinfieldLedgerCode}
                                onChangeAction={this.handleInputChange}
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

export default VatCodeDetailsFormGeneralEdit;
