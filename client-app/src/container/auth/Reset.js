import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import passwordValidator from '../../helpers/PasswordValidator';
import { isEmpty } from 'lodash';

// Functionele wrapper voor de class component
const ResetWrapper = props => {
    const navigate = useNavigate();
    return <Reset {...props} navigate={navigate} />;
};

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
            this.setState({ passwordError: true, passwordError2: false });
        } else if (!passwordValidator(password_confirmation)) {
            this.setState({ passwordError: true, passwordError2: false });
        } else if (password != password_confirmation) {
            this.setState({ passwordError: false, passwordError2: true });
        } else {
            axios
                .post(url, {
                    token,
                    email,
                    password,
                    password_confirmation,
                })
                .then(response => {
                    if (isEmpty(response.data)) {
                        this.setState({ err: false, errMessage: '', passwordError: false, passwordError2: false });
                        setTimeout(() => {
                            this.props.navigate('/login');
                        }, 2000);
                    } else {
                        // console.log(response.data);
                        this.setState({
                            err: true,
                            errMessage: response.data,
                            passwordError: false,
                            passwordError2: false,
                        });
                    }
                })
                .catch(error => {
                    // console.log(error);
                    this.refs.password.value = '';
                    this.refs.confirm.value = '';
                    this.setState({
                        err: true,
                        errMessage: 'Onbekende fout bij wijzigen wachtwoord',
                        passwordError: false,
                        passwordError2: false,
                    });
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
            ? 'Het wachtwoord moet minimaal 8 karakters lang zijn en moet minimaal 1 cijfer, 1 kleine letter en 1 hoofdletter bevatten. Het wachtwoord mag geen spaties bevatten.'
            : null;
        let passwordError2 = this.state.passwordError2;
        let passwordMsg2 = passwordError2 ? 'Wachtwoorden komen niet overeen.' : null;
        let msg = '';
        if (!error) {
            msg = 'Wachtwoord successvol gewijzigd';
        } else if (this.state.errMessage === 'passwords.token') {
            msg =
                'Er is helaas iets fout gegaan met de activeringslink om je wachtwoord te resetten. \n' +
                'Wij adviseren je om via het inlogscherm met de link ‘Wachtwoord vergeten?’ een nieuw activeringslink aan te vragen. \n' +
                'Mocht het probleem zich blijven voordoen, neem dan contact op met Econobis.\n';
        } else {
            msg = 'Onbekende fout bij wijzigen wachtwoord';
        }
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
                                        {passwordMsg2 != null && (
                                            <div className="alert alert-danger" role="alert">
                                                {passwordMsg2}
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

export default ResetWrapper;
