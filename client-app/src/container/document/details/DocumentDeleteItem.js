import React from 'react';

import Modal from '../../../components/modal/Modal';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import { hashHistory } from 'react-router';

const DocumentDeleteItem = props => {
    const confirmAction = () => {
        DocumentDetailsAPI.deleteDocument(props.id).then(payload => {
            hashHistory.push(`/documenten`);
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
            Verwijder document: <strong> {props.filename} </strong>
        </Modal>
    );
};

export default DocumentDeleteItem;
