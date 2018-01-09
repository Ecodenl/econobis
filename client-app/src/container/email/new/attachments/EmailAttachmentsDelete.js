import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteMailboxUser } from '../../../../actions/mailbox/MailboxDetailsActions';

const EmailAttachmentsDelete = (props) => {
    const confirmAction = () => {
        props.deleteMailboxUser(props.mailboxId, props.userId);
        props.toggleDelete();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleDelete}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Wil je deze gebruiker ontkoppelen van deze mailbox?</p>

        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        mailboxId: state.mailboxDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteMailboxUser: (mailboxId, userId) => {
        dispatch(deleteMailboxUser(mailboxId, userId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailAttachmentsDelete);
