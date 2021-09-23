import React from 'react';

import Modal from '../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../api/campaign/CampaignDetailsAPI';
import { hashHistory } from 'react-router';

const CampaignDetailsDelete = ({ id, closeDeleteItemModal }) => {
    const confirmAction = async () => {
        try {
            await CampaignDetailsAPI.deleteCampaign(id);
            hashHistory.push(`/campagnes`);
        } catch (error) {
            console.log(error);
            alert('Er is iets misgegaan met het verwijderen van de campagne.');
        }
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
            <p>Weet u zeker dat u deze campagne wilt verwijderen?</p>
        </Modal>
    );
};

export default CampaignDetailsDelete;
