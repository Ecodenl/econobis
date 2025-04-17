import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteDocumentTemplate } from '../../../actions/document-templates/DocumentTemplateDetailsActions';

const DocumentTemplateDeleteItem = ({ templateId, templateName, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.documentTemplateDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteDocumentTemplate(templateId));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            if (contactId == 0) {
                navigate(`/kansen`);
            } else {
                navigate(`/contact/` + contactId);
            }
            dispatch({ type: 'RESET_DELETE_DOCUMENT_TEMPLATE_SUCCESS' });
        }
    }, [deleteSuccess, navigate, dispatch]);

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
