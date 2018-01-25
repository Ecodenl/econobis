import React from 'react';

import Modal from '../../../components/modal/Modal';
import DocumentTemplateAPI from "../../../api/document-template/DocumentTemplateAPI";
import {hashHistory} from "react-router";

const DocumentTemplatesDeleteItem = (props) => {
    const confirmAction = () => {
        DocumentTemplateAPI.deleteDocumentTemplate(props.templateId).then(function (response) {
            hashHistory.push(`/document-templates`);
        })
            .catch(function (error) {
                alert(error.response.data.message);
                props.closeDeleteItemModal();
            });
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder document template: <strong> { props.templateName } </strong>
        </Modal>
    );
};

export default DocumentTemplatesDeleteItem;
