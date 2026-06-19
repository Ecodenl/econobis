import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import uuid from 'uuid';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import WebformDetailsAPI from '../../../api/webform/WebformDetailsAPI';
import InputSelectGroup from '../../../components/form/InputSelectGroup';
import InputDate from '../../../components/form/InputDate';
import InputCheckbox from '../../../components/form/InputCheckbox';

// Functionele wrapper voor de class component
const WebformNewFormWrapper = props => {
    const navigate = useNavigate();
    return <WebformNewForm {...props} navigate={navigate} />;
};

class WebformNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            webform: {
                id: '',
                name: '',
                apiKey: uuid(),
                maxRequestsPerMinute: '',
                dateStart: '',
                dateEnd: '',
                responsible: '',
            },
            errors: {
                name: false,
                maxRequestsPerMinute: false,
                responsible: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            webform: {
                ...this.state.webform,
                [name]: value,
            },
        });
    }

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            webform: {
                ...this.state.webform,
                [name]: value,
            },
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { webform } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(webform.name)) {
            errors.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty(webform.maxRequestsPerMinute)) {
            errors.maxRequestsPerMinute = true;
            hasErrors = true;
        }

        if (validator.isEmpty(webform.responsible)) {
            errors.responsible = true;
            hasErrors = true;
        }

        if (webform.responsible.search('user') >= 0) {
            webform.responsibleUserId = webform.responsible.replace('user', '');
            webform.responsibleTeamId = '';
        }

        if (webform.responsible.search('team') >= 0) {
            webform.responsibleUserId = '';
            webform.responsibleTeamId = webform.responsible.replace('team', '');
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            WebformDetailsAPI.newWebform(webform)
                .then(payload => {
                    this.props.navigate(`/webformulier/${payload.data.data.id}`);
                })
                .catch(function(error) {
                    console.log(error);
                    alert('Er is iets mis gegaan met opslaan!');
                });
    }

    render() {
        const {
            name,
            apiKey,
            emailAddressErrorReport,
            mailErrorReport,
            maxRequestsPerMinute,
            dateStart,
            dateEnd,
            responsible,
        } = this.state.webform;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Naam"
                                name={'name'}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.name}
                            />
                            <InputText
                                label="Sleutel"
                                name={'apiKey'}
                                value={apiKey}
                                onChangeAction={this.handleInputChange}
                                readOnly={true}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Aanvragen per minuut"
                                type={'number'}
                                name={'maxRequestsPerMinute'}
                                value={maxRequestsPerMinute}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.maxRequestsPerMinute}
                            />
                            <InputText
                                label="Datum sleutel"
                                name="apiKeyDate"
                                value={moment().format('L')}
                                onChangeAction={() => {}}
                                readOnly={true}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Startdatum"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputDate
                                label="Einddatum"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                            <InputSelectGroup
                                label={'Verantwoordelijke'}
                                size={'col-sm-6'}
                                name={'responsible'}
                                optionsInGroups={[
                                    {
                                        name: 'user',
                                        label: 'Gebruikers',
                                        options: this.props.users,
                                        optionName: 'fullName',
                                    },
                                    { name: 'team', label: 'Team', options: this.props.teams },
                                ]}
                                value={responsible}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.responsible}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Emailadres foutrapportage"
                                name={'emailAddressErrorReport'}
                                value={emailAddressErrorReport}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.emailAddressErrorReport}
                            />
                            <InputCheckbox
                                label="Mailen foutrapportage"
                                name={'mailErrorReport'}
                                value={mailErrorReport}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.mailErrorReport}
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

const mapStateToProps = state => {
    return {
        teams: state.systemData.teams,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps, null)(WebformNewFormWrapper);
