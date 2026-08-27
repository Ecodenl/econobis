import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteDocumentTemplate } from '../../../actions/document-templates/DocumentTemplateDetailsActions';
import { deleteEmailTemplate } from '../../../actions/email-templates/EmailTemplateDetailsActions';

const DocumentTemplateDeleteItem = ({ templateId, templateName, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const confirmAction = () => {
        // dispatch(deleteDocumentTemplate(templateId));
        // closeDeleteItemModal();
        dispatch(
            deleteDocumentTemplate(templateId, () => {
                // Eerst modal sluiten
                closeDeleteItemModal();

                // Daarna navigeren
                navigate('/document-templates');
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
            Verwijder document template: <strong> {templateName} </strong>
        </Modal>
    );
};

export default DocumentTemplateDeleteItem;
