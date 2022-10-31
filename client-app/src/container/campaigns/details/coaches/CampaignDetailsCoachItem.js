import React, { useState } from 'react';

import CampaignDetailsCoachView from './CampaignDetailsCoachView';
import CampaignDetailsCoachItemDelete from './CampaignDetailsCoachItemDelete';

function CampaignDetailsCoachItem({ coach, campaignId, fetchCampaignData }) {
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
            <CampaignDetailsCoachView
                highlightLine={state.highlightLine}
                showActionButtons={state.showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                toggleDelete={toggleDelete}
                coach={coach}
            />
            {state.showDelete && (
                <CampaignDetailsCoachItemDelete
                    toggleDelete={toggleDelete}
                    coachId={coach.id}
                    campaignId={campaignId}
                    fetchCampaignData={fetchCampaignData}
                />
            )}
        </div>
    );
}

export default CampaignDetailsCoachItem;
