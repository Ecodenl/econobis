import React from 'react';

import Modal from '../../../components/modal/Modal';

const CostCenterDeleteItem = ({deleteCostCenter, closeDeleteItemModal, description, id}) => {
    const confirmAction = () => {
        deleteCostCenter(id);
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
            Verwijder kostenplaats: <strong>{description}</strong>?
        </Modal>
    );
};

export default CostCenterDeleteItem;
