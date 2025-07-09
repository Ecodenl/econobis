import React from 'react';
import { useNavigate } from 'react-router-dom';
import MailboxDefaultFormGeneral from '../default/form/general';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import { bindActionCreators } from 'redux';
import { updateMailbox } from '../../../actions/mailbox/MailboxDetailsActions';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import { connect } from 'react-redux';

function MailboxNewForm({ fetchSystemData }) {
    const navigate = useNavigate();

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
        oauthApiSettings: {
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
                navigate(`/mailbox/${payload.data.data.id}`);
            })
            .catch(error => {
                if (error.response.status === 401 && error.response.data.message === 'ms_oauth_unauthorised') {
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
