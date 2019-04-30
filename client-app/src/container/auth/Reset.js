import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';
import passwordValidator from '../../helpers/PasswordValidator';

class Reset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: props.params.token,
            email: props.params.email,
            password: '',
            password_confirmation: '',
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const { token, email, password, password_confirmation } = this.state;

        const url = `${URL_API}/api/password/reset`;
        if (!passwordValidator(password)) {
            this.setState({ passwordError: true });
        } else if (!passwordValidator(password_confirmation)) {
            this.setState({ passwordError: true });
        } else {
            axios
                .post(url, {
                    token,
                    email,
                    password,
                    password_confirmation,
                })
                .then(response => {
                    this.setState({ err: false, passwordError: false });
                    setTimeout(() => {
                        hashHistory.push('/login');
                    }, 2000);
                })
                .catch(error => {
                    this.refs.password.value = '';
                    this.refs.confirm.value = '';
                    this.setState({ err: true, passwordError: false });
                });
        }
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        let error = this.state.err;
        let passwordError = this.state.passwordError;
        let passwordMsg = passwordError
            ? 'Het wachtwoord moet minimaal 8 karakters lang zijn en moet minimaal 1 cijfer en 1 hoofdletter bevatten.'
            : null;
        let msg = !error ? 'Wachtwoord successvol gewijzigd' : 'Wachtwoorden komen niet overeen.';
        let name = !error ? 'alert alert-success' : 'alert alert-danger';
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Wachtwoord wijzigen</div>
                                <div className="panel-body">
                                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                        {error != undefined && (
                                            <div className={name} role="alert">
                                                {msg}
                                            </div>
                                        )}
                                        {passwordMsg != null && (
                                            <div className="alert alert-danger" role="alert">
                                                {passwordMsg}
                                            </div>
                                        )}
                                    </div>
                                    <form className="form-horizontal" role="form" onSubmit={this.onSubmit.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-md-4 control-label">
                                                E-mailadres
                                            </label>

                                            <div className="col-md-6">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="form-control"
                                                    ref="email"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChange.bind(this)}
                                                    required
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password" className="col-md-4 control-label">
                                                Wachtwoord
                                            </label>

                                            <div className="col-md-6">
                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="form-control"
                                                    ref="password"
                                                    name="password"
                                                    onChange={this.onChange.bind(this)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password-confirm" className="col-md-4 control-label">
                                                Herhaal wachtwoord
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    id="password-confirm"
                                                    type="password"
                                                    className="form-control"
                                                    ref="confirm"
                                                    name="password_confirmation"
                                                    onChange={this.onChange.bind(this)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Wachtwoord wijzigen
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reset;
