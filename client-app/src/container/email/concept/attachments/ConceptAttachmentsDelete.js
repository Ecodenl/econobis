import React from 'react';

import Modal from '../../../../components/modal/Modal';


const EmailDetailsAttachmentsDelete = (props) => {
    const confirmAction = () => {
        props.deleteAttachment(props.attachment.name, props.attachment.id);
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

export default EmailDetailsAttachmentsDelete;
