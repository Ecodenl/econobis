import React from 'react';

import Modal from '../../../../components/modal/Modal';

const FinancialOverviewDeleteItem = ({
    deleteFinancialOverview,
    closeDeleteItemModal,
    year,
    administrationName,
    id,
}) => {
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
            Verwijder financieel jaaroverzicht:{' '}
            <strong>
                {year} {administrationName}
            </strong>
            ?
        </Modal>
    );
};

export default FinancialOverviewDeleteItem;
