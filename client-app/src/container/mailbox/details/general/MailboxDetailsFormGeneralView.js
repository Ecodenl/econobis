import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelHeader from '../../../../components/panel/PanelHeader';
import PanelBody from '../../../../components/panel/PanelBody';
import moment from 'moment/moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import { REDIRECT_URL_GMAIL } from '../../../../constants';
import { REDIRECT_URL_MS_OAUTH } from '../../../../constants';

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
        startFetchMail,
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
        // inboundMailgunEnabled,
        inboundMailgunEmail,
    } = mailboxDetails;

    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Weergavenaam'} value={name} />
                        <ViewText label={'E-mail'} value={email} />
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
                            <ViewText label="Inkomende IMAP host" value={imapHost} />
                        ) : (
                            <div className="form-group col-sm-6" />
                        )}

                        {outgoingServerType === 'smtp' ? (
                            <ViewText label="Uitgaande SMTP host" value={smtpHost} />
                        ) : null}

                        {outgoingServerType === 'mailgun' ? (
                            <ViewText label="Uitgaand Mailgun domein" value={mailgunDomain} />
                        ) : null}
                    </div>
                </PanelBody>

                {(incomingServerType === 'imap' || outgoingServerType === 'smtp') && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Instellingen</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <ViewText label={'Gebruikersnaam'} value={username} />
                                <ViewText label={'Wachtwoord'} value="••••••••••" />
                            </div>
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
                            {incomingServerType === 'imap' && (
                                <>
                                    <div className="row">
                                        <ViewText label={'Inbox prefix'} value={imapInboxPrefix} />
                                    </div>
                                    <div className="row">
                                        <ViewText
                                            label={'Zet email als gelezen op server'}
                                            value={emailMarkAsSeen ? 'Ja' : 'Nee'}
                                        />
                                    </div>
                                </>
                            )}
                        </PanelBody>
                    </>
                )}

                {(incomingServerType === 'gmail' || outgoingServerType === 'gmail') && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Gmail api instellingen</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <ViewText label={'Project id'} value={gmailApiSettings?.projectId} />
                                <ViewText label={'Redirect url'} value={REDIRECT_URL_GMAIL} />
                                {/*<div className="form-group col-sm-6">*/}
                                {/*    <label className="col-sm-6">Redirect url</label>*/}
                                {/*    <div className="col-sm-6" style={{ paddingRight: '5px' }} onClick={null}>*/}
                                {/*        {REDIRECT_URL_GMAIL}*/}
                                {/*        <CopyToClipboard text={REDIRECT_URL_GMAIL}>*/}
                                {/*            <a*/}
                                {/*                className="btn btn-success btn-sm pull-right"*/}
                                {/*                style={{ top: '5px' }}*/}
                                {/*                role="button"*/}
                                {/*                onClick={null}*/}
                                {/*                title={'Kopieer sleutel'}*/}
                                {/*            >*/}
                                {/*               <Icon size={14} icon={copy} />{' '}*/}
                                {/*            </a>*/}
                                {/*        </CopyToClipboard>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="row">
                                <ViewText label={'Client id'} value={gmailApiSettings?.clientId} />
                                <ViewText label={'Client secret'} value={gmailApiSettings?.clientSecret} />
                            </div>
                        </PanelBody>
                    </>
                )}

                {(incomingServerType === 'ms-oauth' || outgoingServerType === 'ms-oauth') && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Microsoft Azure api instellingen</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <ViewText label={'Client id'} value={gmailApiSettings?.clientId} />
                                <ViewText label={'Object ID'} value={gmailApiSettings?.projectId} />
                            </div>
                            <div className="row">
                                <ViewText label={'Redirect url'} value={REDIRECT_URL_MS_OAUTH} />
                                <ViewText label={'Client secret waarde'} value="••••••••••" />
                            </div>
                            <div className="row">
                                <ViewText label={'Tenant ID'} value={gmailApiSettings?.tenantId} />
                            </div>
                        </PanelBody>
                    </>
                )}

                {incomingServerType === 'mailgun' && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Mailgun instellingen</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <ViewText
                                    className={'form-group col-sm-12'}
                                    labelSize={'col-sm-3'}
                                    valueSize={'col-sm-9'}
                                    label={'Forward email'}
                                    value={inboundMailgunEmail ? inboundMailgunEmail : 'Nog niet bepaald'}
                                    textToolTip={
                                        'Forward email ' +
                                        email +
                                        ' naar ' +
                                        (inboundMailgunEmail ? inboundMailgunEmail : 'Nog niet bepaald') +
                                        ' om deze in Econobis te ontvangen.'
                                    }
                                />
                            </div>
                        </PanelBody>
                    </>
                )}

                <PanelHeader>
                    <span className="h5">
                        <strong>Log</strong>
                    </span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Datum email laatst opgehaald'}
                            value={dateLastFetched ? moment(dateLastFetched).format('L HH:mm:ss') : 'Nog niet bepaald'}
                        />
                        <ViewText label={'UID email laatst opgehaald'} value={imapIdLastFetched} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Status ophalen van e-mail'}
                            value={
                                startFetchMail ? (
                                    <span style={{ color: 'red' }}>
                                        Procedure bezig vanaf: {moment(startFetchMail).format('L HH:mm:ss')}
                                    </span>
                                ) : (
                                    'wacht op synchronisatie ronde'
                                )
                            }
                        />
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
