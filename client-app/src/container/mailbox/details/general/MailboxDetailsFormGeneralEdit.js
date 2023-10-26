import React from 'react';
import MailboxDefaultFormGeneral from '../../default/form/general';
import MailboxAPI from '../../../../api/mailbox/MailboxAPI';
import { bindActionCreators } from 'redux';
import { updateMailbox } from '../../../../actions/mailbox/MailboxDetailsActions';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import { connect } from 'react-redux';

function MailboxDetailsFormGeneralEdit({ mailboxDetails, updateMailbox, fetchSystemData, switchToView }) {
    function processSubmit(values, setSubmitting) {
        MailboxAPI.updateMailbox(values)
            .then(payload => {
                updateMailbox(payload.data.data);
                fetchSystemData();
                switchToView();
            })
            .catch(error => {
                if (
                    error.response.status === 401 &&
                    (error.response.data.message === 'gmail_unauthorised' ||
                        error.response.data.message === 'ms_oauth_unauthorised')
                ) {
                    window.location = error.response.data.authUrl;
                } else {
                    console.log(error);
                    alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
                }

                setSubmitting(false);
            });
    }

    return (
        <MailboxDefaultFormGeneral
            initialValues={{
                ...mailboxDetails,
                gmailApiSettings: mailboxDetails.gmailApiSettings
                    ? mailboxDetails.gmailApiSettings
                    : {
                          projectId: '',
                          clientId: '',
                          clientSecret: '',
                          tenantId: '',
                      },
            }}
            processSubmit={processSubmit}
            switchToView={switchToView}
            isNew={false}
        />
    );
}

const mapStateToProps = state => {
    return {
        mailboxDetails: state.mailboxDetails,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ updateMailbox, fetchSystemData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MailboxDetailsFormGeneralEdit);
