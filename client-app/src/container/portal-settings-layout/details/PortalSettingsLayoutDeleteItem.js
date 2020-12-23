import React from 'react';

import Modal from '../../../components/modal/Modal';

const PortalSettingsLayoutDeleteItem = ({ deletePortalSettingsLayout, closeDeleteItemModal, description, id }) => {
    const confirmAction = () => {
        deletePortalSettingsLayout(id);
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
            Verwijder portal instelling layout: <strong>{description}</strong>?
        </Modal>
    );
};

export default PortalSettingsLayoutDeleteItem;
