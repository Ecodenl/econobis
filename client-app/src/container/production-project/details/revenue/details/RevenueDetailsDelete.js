import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../../../components/modal/Modal';
import ProductionProjectRevenueAPI from '../../../../../api/production-project/ProductionProjectRevenueAPI';

const RevenueDetailsDelete = props => {
    const confirmAction = () => {
        ProductionProjectRevenueAPI.deleteProductionProjectRevenue(props.id).then(() => {
            hashHistory.push(`/productie-project/details/${props.productionProjectId}`);
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
            <p>Weet u zeker dat u deze opbrengst wilt verwijderen?</p>
        </Modal>
    );
};

export default RevenueDetailsDelete;
