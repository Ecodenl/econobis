import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputToggle from '../../../components/form/InputToggle';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from "../../../components/panel/PanelBody";
import PanelHeader from "../../../components/panel/PanelHeader";
import Panel from "../../../components/panel/Panel";
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import {connect} from "react-redux";

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
                useMailgun: false,
                outgoingServerType: 'smtp',
                mailgunDomainId: '',
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
            },
        };
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            mailbox: {
                ...this.state.mailbox,
                [name]: value
            },
        });
    };

    handleInputUseMailgun = event => {
        const target = event.target;
        const checked = target.checked;

        this.setState({
            ...this.state,
            mailbox: {
                ...this.state.mailbox,
                useMailgun: checked,
                outgoingServerType: checked ? 'mailgun' : 'smtp',
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { mailbox }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(mailbox.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(!validator.isEmail(mailbox.email)){
            errors.email = true;
            hasErrors = true;
        };

        if(validator.isEmpty(mailbox.username)){
            errors.username = true;
            hasErrors = true;
        };

        if(validator.isEmpty(mailbox.password)){
            errors.password = true;
            hasErrors = true;
        };

        if(validator.isEmpty(mailbox.smtpHost)){
            errors.smtpHost = true;
            hasErrors = true;
        };

        if(validator.isEmpty(mailbox.smtpPort)){
            errors.smtpPort = true;
            hasErrors = true;
        };

        if(validator.isEmpty(mailbox.imapHost)){
            errors.imapHost = true;
            hasErrors = true;
        };

        if(validator.isEmpty(mailbox.imapPort)){
            errors.imapPort = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            MailboxAPI.newMailbox(mailbox).then((payload) => {
                hashHistory.push(`/mailbox/${payload.data.data.id}`);
            }).catch(function (error) {
                console.log(error)
            });
    };

    render() {
        const { name, email, smtpHost, smtpPort, smtpEncryption, imapHost, imapPort, imapEncryption, imapInboxPrefix, username, password, useMailgun, mailgunDomainId } = this.state.mailbox;
        console.log(this.state)
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Naam"
                                name={"name"}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.name}
                            />
                            <InputText
                                label={"E-mail"}
                                name={"email"}
                                value={email}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.email}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Gebruikersnaam"
                                name={"username"}
                                value={username}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.username}
                            />
                            <InputText
                                label={"Wachtwoord"}
                                name={"password"}
                                value={password}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.password}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label="Gebruik mailgun"
                                name={"useMailgun"}
                                value={useMailgun}
                                onChangeAction={this.handleInputUseMailgun}
                                required={"required"}
                            />
                        </div>
                    </PanelBody>

                    <PanelHeader>
                        <span className="h5">Servergegevens</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Inkomende server"
                                name={"imapHost"}
                                value={imapHost}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.imapHost}
                            />
                            {useMailgun ?
                                <InputSelect
                                    label="Mailgun domein"
                                    name={"mailgunDomainId"}
                                    value={mailgunDomainId}
                                    options={this.props.mailgunDomain}
                                    optionName={'domain'}
                                    onChangeAction={this.handleInputChange}
                                    error={this.state.errors.smtpHost}
                                />
                                :
                                <InputText
                                    label="Uitgaande server"
                                    name={"smtpHost"}
                                    value={smtpHost}
                                    onChangeAction={this.handleInputChange}
                                    required={"required"}
                                    error={this.state.errors.smtpHost}
                                />
                            }

                        </div>
                    </PanelBody>

                    <PanelHeader>
                        <span className="h5">Extra instellingen</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Imap poort"}
                                name={"imapPort"}
                                value={imapPort}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.imapPort}
                            />
                            <InputText
                                label={"Smtp poort"}
                                name={"smtpPort"}
                                value={smtpPort}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.smtpPort}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label="Imap versleutelde verbinding"
                                name={"imapEncryption"}
                                value={imapEncryption}
                                options={[{id: 'ssl', name: 'SSL'}, {id: 'tls', name: 'TLS'}]}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label="Smtp versleutelde verbinding"
                                name={"smtpEncryption"}
                                value={smtpEncryption}
                                options={[{id: 'ssl', name: 'SSL'}, {id: 'tls', name: 'TLS'}]}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label={"Inbox prefix"}
                                name={"imapInboxPrefix"}
                                value={imapInboxPrefix}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.imapInboxPrefix}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        mailgunDomain: state.systemData.mailgunDomain,
    };
};

export default connect(mapStateToProps)(MailboxNewForm);
