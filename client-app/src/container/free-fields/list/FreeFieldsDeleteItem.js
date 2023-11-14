import React from 'react';

import Modal from '../../../components/modal/Modal';

const FreeFieldsDeleteItem = ({ deleteFreeFieldsField, closeDeleteItemModal, description, id }) => {
    const confirmAction = () => {
        deleteFreeFieldsField(id);
        closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder vrije veld: <strong>{description}</strong>?
        </Modal>
    );
};

export default FreeFieldsDeleteItem;
