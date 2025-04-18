import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteDocumentTemplate } from '../../../actions/document-templates/DocumentTemplateDetailsActions';

const DocumentTemplateDeleteItem = ({ templateId, templateName, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteDocumentTemplate(templateId));
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
            Verwijder document template: <strong> {templateName} </strong>
        </Modal>
    );
};

export default DocumentTemplateDeleteItem;
