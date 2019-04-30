import React from 'react';

import OpportunityDetailsConclusionView from './OpportunityDetailsConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const OpportunityDetailsQuotationsForm = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting</span>
            </PanelHeader>
            <PanelBody>
                <OpportunityDetailsConclusionView />
            </PanelBody>
        </Panel>
    );
};

export default OpportunityDetailsQuotationsForm;
