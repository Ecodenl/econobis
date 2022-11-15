import React from 'react';

import Modal from '../../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsCoachDelete = ({ toggleDelete, fetchCampaignData, coachId, campaignId }) => {
    async function confirmAction() {
        try {
            await CampaignDetailsAPI.detachCoach(campaignId, coachId);

            fetchCampaignData();
            toggleDelete();
        } catch (error) {
            alert('Er is iets misgegaan met het verwijderen van de coach. Herlaad de pagina en probeer het nogmaals.');
        }
    }

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={toggleDelete}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            <p>Wil je deze coach ontkoppelen van deze campagne?</p>
        </Modal>
    );
};

export default CampaignDetailsCoachDelete;
