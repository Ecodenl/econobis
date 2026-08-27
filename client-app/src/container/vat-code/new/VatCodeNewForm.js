import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import moment from 'moment';

moment.locale('nl');

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import VatCodeDetailsAPI from '../../../api/vat-code/VatCodeDetailsAPI';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import InputDate from '../../../components/form/InputDate';

// Functionele wrapper voor de class component
const VatCodeNewFormWrapper = props => {
    const navigate = useNavigate();
    return <VatCodeNewForm {...props} navigate={navigate} />;
};

class VatCodeNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vatCode: {
                startDate: '',
                description: '',
                percentage: '',
                twinfieldCode: '',
                twinfieldLedgerCode: '',
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

        if (validator.isEmpty(vatCode.percentage.toString())) {
            errors.percentage = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            VatCodeDetailsAPI.newVatCode(vatCode)
                .then(payload => {
                    this.props.fetchSystemData();

                    this.props.navigate(`/btw-code/${payload.data.data.id}`);
                })
                .catch(function(error) {
                    alert('Er is iets mis gegaan met opslaan!');
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

export default connect(null, mapDispatchToProps)(VatCodeNewFormWrapper);
