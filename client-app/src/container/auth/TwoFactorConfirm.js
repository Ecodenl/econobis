import React, { Component } from 'react';
import MeAPI from '../../api/general/MeAPI';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const TwoFactorConfirmWrapper = props => {
    const navigate = useNavigate();
    return <TwoFactorConfirm {...props} navigate={navigate} />;
};

class TwoFactorConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            twoFactorCode: '',
            errorMessage: '',
        };
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

        MeAPI.confirmTwoFactor({ code: this.state.twoFactorCode })
            .then(payload => {
                localStorage.setItem('two_factor_token', payload.data.token);
                this.props.navigate('/');
            })
            .catch(() => {
                this.setState({
                    twoFactorCode: '',
                    errorMessage: 'Ongeldige code.',
                });
            });
    };

    handleCancel = event => {
        event.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('last_activity');
        localStorage.removeItem('last_activity');
        localStorage.removeItem('two_factor_token');

        this.props.navigate('/login');
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
        return (
            <div className="col-md-4 col-sm-8 col-xs-10 login-form">
                <div className="panel panel-default add">
                    <div className="panel-body">
                        <div className="text-center">
                            <Logo height="150px" />
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row margin-10-top">
                                <div className="col-sm-10 col-md-offset-1">
                                    Geef de twee factor code in die je in je authenticator app hebt gekregen.
                                </div>
                            </div>

                            <div className="row margin-10-top">
                                <div className="col-sm-10 col-md-offset-1">
                                    <div className="form-group">
                                        <label htmlFor="username" className="control-label">
                                            Twee factor code
                                        </label>
                                        <input
                                            type="text"
                                            name="twoFactorCode"
                                            value={this.state.twoFactorCode}
                                            className="form-control"
                                            placeholder=""
                                            onChange={this.handleInputChange}
                                            autoComplete={'off'}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                {this.renderAlert()}
                            </div>

                            <div className="row">
                                <div className="col-sm-10 col-md-offset-1">
                                    <Link to="two-factor/recover" className="link-underline">
                                        Gebruik herstelcode
                                    </Link>
                                    <div className="pull-right">
                                        <button type="button" className="btn btn-default" onClick={this.handleCancel}>
                                            Annuleren
                                        </button>
                                        <button type="submit" className="btn btn-primary" style={{ marginLeft: '5px' }}>
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

export default TwoFactorConfirmWrapper;
