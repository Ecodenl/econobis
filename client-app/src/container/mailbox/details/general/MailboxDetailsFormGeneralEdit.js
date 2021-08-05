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
                setSubmitting(false);
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    }

    return <MailboxDefaultFormGeneral initialValues={mailboxDetails} processSubmit={processSubmit} />;
}

const mapStateToProps = state => {
    return {
        mailboxDetails: state.mailboxDetails,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ updateMailbox, fetchSystemData }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MailboxDetailsFormGeneralEdit);
