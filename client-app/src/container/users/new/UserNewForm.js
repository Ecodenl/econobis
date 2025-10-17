import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import UserAPI from '../../../api/user/UserAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import { setError } from '../../../actions/general/ErrorActions';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import InputToggle from '../../../components/form/InputToggle';

// Functionele wrapper voor de class component
const UserNewFormWrapper = props => {
    const navigate = useNavigate();
    return <UserNewForm {...props} navigate={navigate} />;
};

class UserNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: '',
                email: '',
                titleId: '',
                firstName: '',
                lastNamePrefixId: '',
                lastName: '',
                phoneNumber: '',
                mobileNumber: '',
                occupation: '',
                teamId: '',
            },
            errors: {
                email: false,
                firstName: false,
                lastName: false,
                teamId: false,
            },
            errorsMessage: {
                email: '',
                firstName: '',
                lastName: '',
                teamId: '',
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { user } = this.state;

        // Validation
        let errors = {};
        let errorsMessage = {};
        let hasErrors = false;

        if (!validator.isEmail(user.email)) {
            errors.email = true;
            errorsMessage.email = 'E-mail is verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(user.firstName)) {
            errors.firstName = true;
            errorsMessage.firstName = 'Voornaam is verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(user.lastName)) {
            errors.lastName = true;
            errorsMessage.lastName = 'Achternaam is verplicht';
            hasErrors = true;
        }

        if (this.props.requireTeamOnUserCreate && validator.isEmpty(user.teamId)) {
            errors.teamId = true;
            errorsMessage.teamId = 'Toevoegen aan team is verplicht';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorsMessage: errorsMessage });

        // If no errors send form
        !hasErrors &&
            UserAPI.newUser(user)
                .then(payload => {
                    this.props.fetchSystemData();
                    if (payload.data.data.hasAlfrescoAccount) {
                        this.props.setError(
                            200,
                            'Alfresco account voor deze gebruiker bestaat al. Er wordt alleen een nieuw account aangemaakt voor Econobis'
                        );
                    }
                    this.props.navigate(`/gebruiker/${payload.data.data.id}`);
                })
                .catch(
                    function(error) {
                        if (error.response.data.errors && typeof error.response.data.errors.email !== 'undefined') {
                            errors.email = true;
                            this.setState({ ...this.state, errors: errors });
                            this.setState({
                                ...this.state,
                                errorsMessage: {
                                    email: 'Dit email adres is al in gebruik.',
                                },
                            });
                        } else {
                            if (typeof error.response.data.message !== 'undefined') {
                                this.props.setError(error.response.status, error.response.data.message);
                            } else {
                                this.props.setError(error.response.status, null);
                            }
                        }
                    }.bind(this)
                );
    };

    render() {
        const {
            email,
            titleId,
            firstName,
            lastNamePrefixId,
            lastName,
            phoneNumber,
            mobileNumber,
            occupation,
            teamId,
        } = this.state.user;

        const { requireTeamOnUserCreate, teams } = this.props;
        // teams opties samenstellen
        const teamsOptions =
            requireTeamOnUserCreate === false
                ? teams
                : [{ id: 0, name: '** Niet aan een team toevoegen **' }, ...teams];

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label="Aanspreektitel"
                        name={'titleId'}
                        options={this.props.titles}
                        value={titleId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'E-mail'}
                        name={'email'}
                        value={email}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.email}
                        errorMessage={this.state.errorsMessage.email}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Voornaam'}
                        name={'firstName'}
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.firstName}
                        errorMessage={this.state.errorsMessage.firstName}
                    />
                    <InputText
                        label={'Telefoonnummer'}
                        size={'col-sm-6'}
                        name="phoneNumber"
                        value={phoneNumber}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label="Tussenvoegsel"
                        name="lastNamePrefixId"
                        options={this.props.lastNamePrefixes}
                        value={lastNamePrefixId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'Mobiel nummer'}
                        size={'col-sm-6'}
                        name="mobileNumber"
                        value={mobileNumber}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Achternaam"
                        size={'col-sm-6'}
                        name="lastName"
                        value={lastName}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.lastName}
                        errorMessage={this.state.errorsMessage.lastName}
                    />
                    <InputText
                        label="Functie"
                        size={'col-sm-6'}
                        name="occupation"
                        value={occupation}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Toevoegen aan team'}
                        name="teamId"
                        options={teamsOptions}
                        value={teamId}
                        onChangeAction={this.handleInputChange}
                        required={requireTeamOnUserCreate ? 'required' : ''}
                        error={this.state.errors.teamId}
                        errorMessage={this.state.errorsMessage.teamId}
                    />{' '}
                </div>
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        titles: state.systemData.titles,
        teams: state.systemData.teams,
        requireTeamOnUserCreate: state.systemData.cooperation?.require_team_on_user_create,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNewFormWrapper);
