import React, { useState } from 'react';

import CampaignDetailsWorkflowsList from './CampaignDetailsWorkflowsList';
import CampaignDetailsWorkflowNew from './CampaignDetailsWorkflowNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

function CampaignDetailsWorkflows({ workflowType, campaignId, campaignName, campaignWorkflows, fetchCampaignData }) {
    const [showNew, setShowNew] = useState(false);

    function toggleShowNew() {
        setShowNew(prevState => !prevState);
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Workflow instellingen {workflowType}</span>
                <a role="button" className="pull-right" onClick={toggleShowNew}>
                    <Icon size={14} icon={plus} />
                </a>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <CampaignDetailsWorkflowsList
                        campaignWorkflows={campaignWorkflows}
                        campaignId={campaignId}
                        fetchCampaignData={fetchCampaignData}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    {showNew && (
                        <CampaignDetailsWorkflowNew
                            campaignId={campaignId}
                            campaignName={campaignName}
                            toggleShowNew={toggleShowNew}
                            fetchCampaignData={fetchCampaignData}
                        />
                    )}
                </div>
            </PanelBody>
        </Panel>
    );
}

export default CampaignDetailsWorkflows;
