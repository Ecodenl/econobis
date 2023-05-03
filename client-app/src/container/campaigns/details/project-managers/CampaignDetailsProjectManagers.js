import React, { useState } from 'react';

import CampaignDetailsProjectManagersList from './CampaignDetailsProjectManagersList';
import CampaignDetailsProjectManagerNew from './CampaignDetailsProjectManagerNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

function CampaignDetailsProjectManagers({ campaignId, campaignName, projectManagers, permissions, fetchCampaignData }) {
    const [showNew, setShowNew] = useState(false);

    function toggleShowNew() {
        setShowNew(prevState => !prevState);
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Betrokken projectmanagers</span>
                {permissions.manageMarketing && (
                    <a role="button" className="pull-right" onClick={toggleShowNew}>
                        <Icon size={14} icon={plus} />
                    </a>
                )}
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <CampaignDetailsProjectManagersList
                        projectManagers={projectManagers}
                        campaignId={campaignId}
                        fetchCampaignData={fetchCampaignData}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    {showNew && (
                        <CampaignDetailsProjectManagerNew
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignDetailsProjectManagers);
