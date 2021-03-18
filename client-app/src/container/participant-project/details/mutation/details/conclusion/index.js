import React, { useState } from 'react';

import ParticipantDetailsMutationConclusionView from './View';
import PanelHeader from '../../../../../../components/panel/PanelHeader';

const ParticipantDetailsMutationConclusion = ({
    createdAt,
    createdWith,
    createdBy,
    updatedAt,
    updatedWith,
    updatedBy,
}) => {
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
                    createdWith={createdWith}
                    createdBy={createdBy}
                    updatedAt={updatedAt}
                    updatedWith={updatedWith}
                    updatedBy={updatedBy}
                />
            ) : null}
        </React.Fragment>
    );
};

export default ParticipantDetailsMutationConclusion;
