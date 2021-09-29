import React from 'react';
import Modal from '../../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsResponseItemDelete = ({ toggleDelete, fetchCampaignData, contactId, campaignId }) => {
    async function confirmAction() {
        try {
            await CampaignDetailsAPI.detachResponse(campaignId, contactId);

            fetchCampaignData();
            toggleDelete();
        } catch (error) {
            alert(
                'Er is iets misgegaan met het verwijderen van de response. Herlaad de pagina en probeer het nogmaals.'
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
            <p>Wil je deze response ontkoppelen van deze campagne?</p>
        </Modal>
    );
};

export default CampaignDetailsResponseItemDelete;
