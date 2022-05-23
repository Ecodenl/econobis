import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../../../components/modal/Modal';
import RevenuesKwhAPI from '../../../../../api/project/RevenuesKwhAPI';

const RevenuesKwhdetailsDelete = props => {
    const confirmAction = () => {
        RevenuesKwhAPI.deleteRevenuesKwh(props.id).then(() => {
            hashHistory.push(`/project/details/${props.projectId}`);
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
            <p>Weet u zeker dat u deze opbrengst kwh wilt verwijderen?</p>
        </Modal>
    );
};

export default RevenuesKwhdetailsDelete;
