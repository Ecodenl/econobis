import React from 'react';

import RevenuePartsKwhConclusionView from './RevenuePartsKwhConclusionView';
import Panel from '../../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../../../components/panel/PanelHeader';

const RevenuePartsKwhConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RevenuePartsKwhConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default RevenuePartsKwhConclusion;
