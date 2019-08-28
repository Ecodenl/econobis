import React from 'react';

import ParticipantDetailsConclusionView from './View';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const ParticipantDetailsConclusion = () => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <ParticipantDetailsConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ParticipantDetailsConclusion;
