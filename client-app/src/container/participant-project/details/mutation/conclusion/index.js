import React from 'react';

import ParticipantDetailsMutationConclusionView from './View';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';

const ParticipantDetailsMutationConclusion = ({ participantMutationOriginal }) => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <ParticipantDetailsMutationConclusionView {...participantMutationOriginal} />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ParticipantDetailsMutationConclusion;
