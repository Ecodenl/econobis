import React, { useState } from 'react';

import CampaignDetailsOrganisationView from './CampaignDetailsOrganisationView';
import CampaignDetailsOrganisationItemDelete from './CampaignDetailsOrganisationItemDelete';

function CampaignDetailsOrganisationItem({ organisation, campaignId, fetchCampaignData }) {
    const [state, setState] = useState({
        showActionButtons: false,
        highlightLine: '',
        showDelete: false,
    });

    function onLineEnter() {
        setState({
            ...state,
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    }

    function onLineLeave() {
        setState({
            ...state,
            showActionButtons: false,
            highlightLine: '',
        });
    }

    function toggleDelete() {
        setState({ showDelete: !state.showDelete });
    }

    return (
        <div>
            <CampaignDetailsOrganisationView
                highlightLine={state.highlightLine}
                showActionButtons={state.showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                toggleDelete={toggleDelete}
                organisation={organisation}
            />
            {state.showDelete && (
                <CampaignDetailsOrganisationItemDelete
                    toggleDelete={toggleDelete}
                    organisationId={organisation.id}
                    campaignId={campaignId}
                    fetchCampaignData={fetchCampaignData}
                />
            )}
        </div>
    );
}

export default CampaignDetailsOrganisationItem;
