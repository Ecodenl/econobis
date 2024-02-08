import React from 'react';
import CampaignDetailsWorkflowItem from './CampaignDetailsWorkflowItem';
import useSwitchToEditView from '../../../../hooks/useSwitchToEditView';

const CampaignDetailsWorkflowsList = ({ campaignWorkflows, campaignId, fetchCampaignData }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Status</div>
                <div className="col-sm-4">Email template</div>
                <div className="col-sm-4">Versturen na aantal dagen</div>
                <div className="col-sm-1" />
            </div>
            {campaignWorkflows.length > 0 ? (
                campaignWorkflows.map(campaignWorkflow => {
                    return (
                        <CampaignDetailsWorkflowItem
                            key={campaignWorkflow.id}
                            campaignWorkflow={campaignWorkflow}
                            campaignId={campaignId}
                            fetchCampaignData={fetchCampaignData}
                        />
                    );
                })
            ) : (
                <div>Geen workflows bekend.</div>
            )}
        </div>
    );
};

export default CampaignDetailsWorkflowsList;
