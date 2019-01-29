import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputToggle from '../../../components/form/InputToggle';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from '../../../components/panel/PanelHeader';
import Panel from '../../../components/panel/Panel';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';

class MailboxNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailbox: {
                id: '',
                name: '',
                email: '',
                username: '',
                password: '',
                smtpHost: '',
                smtpPort: '',
                smtpEncryption: '',
                imapHost: '',
                imapPort: '',
                imapEncryption: '',
                imapInboxPrefix: '',
                usesMailgun: false,
                outgoingServerType: 'smtp',
                mailgunDomainId: '',
                primary: false,
                isActive: true,
            },
            errors: {
                name: false,
                email: false,
                username: false,
                password: false,
                smtpHost: false,
                smtpPort: false,
                imapHost: false,
                imapPort: false,
                mailgunDomainId: false,
            },
            loading: false,
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            mailbox: {
                ...this.state.mailbox,
                [name]: value,
            },
        });
    };

    handleInputUsesMailgun = event => {
        const target = event.target;
        const checked = target.checked;

        this.setState({
            ...this.state,
            mailbox: {
                ...this.state.mailbox,
                usesMailgun: checked,
                outgoingServerType: checked ? 'mailgun' : 'smtp',
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { mailbox } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(mailbox.name)) {
            errors.name = true;
            hasErrors = true;
        }

        if (!validator.isEmail(mailbox.email)) {
            errors.email = true;
            hasErrors = true;
        }

        if (validator.isEmpty(mailbox.username)) {
            errors.username = true;
            hasErrors = true;
        }

        if (validator.isEmpty(mailbox.password)) {
            errors.password = true;
            hasErrors = true;
        }

        if (mailbox.usesMailgun) {
            if (validator.isEmpty(mailbox.mailgunDomainId.toString())) {
                errors.mailgunDomainId = true;
                hasErrors = true;
            }
        } else {
            if (validator.isEmpty(mailbox.smtpHost)) {
                errors.smtpHost = true;
                hasErrors = true;
            }

            if (validator.isEmpty(mailbox.smtpPort)) {
                errors.smtpPort = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(mailbox.imapHost)) {
            errors.imapHost = true;
            hasErrors = true;
        }

        if (validator.isEmpty(mailbox.imapPort)) {
            errors.imapPort = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            this.setState(currentState => ({ loading: !currentState.loading }), () => {
                MailboxAPI.newMailbox(mailbox)
                    .then(payload => {
                        this.props.fetchSystemData();
                        hashHistory.push(`/mailbox/${payload.data.data.id}`);
                    })
                    .catch(function(error) {
                        console.log(error);
                        alert('Er is iets misgegaan bij het opslaan. Herlaad de pagina.')
                    });
            });
    };

    render() {
        const {
            name,
            email,
            smtpHost,
            smtpPort,
            smtpEncryption,
            imapHost,
            imapPort,
            imapEncryption,
            imapInboxPrefix,
            username,
            password,
            usesMailgun,
            mailgunDomainId,
            primary,
            isActive,
        } = this.state.mailbox;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="WeergaveNaam"
                                name={'name'}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.name}
                            />
                            <InputText
                                label={'E-mail'}
                                name={'email'}
                                value={email}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.email}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Gebruikersnaam"
                                name={'username'}
                                value={username}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.username}
                            />
                            <InputText
                                label={'Wachtwoord'}
                                name={'password'}
                                value={password}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.password}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label="Actief"
                                name={'isActive'}
                                value={isActive}
                                onChangeAction={this.handleInputChange}
                                disabled={primary}
                            />
                            <InputToggle
                                label="Primair"
                                name={'primary'}
                                value={primary}
                                onChangeAction={this.handleInputChange}
                                disabled={!isActive}
                            />
                        </div>
                    </PanelBody>

                    <PanelHeader>
                        <span className="h5">Servergegevens</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Inkomend"
                                name={'imapHost'}
                                value={imapHost}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.imapHost}
                            />
                            <InputToggle
                                label="Gebruikt mailgun"
                                name={'usesMailgun'}
                                value={usesMailgun}
                                onChangeAction={this.handleInputUsesMailgun}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6" />
                            {usesMailgun ? (
                                <InputSelect
                                    label="Uitgaand"
                                    name={'mailgunDomainId'}
                                    value={mailgunDomainId}
                                    options={this.props.mailgunDomain}
                                    optionName={'domain'}
                                    onChangeAction={this.handleInputChange}
                                    error={this.state.errors.mailgunDomainId}
                                />
                            ) : (
                                <InputText
                                    label="Uitgaand"
                                    name={'smtpHost'}
                                    value={smtpHost}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.smtpHost}
                                />
                            )}
                        </div>
                    </PanelBody>

                    <PanelHeader>
                        <span className="h5">Extra instellingen</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Imap poort'}
                                name={'imapPort'}
                                value={imapPort}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.imapPort}
                            />
                            {!usesMailgun && (
                                <InputText
                                    label={'Smtp poort'}
                                    name={'smtpPort'}
                                    value={smtpPort}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.smtpPort}
                                />
                            )}
                        </div>

                        <div className="row">
                            <InputSelect
                                label="Imap versleutelde verbinding"
                                name={'imapEncryption'}
                                value={imapEncryption}
                                options={[{ id: 'ssl', name: 'SSL' }, { id: 'tls', name: 'TLS' }]}
                                onChangeAction={this.handleInputChange}
                            />
                            {!usesMailgun && (
                                <InputSelect
                                    label="Smtp versleutelde verbinding"
                                    name={'smtpEncryption'}
                                    value={smtpEncryption}
                                    options={[{ id: 'ssl', name: 'SSL' }, { id: 'tls', name: 'TLS' }]}
                                    onChangeAction={this.handleInputChange}
                                />
                            )}
                        </div>
                        <div className="row">
                            <InputText
                                label={'Inbox prefix'}
                                name={'imapInboxPrefix'}
                                value={imapInboxPrefix}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.imapInboxPrefix}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                                loading={this.state.loading}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailgunDomain: state.systemData.mailgunDomain,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(MailboxNewForm);
