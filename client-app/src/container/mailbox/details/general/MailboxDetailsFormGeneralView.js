import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from "../../../../components/panel/Panel";
import PanelHeader from "../../../../components/panel/PanelHeader";
import PanelBody from "../../../../components/panel/PanelBody";

const MailboxDetailsFormGeneralView = props => {
    const { name, email, smtpHost, smtpPort, smtpEncryption, imapHost, imapPort, imapEncryption, imapInboxPrefix, username, password } = props.mailboxDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={"Naam"}
                            value={name}
                        />
                        <ViewText
                            label={"E-mail"}
                            value={email}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Gebruikersnaam"}
                            value={username}
                        />
                        <ViewText
                            label={"Wachtwoord"}
                            value='••••••••••'
                        />
                    </div>
                </PanelBody>

                <PanelHeader>
                    <span className="h5">Servergegevens</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label="Inkomende server"
                            value={imapHost}
                        />

                        <ViewText
                            label="Uitgaande server"
                            value={smtpHost}
                        />
                    </div>
                </PanelBody>

                <PanelHeader>
                    <span className="h5">Extra instellingen</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={"Imap poort"}
                            value={imapPort}
                        />
                        <ViewText
                            label="Smtp poort"
                            value={smtpPort}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Imap versleutelde verbinding"}
                            value={imapEncryption}
                        />
                        <ViewText
                            label="Smtp versleutelde verbinding"
                            value={smtpEncryption}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Inbox prefix"}
                            value={imapInboxPrefix}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        mailboxDetails: state.mailboxDetails,
    };
};

export default connect(mapStateToProps)(MailboxDetailsFormGeneralView);