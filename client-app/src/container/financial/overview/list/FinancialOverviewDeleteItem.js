import React from 'react';

import Modal from '../../../../components/modal/Modal';

const FinancialOverviewDeleteItem = ({ deleteFinancialOverview, closeDeleteItemModal, description, id }) => {
    const confirmAction = () => {
        deleteFinancialOverview(id);
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
            Verwijder waardestaat: <strong>{description}</strong>?
        </Modal>
    );
};

export default FinancialOverviewDeleteItem;
