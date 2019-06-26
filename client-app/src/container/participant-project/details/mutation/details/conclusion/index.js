import React, { useState } from 'react';

import ParticipantDetailsMutationConclusionView from './View';
import PanelHeader from '../../../../../../components/panel/PanelHeader';

const ParticipantDetailsMutationConclusion = ({ createdAt, createdBy, updatedAt, updatedBy }) => {
    const [showConclusion, toggleConclusion] = useState(true);

    return (
        <React.Fragment>
            <PanelHeader>
                <div className="row" onClick={() => toggleConclusion(!showConclusion)}>
                    {showConclusion ? (
                        <span className="glyphicon glyphicon-menu-down" />
                    ) : (
                        <span className="glyphicon glyphicon-menu-right" />
                    )}
                    <span className="h5">Afsluiting gegevens</span>
                </div>
            </PanelHeader>
            {showConclusion ? (
                <ParticipantDetailsMutationConclusionView
                    createdAt={createdAt}
                    createdBy={createdBy}
                    updatedAt={updatedAt}
                    updatedBy={updatedBy}
                />
            ) : null}
        </React.Fragment>
    );
};

export default ParticipantDetailsMutationConclusion;
