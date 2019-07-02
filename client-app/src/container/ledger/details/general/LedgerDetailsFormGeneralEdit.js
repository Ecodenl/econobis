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
import InputSelect from '../../../../components/form/InputSelect';
import LedgerDetailsAPI from '../../../../api/ledger/LedgerDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';

class LedgerDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ledger: {
                ...props.ledger,
            },
            errors: {
                description: false,
                vatCodeId: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            ledger: {
                ...this.state.ledger,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { ledger } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(ledger.description)) {
            errors.description = true;
            hasErrors = true;
        }
        if (ledger.twinfieldLedgerCode && ledger.twinfieldLedgerCode !== this.props.ledger.twinfieldLedgerCode) {
            this.props.ledgers.map(ledgerFromMap => {
                if (ledgerFromMap.twinfieldLedgerCode == ledger.twinfieldLedgerCode) {
                    hasErrors = true;
                    errors.twinfieldLedgerCode = true;
                }
            });
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            LedgerDetailsAPI.updateLedger(ledger)
                .then(payload => {
                    this.props.updateState(ledger);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const { description, vatCodeId, twinfieldLedgerCode } = this.state.ledger;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Omschrijving"
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.description}
                            />
                            <InputSelect
                                label={'BTW code'}
                                name={'vatCodeId'}
                                value={vatCodeId}
                                options={this.props.vatCodes}
                                optionName={'description'}
                                onChangeAction={this.handleInputChange}
                                placeholder={'BTW geen'}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Twinfield grootboekcode"
                                name={'twinfieldLedgerCode'}
                                value={twinfieldLedgerCode}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.twinfieldLedgerCode}
                                errorMessage={'Deze grootboekcode wordt al gebruikt.'}
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

export default connect(
    null,
    mapDispatchToProps
)(LedgerDetailsFormGeneralEdit);
