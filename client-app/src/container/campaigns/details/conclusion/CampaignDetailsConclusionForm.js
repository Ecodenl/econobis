import React from 'react';

import CampaignDetailsConclusionView from './CampaignDetailsConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const CampaignDetailsConslusionForm = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting</span>
            </PanelHeader>
            <PanelBody>
                <CampaignDetailsConclusionView />
            </PanelBody>
        </Panel>
    );
};

export default CampaignDetailsConslusionForm;