import React from 'react';

import Modal from '../../../components/modal/Modal';

const LedgerDeleteItem = ({ deleteLedger, closeDeleteItemModal, description, id }) => {
    const confirmAction = () => {
        deleteLedger(id);
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
            Verwijder grootboek: <strong>{description}</strong>?
        </Modal>
    );
};

export default LedgerDeleteItem;
