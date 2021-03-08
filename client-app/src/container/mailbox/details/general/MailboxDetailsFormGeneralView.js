import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelHeader from '../../../../components/panel/PanelHeader';
import PanelBody from '../../../../components/panel/PanelBody';
import moment from 'moment/moment';

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
        dateLastFetched,
        imapIdLastFetched,
        username,
        outgoingServerType,
        mailgunDomain,
        isActive,
        primary,
        linkContactFromEmailToAddress,
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
                        <ViewText label={'Primair (verzend wachtwoord mails)'} value={primary ? 'Ja' : 'Nee'} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={
                                <span>
                                    Koppel contact op email <u>aan</u> adres
                                    <br />
                                    <small style={{ color: '#ccc', fontWeight: 'normal' }}>
                                        Koppeling contact standaard op email <u>afzender</u> adres
                                    </small>
                                </span>
                            }
                            value={linkContactFromEmailToAddress ? 'Ja' : 'Nee'}
                        />
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
                        <ViewText
                            label={'Imap versleutelde verbinding'}
                            value={
                                imapEncryption === 'ssl'
                                    ? 'SSL'
                                    : imapEncryption === 'ssl/novalidate-cert'
                                    ? 'SSL - self-signed certificate'
                                    : imapEncryption === 'tls'
                                    ? 'TLS'
                                    : ''
                            }
                        />
                        {!usesMailgun && <ViewText label="Smtp versleutelde verbinding" value={smtpEncryption} />}
                    </div>
                    <div className="row">
                        <ViewText label={'Inbox prefix'} value={imapInboxPrefix} />
                    </div>
                </PanelBody>
                <PanelHeader>
                    <span className="h5">Log</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Datum email laatst opgehaald'}
                            value={dateLastFetched}
                            value={dateLastFetched ? moment(dateLastFetched).format('L HH:mm:ss') : 'Nog niet bepaald'}
                        />
                        <ViewText label={'UID email laatst opgehaald'} value={imapIdLastFetched} />
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
