import React, {Component} from 'react';
import MeAPI from "../../api/general/MeAPI";
import Logo from "../../components/logo/Logo";
import {hashHistory} from "react-router";

class TwoFactorConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            twoFactorCode: '',
        };
    }

    componentDidMount() {
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

        MeAPI.confirmTwoFactor({code: this.state.twoFactorCode}).then(payload => {
            if (payload.status == 200) {
                localStorage.setItem('two_factor_token', payload.data.token);
                hashHistory.push('/');
            } else {
                this.setState({
                    twoFactorCode: '',
                });
            }
        });
    };

    render() {
        return (
            <div className="col-md-4 col-sm-8 col-xs-10 login-form">
                <div className="panel panel-default add">
                    <div className="panel-body">
                        <div className="text-center">
                            <Logo height="150px"/>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row margin-10-top">
                                <div className="col-sm-10 col-md-offset-1">
                                    Geef de twee-factor code in die je in je authenticator app hebt gekregen.
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
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-10 col-md-offset-1">
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

export default TwoFactorConfirm;
