import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { authSuccess } from '../../actions/general/AuthActions';
import AuthAPI from '../../api/general/AuthAPI';
import Logo from '../../components/logo/Logo';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const loginCredentials = {
            username: this.state.username,
            password: this.state.password
        };

        AuthAPI.loginUser(loginCredentials).then((payload) => {
            if (payload.status == 200) {
                localStorage.setItem('access_token', payload.data.access_token);
                localStorage.setItem('refresh_token', payload.data.refresh_token);

                this.props.authSuccess();

                hashHistory.push("/");
            } else {
                this.setState({
                    username: '',
                    password: '',
                    errorMessage: 'Verkeerde inloggegevens ingevuld!'
                });
            }
        });
    };

    renderAlert() {
        if (this.state.errorMessage) {
            return (
                <div className="alert alert-danger login-alert">
                    {this.state.errorMessage}
                </div>
            )
        }
    }

    render() {
        const {username, password} = this.state;

        return (
            <div className="col-md-4 col-sm-8 col-xs-10 login-form">
                <div className="panel panel-default add">
                    <div className="panel-body">
                        <div className="text-center">
                            <Logo height="150px" />
                        </div>
                        <form onSubmit={this.handleSubmit}>

                            <div className="col-sm-10 col-md-offset-1">
                                <div className="form-group">
                                    <label htmlFor="username" className="control-label">Email:</label>
                                    <input type="text" name="username" value={username} className="form-control"
                                           placeholder="Email..." onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="control-label">Wachtwoord:</label>
                                    <input type="password" name="password" value={password} className="form-control"
                                           placeholder="Wachtwoord ..." onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            {this.renderAlert()}
                            <div className="row extra-space-above">
                                <div className="col-sm-10 col-md-offset-1">
                                    <div className="btn-group pull-right">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    authSuccess: () => {
        dispatch(authSuccess());
    },
});

export default connect(null, mapDispatchToProps)(Login);
