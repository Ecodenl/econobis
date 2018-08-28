import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteMailboxUser } from '../../../../actions/mailbox/MailboxDetailsActions';

const EmailAnswerAttachmentsDelete = (props) => {
    const confirmAction = () => {
        props.deleteAttachment(props.attachment.name);
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
            <p>Wil je deze bijlage verwijderen?</p>

        </Modal>
    );
};

export default EmailAnswerAttachmentsDelete;
