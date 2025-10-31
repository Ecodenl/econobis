import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../../components/modal/Modal';
import ProjectRevenueAPI from '../../../../../api/project/ProjectRevenueAPI';

const RevenueDetailsDelete = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        ProjectRevenueAPI.deleteProjectRevenue(props.id).then(() => {
            props.participationId
                ? navigate(`/project/deelnemer/${props.participationId}`)
                : navigate(`/project/details/${props.projectId}`);
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
