import React from 'react';

import IntakeDetailsFormConclusionView from './IntakeDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const IntakeDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <IntakeDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default IntakeDetailsFormConclusion;