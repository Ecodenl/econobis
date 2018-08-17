import React from 'react';

import Modal from '../../../components/modal/Modal';
import {deleteDocumentTemplate} from "../../../actions/document-templates/DocumentTemplateDetailsActions";
import {connect} from "react-redux";

const DocumentTemplateDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteDocumentTemplate(props.templateId);
        props.closeDeleteItemModal();
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

const mapDispatchToProps = dispatch => ({
    deleteDocumentTemplate: (id) => {
        dispatch(deleteDocumentTemplate(id));
    },
});

export default connect(null, mapDispatchToProps)(DocumentTemplateDeleteItem);
