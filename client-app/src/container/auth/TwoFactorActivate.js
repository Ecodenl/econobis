import React, { Component } from 'react';
import MeAPI from '../../api/general/MeAPI';
import Logo from '../../components/logo/Logo';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const TwoFactorActivateWrapper = props => {
    const navigate = useNavigate();
    return <TwoFactorActivate {...props} navigate={navigate} />;
};

class TwoFactorActivate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qr: {
                svg: '',
            },
            recoveryCodes: [],
            password: props.location.state ? props.location.state.password : '', // Het wachtwoord kan optioneel worden meegegeven vanuit de aanroepende view zodat de gebruiker hem niet opnieuw hoeft in te geven als dat al net gedaan is.
            hasValidPassword: false,
            errorMessage: '',
        };

        this.checkPasswordHandler = this.checkPasswordHandler.bind(this);
    }

    componentDidMount() {
        if (!this.state.password) {
            return;
        }

        MeAPI.checkPassword(this.state.password).then(() => {
            this.setState({ hasValidPassword: true });

            this.enableTwoFactor();
        });
    }

    checkPasswordHandler(event) {
        event.preventDefault();

        this.setState({ errorMessage: '' });

        MeAPI.checkPassword(this.state.password)
            .then(() => {
                this.setState({ hasValidPassword: true });

                this.enableTwoFactor();
            })
            .catch(e => {
                this.setState({ errorMessage: 'Wachtwoord is onjuist.' });
            });
    }

    enableTwoFactor = () => {
        MeAPI.enableTwoFactor(this.state.password).then(() => {
            this.callFetchTwoFactorQr();
            this.callFetchTwoFactorRecoveryCodes();
        });
    };

    callFetchTwoFactorQr = () => {
        return MeAPI.fetchTwoFactorQr(this.state.password).then(payload => {
            this.setState({
                qr: {
                    ...payload.data,
                },
            });
        });
    };

    callFetchTwoFactorRecoveryCodes = () => {
        MeAPI.fetchTwoFactorRecoveryCodes(this.state.password).then(payload => {
            this.setState({
                recoveryCodes: payload.data,
            });
        });
    };

    renderAlert() {
        if (this.state.errorMessage) {
            return (
                <div className="row margin-10-top text-center">
                    <div className="col-sm-10 col-md-offset-1">
                        <div className="col-sm-10 col-md-offset-1 alert alert-danger login-alert">
                            {this.state.errorMessage}
                        </div>
                    </div>
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
                        {this.renderAlert()}
                        {this.state.hasValidPassword ? (
                            <>
                                <div className="row margin-10-top text-center">
                                    <div className="col-sm-10 col-md-offset-1">
                                        Het gebruik van twee factor authenticatie is ingeschakeld voor uw account. Sla
                                        de herstelcode op een veilige plek op en scan vervolgens de QR-code met een
                                        authenticator app.
                                    </div>
                                </div>
                                <div className="row margin-10-top text-center">
                                    <div className="col-sm-10 col-md-offset-1">
                                        <h4>Herstelcode:</h4>
                                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                                            {this.state.recoveryCodes.map(code => {
                                                return (
                                                    <li key={code} style={{ 'font-family': 'courier' }}>
                                                        {code}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="row margin-10-top text-center">
                                    <div className="col-sm-10 col-md-offset-1">
                                        <h4>QR</h4>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.qr.svg }} />
                                    </div>
                                </div>
                                <div className="row margin-10-top">
                                    <div className="col-sm-10 col-md-offset-1">
                                        <div className="btn-group pull-right">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    this.props.navigate(`/two-factor/confirm`);
                                                }}
                                            >
                                                Doorgaan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={this.checkPasswordHandler}>
                                Voer uw wachtwoord opnieuw in om twee factor authenticatie te activeren.
                                <br />
                                <div className="row">
                                    <div className="col-xs-6">
                                        <input
                                            placeholder="Wachtwoord"
                                            className="form-control input-sm"
                                            type="password"
                                            value={this.state.password}
                                            onChange={e => this.setState({ password: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-xs-6">
                                        <button type="submit" className="btn btn-primary btn-sm">
                                            Ontgrendel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default TwoFactorActivateWrapper;
