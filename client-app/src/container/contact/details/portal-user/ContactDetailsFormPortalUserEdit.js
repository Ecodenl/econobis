import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import validator from 'validator';
import ErrorModal from '../../../../components/modal/ErrorModal';
import PortalUserAPI from '../../../../api/contact/PortalUserAPI';
import * as ContactDetailsActions from '../../../../actions/contact/ContactDetailsActions';
import ViewText from '../../../../components/form/ViewText';

class ContactDetailsFormPortalUserEdit extends Component {
    constructor(props) {
        super(props);

        const { id, email, blocked, failedLogins, blockedUntilFormatted } = props.portalUser;

        this.state = {
            portalUser: {
                id,
                email,
                blocked,
                failedLogins,
                blockedUntilFormatted,
            },
            errors: {
                email: false,
            },
            showErrorModal: false,
            modalErrorMessage: '',
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            portalUser: {
                ...this.state.portalUser,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { portalUser } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (!validator.isEmail(portalUser.email)) {
            errors.email = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PortalUserAPI.updatePortalUser(portalUser)
                .then(payload => {
                    this.props.dispatch(ContactDetailsActions.updatePortalUser(portalUser));
                    this.props.switchToView();
                })
                .catch(error => {
                    // let errorObject = JSON.parse(JSON.stringify(error));

                    let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';

                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }

                    this.setState({
                        showErrorModal: true,
                        modalErrorMessage: errorMessage,
                    });
                });
    };

    handleUnBlock = event => {
        event.preventDefault();

        PortalUserAPI.unblockUser(this.state.portalUser.id).then(() => {
            this.props.dispatch(
                ContactDetailsActions.updatePortalUser({
                    ...this.state.portalUser,
                    blocked: false,
                    failedLogins: 0,
                    blockedUntilFormatted: null,
                })
            );
            this.props.switchToView();
        });
    };
    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    handleTwoFactorReset = event => {
        event.preventDefault();

        if (!confirm('Weet u zeker dat u de twee factor authenticatie wilt resetten voor deze portal gebruiker?')) {
            return;
        }

        PortalUserAPI.resetTwoFactor(this.state.portalUser.id).then(() => {
            this.props.dispatch(
                ContactDetailsActions.updatePortalUser({
                    ...this.state.portalUser,
                    hasTwoFactorEnabled: false,
                })
            );
            this.props.switchToView();
        });
    };

    render() {
        const { email, blocked, failedLogins, blockedUntilFormatted } = this.state.portalUser;

        return (
            <React.Fragment>
                <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <InputText
                            label={'Inlog emailadres'}
                            id={'email'}
                            size={'col-sm-6'}
                            name={'email'}
                            value={email}
                            onChangeAction={this.handleInputChange}
                            required={'required'}
                            error={this.state.errors.email}
                        />

                        <div className="form-group col-sm-6">
                            <label className="col-sm-6">Twee factor authenticatie</label>
                            <div className="col-sm-3">{this.props.portalUser.hasTwoFactorEnabled ? 'Ja' : 'Nee'}</div>
                            {this.props.portalUser.hasTwoFactorEnabled ? (
                                <a href="#" className="col-sm-3" onClick={this.handleTwoFactorReset}>
                                    reset
                                </a>
                            ) : null}
                        </div>
                    </div>
                    <div className="row">
                        <ViewText
                            className={'form-group col-sm-6'}
                            label={'Geblokkeerd tot'}
                            value={blockedUntilFormatted}
                        />
                        <ViewText
                            className={'form-group col-sm-6'}
                            label={'Foutieve loginpogingen'}
                            value={failedLogins}
                        />
                    </div>

                    <PanelFooter>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                            {blocked === true ? (
                                <ButtonText buttonText={'Deblokkeren'} onClickAction={this.handleUnBlock} />
                            ) : null}
                        </div>
                    </PanelFooter>
                </form>

                {this.state.showErrorModal && (
                    <ErrorModal
                        closeModal={this.closeErrorModal}
                        title={'Fout bij opslaan'}
                        errorMessage={this.state.modalErrorMessage}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        portalUser: state.contactDetails.portalUser,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPortalUserEdit);
