import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AuthAPI from '../../api/general/AuthAPI';
import Logo from '../../components/logo/Logo';
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

        const { username, password } = this.state;
        console.log('hier gaan we startLoginWithPKCE doen');
        AuthAPI.startLoginWithPKCE(username, password).then(result => {
            if (result?.error) {
                console.log('error', result.error);
                this.setState({
                    username: '',
                    password: '',
                    errorMessage: result.error,
                });
            }
            // anders: je wordt direct gerefreshed naar de authorize endpoint
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

export default LoginWrapper;
