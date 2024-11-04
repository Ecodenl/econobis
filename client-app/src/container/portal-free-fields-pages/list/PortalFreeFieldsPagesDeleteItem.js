import React from 'react';

import Modal from '../../../components/modal/Modal';

const PortalFreeFieldsPageDeleteItem = ({ deletePortalFreeFieldsPage, closeDeleteItemModal, description, id }) => {
    const confirmAction = () => {
        deletePortalFreeFieldsPage(id);
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
            Verwijder vrije velden portaal pagina: <strong>{description}</strong>?
        </Modal>
    );
};

export default PortalFreeFieldsPageDeleteItem;
