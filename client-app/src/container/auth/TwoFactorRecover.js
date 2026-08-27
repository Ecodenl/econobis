import React, { Component } from 'react';
import MeAPI from '../../api/general/MeAPI';
import Logo from '../../components/logo/Logo';
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
            recoveryCode: '',
            errorMessage: '',
            success: false,
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

        MeAPI.recoverTwoFactor({ recovery_code: this.state.recoveryCode })
            .then(payload => {
                if (payload.status == 200) {
                    this.setState({ success: true });
                    //this.props.navigate('/two-factor/activate');
                } else {
                    this.setState({
                        recoveryCode: '',
                        errorMessage: 'Herstelcode is ongeldig.',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    recoveryCode: '',
                    errorMessage: 'Herstelcode is ongeldig.',
                });
            });
    };

    handleCancel = event => {
        event.preventDefault();

        this.props.navigate('/two-factor/confirm');
    };

    handleContinue = event => {
        event.preventDefault();

        this.props.navigate('/two-factor/activate');
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

                        {this.state.success ? (
                            <div>
                                <div className="row">
                                    <div className="col-sm-10 col-md-offset-1 alert alert-success">
                                        Herstelcode is geaccepteerd. Klik op doorgaan om twee factor authenticatie
                                        opnieuw in te stellen.
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-10 col-md-offset-1">
                                        <div className="pull-right">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={this.handleContinue}
                                            >
                                                Doorgaan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={this.handleSubmit}>
                                <div className="row margin-10-top">
                                    <div className="col-sm-10 col-md-offset-1">
                                        Geef hier de herstelcode die je bij eerste keer instellen van 2 factor
                                        authenticatie hebt gekregen. (je kan de code inclusief – teken hier invullen)
                                        Als je deze niet (meer) weet kan je contact opnemen met een
                                        key-user/administrator van deze econobis omgeving om je 2 factor authenticatie
                                        te resetten.
                                    </div>
                                </div>

                                <div className="row margin-10-top">
                                    <div className="col-sm-10 col-md-offset-1">
                                        <div className="form-group">
                                            <label htmlFor="username" className="control-label">
                                                Herstelcode
                                            </label>
                                            <input
                                                type="text"
                                                name="recoveryCode"
                                                value={this.state.recoveryCode}
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
                                        <div className="pull-right">
                                            <button
                                                type="button"
                                                className="btn btn-default"
                                                onClick={this.handleCancel}
                                            >
                                                Annuleren
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                style={{ marginLeft: '5px' }}
                                            >
                                                Herstellen
                                            </button>
                                        </div>
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

export default TwoFactorConfirmWrapper;
