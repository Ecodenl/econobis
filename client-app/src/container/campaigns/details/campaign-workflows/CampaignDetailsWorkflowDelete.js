import React from 'react';

import Modal from '../../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsWorkflowDelete = ({ toggleDelete, fetchCampaignData, campaignWorkflow }) => {
    async function confirmAction() {
        try {
            await CampaignDetailsAPI.deleteCampaignWorkflow(campaignWorkflow.id);

            fetchCampaignData();
            toggleDelete();
        } catch (error) {
            alert(
                'Er is iets misgegaan met het verwijderen van de workflow. Herlaad de pagina en probeer het nogmaals.'
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
            <p>
                Wil je deze workflow voor <strong>{campaignWorkflow.statusName}</strong>
                ontkoppelen van campagne?
            </p>
        </Modal>
    );
};

export default CampaignDetailsWorkflowDelete;
