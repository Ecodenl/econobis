import React, { useState } from 'react';

import CampaignDetailsProjectManagerView from './CampaignDetailsProjectManagerView';
import CampaignDetailsProjectManagerItemDelete from './CampaignDetailsProjectManagerItemDelete';

function CampaignDetailsProjectManagerItem({ projectManager, campaignId, fetchCampaignData }) {
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
            <CampaignDetailsProjectManagerView
                highlightLine={state.highlightLine}
                showActionButtons={state.showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                toggleDelete={toggleDelete}
                projectManager={projectManager}
            />
            {state.showDelete && (
                <CampaignDetailsProjectManagerItemDelete
                    toggleDelete={toggleDelete}
                    projectManagerId={projectManager.id}
                    campaignId={campaignId}
                    fetchCampaignData={fetchCampaignData}
                />
            )}
        </div>
    );
}

export default CampaignDetailsProjectManagerItem;
