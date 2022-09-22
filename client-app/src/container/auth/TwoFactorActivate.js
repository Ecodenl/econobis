import React, {Component} from 'react';
import MeAPI from "../../api/general/MeAPI";
import Logo from "../../components/logo/Logo";
import {hashHistory, Link} from "react-router";

class TwoFactorActivate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qr: {
                svg: '',
            },
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callActivateTwoFactor().then(() => {
            this.callFetchTwoFactorQr();
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

        MeAPI.fetchTwoFactorQr()
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

    render() {
        return (
            <div className="col-md-4 col-sm-8 col-xs-10 login-form">
                <div className="panel panel-default add">
                    <div className="panel-body">
                        <div className="text-center">
                            <Logo height="150px"/>
                        </div>
                        <div className="row margin-10-top">
                            <div className="col-sm-10 col-md-offset-1">
                                <div dangerouslySetInnerHTML={{__html: this.state.qr.svg}}/>
                            </div>
                        </div>
                        <div className="row">
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
