import React, { useState } from 'react';

import CampaignDetailsResponsesList from './CampaignDetailsResponsesList';
import CampaignDetailsResponseNew from './CampaignDetailsResponseNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

function CampaignDetailsResponses({ campaignId, campaignName, responses, permissions, fetchCampaignData }) {
    const [showNew, setShowNew] = useState(false);

    function toggleShowNew() {
        setShowNew(prevState => !prevState);
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Responses</span>
                {permissions.manageMarketing && (
                    <a role="button" className="pull-right" onClick={toggleShowNew}>
                        <Icon size={14} icon={plus} />
                    </a>
                )}
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <CampaignDetailsResponsesList
                        responses={responses}
                        campaignId={campaignId}
                        fetchCampaignData={fetchCampaignData}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    {showNew && (
                        <CampaignDetailsResponseNew
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

export default connect(mapStateToProps)(CampaignDetailsResponses);
