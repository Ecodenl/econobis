import React from 'react';
import { hashHistory } from 'react-router';
import MailboxDefaultFormGeneral from '../default/form/general';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import { bindActionCreators } from 'redux';
import { updateMailbox } from '../../../actions/mailbox/MailboxDetailsActions';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import { connect } from 'react-redux';

function MailboxNewForm({ fetchSystemData }) {
    const initialValues = {
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
        incomingServerType: 'imap',
        outgoingServerType: 'smtp',
        mailgunDomainId: '',
        primary: false,
        isActive: true,
        linkContactFromEmailToAddress: false,
        emailMarkAsSeen: true,
        gmailApiSettings: {
            projectId: '',
            clientId: '',
            clientSecret: '',
            tenantId: '',
        },
    };

    function processSubmit(values, setSubmitting) {
        MailboxAPI.newMailbox(values)
            .then(payload => {
                fetchSystemData();
                hashHistory.push(`/mailbox/${payload.data.data.id}`);
            })
            .catch(error => {
                if (
                    error.response.status === 401 &&
                    (error.response.data.message === 'gmail_unauthorised' ||
                        error.response.data.message === 'ms_oauth_unauthorised')
                ) {
                    window.location = error.response.data.authUrl;
                }

                setSubmitting(false);
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    }

    return <MailboxDefaultFormGeneral initialValues={initialValues} processSubmit={processSubmit} isNew={true} />;
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(null, mapDispatchToProps)(MailboxNewForm);
