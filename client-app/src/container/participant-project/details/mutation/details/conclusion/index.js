import React, { useState } from 'react';

import ParticipantDetailsMutationConclusionView from './View';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';

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
                    {showConclusion ? <Icon size={21} icon={angleDown} /> : <Icon size={21} icon={angleRight} />}
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
