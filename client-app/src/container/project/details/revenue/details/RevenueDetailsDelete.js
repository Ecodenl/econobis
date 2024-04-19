import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../../../components/modal/Modal';
import ProjectRevenueAPI from '../../../../../api/project/ProjectRevenueAPI';

const RevenueDetailsDelete = props => {
    const confirmAction = () => {
        ProjectRevenueAPI.deleteProjectRevenue(props.id).then(() => {
            props.participationId
                ? hashHistory.push(`/project/deelnemer/${props.participationId}`)
                : hashHistory.push(`/project/details/${props.projectId}`);
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
