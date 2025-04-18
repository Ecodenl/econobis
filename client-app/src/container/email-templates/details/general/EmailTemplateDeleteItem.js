import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteEmailTemplate } from '../../../../actions/email-templates/EmailTemplateDetailsActions';

const EmailTemplateDeleteItem = ({ templateId, templateName, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteEmailTemplate(templateId));
        closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            Verwijder e-mail template: <strong> {templateName} </strong>
        </Modal>
    );
};

export default EmailTemplateDeleteItem;
