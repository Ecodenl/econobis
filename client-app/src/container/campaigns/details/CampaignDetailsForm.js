import React from 'react';
import { isEmpty } from 'lodash';

import CampaignFormGeneral from './form/CampaignFormGeneral';
import CampaignDetailsConclusionForm from './conclusion/CampaignDetailsConclusionForm';
import CampaignDetailsOrganisations from './organisations/CampaignDetailsOrganisations';
import CampaignDetailsIntakes from './intakes/CampaignDetailsIntakes';
import CampaignDetailsOpportunities from './opportunities/CampaignDetailsOpportunities';
import CampaignDetailsResponses from './responses/CampaignDetailsResponses';
import CampaignDetailsCoaches from './coaches/CampaignDetailsCoaches';

function CampaignDetailsForm({ campaign, isLoading, hasError, fetchCampaignData }) {
    if (hasError) return <div>Fout bij het ophalen van campagne.</div>;

    if (isLoading) return <div>Gegevens aan het laden.</div>;

    if (isEmpty(campaign)) return <div>Geen campagne gevonden!</div>;

    return (
        <>
            <CampaignFormGeneral campaign={campaign} fetchCampaignData={fetchCampaignData} />
            <CampaignDetailsOrganisations
                campaignId={campaign.id}
                campaignName={campaign.name}
                organisations={campaign.organisations}
                fetchCampaignData={fetchCampaignData}
            />
            <CampaignDetailsCoaches
                campaignId={campaign.id}
                campaignName={campaign.name}
                coaches={campaign.coaches}
                fetchCampaignData={fetchCampaignData}
            />
            <CampaignDetailsIntakes campaignId={campaign.id} />
            <CampaignDetailsOpportunities campaignId={campaign.id} />
            <CampaignDetailsResponses
                campaignId={campaign.id}
                campaignName={campaign.name}
                responses={campaign.responses}
                fetchCampaignData={fetchCampaignData}
            />
            <CampaignDetailsConclusionForm campaign={campaign} fetchCampaignData={fetchCampaignData} />
        </>
    );
}

export default CampaignDetailsForm;
