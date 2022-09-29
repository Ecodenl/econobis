import React, {Component} from 'react';
import MeAPI from "../../api/general/MeAPI";
import Logo from "../../components/logo/Logo";
import {hashHistory, Link} from "react-router";
import moment from "moment/moment";

class TwoFactorActivate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qr: {
                svg: '',
            },
            recoveryCodes: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callActivateTwoFactor().then(() => {
            this.callFetchTwoFactorQr().then(() => {
                this.callFetchTwoFactorRecoveryCodes();
            });
        });
    }

    callActivateTwoFactor = () => {
        this.setState({isLoading: true, hasError: false});

        return MeAPI.activateTwoFactor()
            .then(payload => {
                this.setState({
                    isLoading: false,
                });
            })
            .catch(error => {
                this.setState({isLoading: false, hasError: true});
            });
    };

    callFetchTwoFactorQr = () => {
        this.setState({isLoading: true, hasError: false});

        return MeAPI.fetchTwoFactorQr()
            .then(payload => {
                this.setState({
                    isLoading: false,
                    qr: {
                        ...payload.data,
                    },
                });
            })
            .catch(error => {
                this.setState({isLoading: false, hasError: true});
            });
    };

    callFetchTwoFactorRecoveryCodes = () => {
        this.setState({isLoading: true, hasError: false});

        MeAPI.fetchTwoFactorRecoveryCodes()
            .then(payload => {
                this.setState({
                    isLoading: false,
                    recoveryCodes: payload.data,
                });
            })
            .catch(error => {
                this.setState({isLoading: false, hasError: true});
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
                        <div className="row margin-10-top text-center">
                            <div className="col-sm-10 col-md-offset-1">
                                Het gebruik van twee factor authenticatie is ingeschakeld voor uw account. Sla de herstelcodes op een veilige plek op en scan vervolgens de QR-code met een authenticator app.
                            </div>
                        </div>
                        <div className="row margin-10-top text-center">
                            <div className="col-sm-10 col-md-offset-1">
                                <h4>Herstelcodes:</h4>
                                <ul style={{listStyleType: 'none', padding: 0}}>
                                    {this.state.recoveryCodes.map((code) => {
                                        return (
                                            <li>{ code }</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="row margin-10-top text-center">
                            <div className="col-sm-10 col-md-offset-1">
                                <h4>QR</h4>
                                <div dangerouslySetInnerHTML={{__html: this.state.qr.svg}}/>
                            </div>
                        </div>
                        <div className="row margin-10-top">
                            <div className="col-sm-10 col-md-offset-1">
                                <div className="btn-group pull-right">
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => {
                                                hashHistory.push(`/two-factor/confirm`);
                                            }}
                                    >
                                        Doorgaan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TwoFactorActivate;
