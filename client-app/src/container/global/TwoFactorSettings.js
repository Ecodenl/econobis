import React, { Component } from 'react';

import Modal from '../../components/modal/Modal';
import MeAPI from '../../api/general/MeAPI';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const TwoFactorSettingsWrapper = props => {
    const navigate = useNavigate();
    return <TwoFactorSettings {...props} navigate={navigate} />;
};

class TwoFactorSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            twoFactorActivated: false,
            recoveryCodes: [],
            password: '',
            hasValidPassword: false,
            errorMessage: '',
            cooperationRequiresTwoFactorAuthentication: false,
        };

        this.checkPasswordHandler = this.checkPasswordHandler.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    checkPasswordHandler(event) {
        event.preventDefault();

        this.setState({ errorMessage: '' });
        MeAPI.checkPassword(this.state.password)
            .then(() => {
                this.setState({ hasValidPassword: true });

                this.fetchTwoFactorStatus();
            })
            .catch(() => {
                this.setState({ errorMessage: 'Het wachtwoord is onjuist' });
            });
    }

    fetchTwoFactorStatus() {
        MeAPI.fetchTwoFactorStatus().then(payload => {
            if (payload.data.twoFactorActivated) {
                MeAPI.fetchTwoFactorRecoveryCodes(this.state.password).then(payload => {
                    this.setState({
                        recoveryCodes: payload.data,
                    });
                });
            }

            this.setState({
                twoFactorActivated: payload.data.twoFactorActivated,
                cooperationRequiresTwoFactorAuthentication: payload.data.cooperationRequiresTwoFactorAuthentication,
            });
        });
    }

    handleTwoFactorEnable = event => {
        event.preventDefault();

        if (
            !confirm(
                'Weet u zeker dat u twee factor authenticatie wilt activeren? U krijgt een QR code te zien die u moet scannen met uw authenticator app.'
            )
        ) {
            return;
        }

        /**
         * Gebruiker heeft zojuist al wachtwoord ingevoerd, deze doorsturen naar activatie scherm zodat deze niet opnieuw hoeft te worden ingegeven.
         */
        this.props.navigate({ pathname: '/two-factor/activate', state: { password: this.state.password } });
    };

    handleTwoFactorDisable = event => {
        event.preventDefault();

        if (!confirm('Weet u zeker dat u twee factor authenticatie wilt uitschakelen?')) {
            return;
        }

        MeAPI.disableTwoFactor(this.state.password).then(() => {
            this.fetchTwoFactorStatus();
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

    handleCloseModal() {
        this.resetState();
        this.props.closeModal();
    }

    resetState() {
        this.setState({
            twoFactorActivated: false,
            recoveryCodes: [],
            password: '',
            hasValidPassword: false,
            errorMessage: '',
            cooperationRequiresTwoFactorAuthentication: false,
        });
    }

    render() {
        if (!this.props.active) {
            return null;
        }

        return (
            <Modal
                buttonCancelText="Sluiten"
                closeModal={this.handleCloseModal}
                showConfirmAction={false}
                title="Twee factor authenticatie instellingen"
            >
                {this.state.errorMessage ? (
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div>
                    {this.state.hasValidPassword ? (
                        <>
                            {this.state.twoFactorActivated ? (
                                <>
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <label>Geactiveerd</label>
                                        </div>
                                        <div className="col-xs-3">Ja</div>
                                        <div className="col-xs-3">
                                            {!this.state.cooperationRequiresTwoFactorAuthentication && (
                                                <a
                                                    href="#"
                                                    onClick={this.handleTwoFactorDisable}
                                                    style={{ color: '#e64a4a' }}
                                                >
                                                    uitschakelen
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <label>Herstelcode</label>
                                        </div>
                                        <div className="col-xs-9">
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
                                </>
                            ) : (
                                <div className="row">
                                    <div className="col-xs-3">
                                        <label>Geactiveerd</label>
                                    </div>
                                    <div className="col-xs-3">Nee</div>
                                    <div className="col-xs-3">
                                        <a href="#" onClick={this.handleTwoFactorEnable}>
                                            activeren
                                        </a>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <form onSubmit={this.checkPasswordHandler}>
                            Voer uw wachtwoord in om de twee factor instellingen te wijzigen.
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
            </Modal>
        );
    }
}

export default TwoFactorSettingsWrapper;
