import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelHeader from '../../../../components/panel/PanelHeader';
import PanelBody from '../../../../components/panel/PanelBody';

const MailboxDetailsFormGeneralView = props => {
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
        outgoingServerType,
        mailgunDomain,
        isActive,
        primary,
    } = props.mailboxDetails;
    const usesMailgun = outgoingServerType === 'mailgun' ? true : false;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Weergavenaam'} value={name} />
                        <ViewText label={'E-mail'} value={email} />
                    </div>
                    <div className="row">
                        <ViewText label={'Gebruikersnaam'} value={username} />
                        <ViewText label={'Wachtwoord'} value="••••••••••" />
                    </div>
                    <div className="row">
                        <ViewText label="Actief" value={isActive ? 'Ja' : 'Nee'} />
                        <ViewText label={'Primair'} value={primary ? 'Ja' : 'Nee'} />
                    </div>
                </PanelBody>

                <PanelHeader>
                    <span className="h5">Servergegevens</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label="Inkomend" value={imapHost} />
                        <ViewText
                            label={'Gebruikt mailgun'}
                            value={props.mailboxDetails.outgoingServerType === 'mailgun' ? 'Ja' : 'Nee'}
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6" />
                        {usesMailgun ? (
                            <ViewText label="Uitgaand" value={mailgunDomain} />
                        ) : (
                            <ViewText label="Uitgaand" value={smtpHost} />
                        )}
                    </div>
                </PanelBody>

                <PanelHeader>
                    <span className="h5">Extra instellingen</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Imap poort'} value={imapPort} />
                        {!usesMailgun && <ViewText label="Smtp poort" value={smtpPort} />}
                    </div>
                    <div className="row">
                        <ViewText label={'Imap versleutelde verbinding'} value={imapEncryption} />
                        {!usesMailgun && <ViewText label="Smtp versleutelde verbinding" value={smtpEncryption} />}
                    </div>
                    <div className="row">
                        <ViewText label={'Inbox prefix'} value={imapInboxPrefix} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        mailboxDetails: state.mailboxDetails,
        usesMailgun: state.systemData.usesMailgun,
        mailgunDomain: state.systemData.mailgunDomain,
    };
};

export default connect(mapStateToProps)(MailboxDetailsFormGeneralView);
