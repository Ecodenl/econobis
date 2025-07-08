import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import DocumentTemplateAPI from '../../../api/document-template/DocumentTemplateAPI';

const DocumentTemplateDetailsDuplicate = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        DocumentTemplateAPI.duplicateTemplate(props.templateId).then(payload => {
            const id = payload.data.data.id;

            navigate(`/document-template/${id}`);
            props.closeModal();
        });
    };

    return (
        <Modal
            buttonConfirmText="Dupliceer"
            closeModal={props.closeModal}
            confirmAction={() => confirmAction()}
            title="Dupliceer template"
        >
            <p>
                Dupliceer template: <strong> {`${props.templateName}`} </strong>
            </p>
        </Modal>
    );
};

export default DocumentTemplateDetailsDuplicate;
