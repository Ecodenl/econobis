import React, { useState } from 'react';

import CampaignDetailsWorkflowView from './CampaignDetailsWorkflowView';
import CampaignDetailsWorkflowEdit from './CampaignDetailsWorkflowEdit';
import CampaignDetailsWorkflowDelete from './CampaignDetailsWorkflowDelete';

function CampaignDetailsWorkflowItem({ campaignWorkflow, campaignId, fetchCampaignData }) {
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

    function openEdit() {
        // nog
    }
    function cancelEdit() {
        // nog
    }

    function toggleDelete() {
        setState({ showDelete: !state.showDelete });
    }

    return (
        <div>
            <CampaignDetailsWorkflowView
                highlightLine={state.highlightLine}
                showActionButtons={state.showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                openEdit={openEdit}
                toggleDelete={toggleDelete}
                campaignWorkflow={campaignWorkflow}
            />
            {state.showEdit && (
                <CampaignDetailsWorkflowEdit
                    cancelEdit={cancelEdit}
                    campaignWorkflow={campaignWorkflow}
                    campaignId={campaignId}
                />
            )}
            {state.showDelete && (
                <CampaignDetailsWorkflowDelete
                    toggleDelete={toggleDelete}
                    campaignWorkflow={campaignWorkflow}
                    fetchCampaignData={fetchCampaignData}
                />
            )}
        </div>
    );
}

export default CampaignDetailsWorkflowItem;
