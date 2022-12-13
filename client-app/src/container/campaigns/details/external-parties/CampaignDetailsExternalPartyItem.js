import React, { useState } from 'react';

import CampaignDetailsExternalPartyView from './CampaignDetailsExternalPartyView';
import CampaignDetailsExternalPartyItemDelete from './CampaignDetailsExternalPartyItemDelete';

function CampaignDetailsExternalPartyItem({ externalParty, campaignId, fetchCampaignData }) {
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
            <CampaignDetailsExternalPartyView
                highlightLine={state.highlightLine}
                showActionButtons={state.showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                toggleDelete={toggleDelete}
                externalParty={externalParty}
            />
            {state.showDelete && (
                <CampaignDetailsExternalPartyItemDelete
                    toggleDelete={toggleDelete}
                    externalPartyId={externalParty.id}
                    campaignId={campaignId}
                    fetchCampaignData={fetchCampaignData}
                />
            )}
        </div>
    );
}

export default CampaignDetailsExternalPartyItem;
