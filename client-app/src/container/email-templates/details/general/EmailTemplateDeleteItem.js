import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/modal/Modal';
import { deleteEmailTemplate } from '../../../../actions/email-templates/EmailTemplateDetailsActions';

const EmailTemplateDeleteItem = ({ templateId, templateName, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const confirmAction = () => {
        dispatch(
            deleteEmailTemplate(templateId, () => {
                // Eerst modal sluiten
                closeDeleteItemModal();

                // Daarna navigeren
                navigate('/email-templates');
            })
        );
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
