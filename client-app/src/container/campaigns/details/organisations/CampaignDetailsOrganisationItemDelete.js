import React from 'react';

import Modal from '../../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsOrganisationDelete = ({ toggleDelete, fetchCampaignData, organisationId, campaignId }) => {
    async function confirmAction() {
        try {
            await CampaignDetailsAPI.detachOrganisation(campaignId, organisationId);

            fetchCampaignData();
            toggleDelete();
        } catch (error) {
            alert(
                'Er is iets misgegaan met het verwijderen van de organisatie. Herlaad de pagina en probeer het nogmaals.'
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
            <p>Wil je deze organisatie ontkoppelen van deze campagne?</p>
        </Modal>
    );
};

export default CampaignDetailsOrganisationDelete;
