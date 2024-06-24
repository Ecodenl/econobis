import React, { useState } from 'react';
import CampaignDetailsWorkflowView from './CampaignDetailsWorkflowView';
import CampaignDetailsWorkflowEdit from './CampaignDetailsWorkflowEdit';
import CampaignDetailsWorkflowDelete from './CampaignDetailsWorkflowDelete';

function CampaignDetailsWorkflowItem({ campaignWorkflow, campaignId, fetchCampaignData, statusesToSelect }) {
    const [state, setState] = useState({
        showActionButtons: false,
        highlightLine: '',
        showDelete: false,
        showEdit: false,
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
        setState({ showEdit: true });
    }
    function cancelEdit() {
        setState({ showEdit: false });
    }

    function toggleDelete(e) {
        e.stopPropagation();
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
                    statusesToSelect={statusesToSelect}
                    fetchCampaignData={fetchCampaignData}
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
