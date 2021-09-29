import React, { useState } from 'react';

import CampaignDetailsOrganisationsList from './CampaignDetailsOrganisationsList';
import CampaignDetailsOrganisationNew from './CampaignDetailsOrganisationNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

function CampaignDetailsOrganisations({ campaignId, campaignName, organisations, permissions, fetchCampaignData }) {
    const [showNew, setShowNew] = useState(false);

    function toggleShowNew() {
        setShowNew(prevState => !prevState);
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Betrokken bedrijven</span>
                {permissions.manageMarketing && (
                    <a role="button" className="pull-right" onClick={toggleShowNew}>
                        <span className="glyphicon glyphicon-plus" />
                    </a>
                )}
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <CampaignDetailsOrganisationsList
                        organisations={organisations}
                        campaignId={campaignId}
                        fetchCampaignData={fetchCampaignData}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    {showNew && (
                        <CampaignDetailsOrganisationNew
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

export default connect(mapStateToProps)(CampaignDetailsOrganisations);
