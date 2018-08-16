import React from 'react';

import Modal from '../../../../components/modal/Modal';
import {deleteEmailTemplate} from "../../../../actions/email-templates/EmailTemplateDetailsActions";
import {connect} from "react-redux";

const EmailTemplateDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteEmailTemplate(props.id);
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
            Verwijder e-mail template: <strong> { props.templateName } </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteEmailTemplate: (id) => {
        dispatch(deleteEmailTemplate(id));
    },
});

export default connect(null, mapDispatchToProps)(EmailTemplateDeleteItem);
