import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/modal/Modal';
import { deleteEmailTemplate } from '../../../../actions/email-templates/EmailTemplateDetailsActions';

const EmailTemplateDeleteItem = ({ templateId, templateName, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.emailTemplateDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteEmailTemplate(templateId));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/email-templates');
            dispatch({ type: 'RESET_DELETE_EMAIL_TEMPLATE_SUCCESS' });
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
            Verwijder e-mail template: <strong> {templateName} </strong>
        </Modal>
    );
};

export default EmailTemplateDeleteItem;
