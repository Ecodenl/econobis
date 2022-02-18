import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../../../../../components/modal/Modal';
import RevenuePartsKwhAPI from '../../../../../../../api/project/RevenuePartsKwhAPI';

const RevenuePartsKwhDetailsDelete = props => {
    const confirmAction = () => {
        RevenuePartsKwhAPI.deleteRevenuePartsKwh(props.id).then(() => {
            hashHistory.push(`/project/opbrengst-kwh/${props.revenueId}`);
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
            <p>Weet u zeker dat u deze deelopbrengst kwh wilt verwijderen?</p>
        </Modal>
    );
};

export default RevenuePartsKwhDetailsDelete;
