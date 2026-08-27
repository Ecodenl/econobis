import React from 'react';

import Modal from '../../../components/modal/Modal';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import { useNavigate } from 'react-router-dom';

const DocumentDeleteItem = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        DocumentDetailsAPI.deleteDocument(props.id).then(payload => {
            navigate(`/documenten`);
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
