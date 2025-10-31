import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { authSuccess } from '../../actions/general/AuthActions';
import AuthAPI from '../../api/general/AuthAPI';
import Logo from '../../components/logo/Logo';
import moment from 'moment';
import MeAPI from '../../api/general/MeAPI';
import VersionAPI from '../../api/general/VersionAPI';

// Functionele wrapper voor de class component
const LoginWrapper = props => {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />;
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            version: '',
        };
    }

    componentDidMount() {
        VersionAPI.fetchVersion().then(response => {
            this.setState({ version: response.data.version });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const loginCredentials = {
            username: this.state.username,
            password: this.state.password,
        };

        AuthAPI.loginUser(loginCredentials).then(payload => {
            if (payload.status == 200) {
                localStorage.setItem('access_token', payload.data.access_token);
                localStorage.setItem('refresh_token', payload.data.refresh_token);
                localStorage.setItem('last_activity', moment().format());

                this.props.authSuccess();

                MeAPI.fetchTwoFactorStatus().then(payload => {
                    if (!payload.data.requireTwoFactorAuthentication) {
                        this.props.navigate('/');
                        return;
                    }

                    if (!payload.data.twoFactorActivated) {
                        /**
                         * We geven het wachtwoord onderwater mee naar de two-factor activatie pagina.
                         * Voor het aanroepen van activatie api is bevestiging van huidig wachtwoord verplicht via de header.
                         * Omdat de gebruiker zojuist heeft ingelogd met zijn wachtwoord is het onzinnig om deze daar meteen nog eens te vragen.
                         */
                        // this.props.navigate({
                        //     pathname: '/two-factor/activate',
                        //     state: { password: this.state.password },
                        // });
                        this.props.navigate('/two-factor/activate', {
                            state: { password: this.state.password },
                        });
                        return;
                    }

                    if (payload.data.hasValidToken) {
                        this.props.navigate('/');
                        return;
                    }

                    this.props.navigate('/two-factor/confirm');
                });
            } else {
                this.setState({
                    username: '',
                    password: '',
                    errorMessage: payload ? payload.error : 'Verkeerde inloggegevens ingevuld!',
                });
            }
        });
    };

    renderAlert() {
        if (this.state.errorMessage) {
            return (
                <div className="col-sm-10 col-md-offset-1 alert alert-danger login-alert">
                    {this.state.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { username, password, version } = this.state;

        return (
            <div className="col-md-4 col-sm-8 col-xs-10 login-form">
                <div className="panel panel-default add">
                    <div className="panel-body">
                        <div className="text-center">
                            <Logo height="150px" />
                            <h4 className="text-center">
                                <i>Versie: {version}</i>
                            </h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row margin-10-top">
                                <div className="col-sm-10 col-md-offset-1">
                                    <div className="form-group">
                                        <label htmlFor="username" className="control-label">
                                            E-mail:
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={username}
                                            className="form-control"
                                            placeholder="E-mail..."
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="control-label">
                                            Wachtwoord:
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            className="form-control"
                                            placeholder="Wachtwoord ..."
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                </div>
                                {this.renderAlert()}
                            </div>

                            <div className="row">
                                <div className="col-sm-10 col-md-offset-1">
                                    <Link to="/wachtwoord-vergeten" className="link-underline">
                                        Wachtwoord vergeten?
                                    </Link>
                                    <div className="btn-group pull-right">
                                        <button type="submit" className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    authSuccess: () => {
        dispatch(authSuccess());
    },
});

export default connect(null, mapDispatchToProps)(LoginWrapper);
