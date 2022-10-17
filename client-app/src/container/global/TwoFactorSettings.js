import React, {Component} from 'react';

import Modal from '../../components/modal/Modal';
import MeAPI from "../../api/general/MeAPI";
import {hashHistory} from "react-router";

class TwoFactorSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            twoFactorActivated: false,
            recoveryCodes: [],
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.active && !this.state.hasLoaded) {
            this.setState({hasLoaded: true});
            MeAPI.fetchTwoFactorStatus().then(payload => {
                if (payload.data.twoFactorActivated) {
                    MeAPI.fetchTwoFactorRecoveryCodes()
                        .then(payload => {
                            this.setState({
                                recoveryCodes: payload.data,
                            });
                        });
                }

                this.setState({
                    twoFactorActivated: payload.data.twoFactorActivated,
                });
            });
        }
    }

    handleTwoFactorActivate = event => {
        event.preventDefault();

        if (!confirm('Weet u zeker dat u twee factor authenticatie wilt activeren? U krijgt een QR code te zien die u moet scannen met uw authenticator app.')) {
            return;
        }

        hashHistory.push('/two-factor/activate');
    };

    render() {
        if (!this.props.active) {
            return null;
        }

        return (
            <Modal
                buttonCancelText="Sluiten"
                closeModal={this.props.closeModal}
                showConfirmAction={false}
                title="Twee factor authenticatie instellingen"
            >
                <div>
                    {this.state.twoFactorActivated ? (
                        <>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label>Geactiveerd</label>
                                </div>
                                <div className="col-xs-3">
                                    Ja
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label>Herstelcodes</label>
                                </div>
                                <div className="col-xs-9">
                                    <ul style={{listStyleType: 'none', padding: 0}}>
                                        {this.state.recoveryCodes.map((code) => {
                                            return (
                                                <li key={code}>{code}</li>
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
                            <div className="col-xs-3">
                                Nee
                            </div>
                            <div className="col-xs-3">
                                <a href="#" onClick={this.handleTwoFactorActivate}>activeren</a>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}

export default TwoFactorSettings;
