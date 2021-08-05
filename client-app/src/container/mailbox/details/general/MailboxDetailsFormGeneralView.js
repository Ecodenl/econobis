import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelHeader from '../../../../components/panel/PanelHeader';
import PanelBody from '../../../../components/panel/PanelBody';
import moment from 'moment/moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import { REDIRECT_URL } from '../../../../constants';

function MailboxDetailsFormGeneralView({ mailboxDetails, switchToEdit }) {
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
        incomingServerType,
        outgoingServerType,
        mailboxServerTypes,
        mailgunDomain,
        isActive,
        primary,
        linkContactFromEmailToAddress,
        emailMarkAsSeen,
        gmailApiSettings,
    } = mailboxDetails;

    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Weergavenaam'} value={name} />
                        <ViewText label={'E-mail'} value={email} />
                    </div>

                    {incomingServerType === 'gmail' && outgoingServerType === 'gmail' ? null : (
                        <div className="row">
                            <ViewText label={'Gebruikersnaam'} value={username} />
                            <ViewText label={'Wachtwoord'} value="••••••••••" />
                        </div>
                    )}

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
                    <span className="h5">
                        <strong>Servergegevens</strong>
                    </span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Inkomende mail type'} value={mailboxServerTypes.incomingServerType?.name} />
                        <ViewText label={'Uitgaande mail type'} value={mailboxServerTypes.outgoingServerType?.name} />
                    </div>
                    <div className="row">
                        {incomingServerType === 'imap' ? (
                            <ViewText label="Inkomend" value={imapHost} />
                        ) : (
                            <div className="form-group col-sm-6" />
                        )}

                        {outgoingServerType === 'smtp' ? <ViewText label="Uitgaand" value={smtpHost} /> : null}

                        {outgoingServerType === 'mailgun' ? <ViewText label="Uitgaand" value={mailgunDomain} /> : null}
                    </div>
                </PanelBody>

                {(incomingServerType === 'gmail' || outgoingServerType === 'gmail') && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Servergegevens</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <ViewText label={'Project id'} value={gmailApiSettings?.projectId} />
                                <div className="form-group col-sm-6">
                                    <label className="col-sm-6">Redirect url</label>
                                    <div className="col-sm-6" style={{ paddingRight: '5px' }} onClick={null}>
                                        {REDIRECT_URL}
                                        <CopyToClipboard text={REDIRECT_URL}>
                                            <span
                                                className="glyphicon glyphicon-copy mybtn-success pull-right"
                                                style={{ top: '5px' }}
                                                role="button"
                                                onClick={null}
                                                title={'Kopieer sleutel'}
                                            />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <ViewText label={'Client id'} value={gmailApiSettings?.clientId} />
                                <ViewText label={'Client secret'} value={gmailApiSettings?.clientSecret} />
                            </div>
                        </PanelBody>
                    </>
                )}

                <PanelHeader>
                    <span className="h5">
                        <strong>Extra instellingen</strong>
                    </span>
                </PanelHeader>
                <PanelBody>
                    {incomingServerType !== 'imap' && outgoingServerType !== 'smtp' ? null : (
                        <>
                            <div className="row">
                                {incomingServerType === 'imap' ? (
                                    <ViewText label={'Imap poort'} value={imapPort} />
                                ) : (
                                    <div className="form-group col-sm-6" />
                                )}
                                {outgoingServerType === 'smtp' && <ViewText label="Smtp poort" value={smtpPort} />}
                            </div>
                            <div className="row">
                                {incomingServerType === 'imap' ? (
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
                                ) : (
                                    <div className="form-group col-sm-6" />
                                )}

                                {outgoingServerType === 'smtp' && (
                                    <ViewText label="Smtp versleutelde verbinding" value={smtpEncryption} />
                                )}
                            </div>
                        </>
                    )}
                    <div className="row">
                        <ViewText label={'Inbox prefix'} value={imapInboxPrefix} />
                        <ViewText label={'Zet email als gelezen op server'} value={emailMarkAsSeen ? 'Ja' : 'Nee'} />
                    </div>
                </PanelBody>
                <PanelHeader>
                    <span className="h5">
                        <strong>Log</strong>
                    </span>
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
}

const mapStateToProps = state => {
    return {
        mailboxDetails: state.mailboxDetails,
        usesMailgun: state.systemData.usesMailgun,
        mailgunDomain: state.systemData.mailgunDomain,
    };
};

export default connect(mapStateToProps)(MailboxDetailsFormGeneralView);
