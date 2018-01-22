import React from 'react';

import Modal from '../../../components/modal/Modal';
import DocumentTemplateAPI from "../../../api/document-template/DocumentTemplateAPI";

const DocumentTemplatesDeleteItem = (props) => {
    const confirmAction = () => {
        DocumentTemplateAPI.deleteDocumentTemplate(props.id).then(function (response) {
            props.refreshDocumentTemplatesData();
            props.closeDeleteItemModal();
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
            Verwijder document template: <strong> { props.name } </strong>
        </Modal>
    );
};

export default DocumentTemplatesDeleteItem;
