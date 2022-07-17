import React from 'react';

import Modal from '../../../../components/modal/Modal';

const PortalSettingsDashboardWidgetDeleteItem = ({
    deletePortalSettingsDashboardWidget,
    closeDeleteItemModal,
    description,
    id,
}) => {
    const confirmAction = () => {
        deletePortalSettingsDashboardWidget(id);
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
            Verwijder portal instelling dashboard widget: <strong>{description}</strong>?
        </Modal>
    );
};

export default PortalSettingsDashboardWidgetDeleteItem;
