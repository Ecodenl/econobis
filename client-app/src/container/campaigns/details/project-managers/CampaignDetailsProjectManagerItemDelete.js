import React from 'react';

import Modal from '../../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsProjectManagerDelete = ({ toggleDelete, fetchCampaignData, projectManagerId, campaignId }) => {
    async function confirmAction() {
        try {
            await CampaignDetailsAPI.detachProjectManager(campaignId, projectManagerId);

            fetchCampaignData();
            toggleDelete();
        } catch (error) {
            alert(
                'Er is iets misgegaan met het verwijderen van de projectManager. Herlaad de pagina en probeer het nogmaals.'
            );
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
            <p>Wil je deze projectManager ontkoppelen van deze campagne?</p>
        </Modal>
    );
};

export default CampaignDetailsProjectManagerDelete;
