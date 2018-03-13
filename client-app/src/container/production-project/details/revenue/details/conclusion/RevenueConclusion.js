import React from 'react';

import RevenueConclusionView from './RevenueConclusionView';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../components/panel/PanelHeader';

const RevenueConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RevenueConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default RevenueConclusion;