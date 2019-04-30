import React from 'react';

import Modal from '../../../components/modal/Modal';
import ProductionProjectDetailsAPI from '../../../api/production-project/ProductionProjectDetailsAPI';

const ProductionProjectsDeleteItem = props => {
    const confirmAction = () => {
        ProductionProjectDetailsAPI.deleteProductionProject(props.id).then(() => {
            props.fetchProductionProjectsData();
        });
        props.closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder productieproject <strong>{props.code}</strong>?
        </Modal>
    );
};

export default ProductionProjectsDeleteItem;
