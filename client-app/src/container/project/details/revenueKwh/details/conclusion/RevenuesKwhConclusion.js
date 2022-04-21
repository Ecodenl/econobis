import React from 'react';

import RevenuesKwhConclusionView from './RevenuesKwhConclusionView';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../components/panel/PanelHeader';

const RevenuesKwhConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RevenuesKwhConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default RevenuesKwhConclusion;
