import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../../components/modal/Modal';
import RevenuesKwhAPI from '../../../../../api/project/RevenuesKwhAPI';

const RevenuesKwhdetailsDelete = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        RevenuesKwhAPI.deleteRevenuesKwh(props.id).then(() => {
            navigate(`/project/details/${props.projectId}`);
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
