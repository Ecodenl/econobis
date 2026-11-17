import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ParticipationsList from './ParticipationsList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const ParticipationHarmonica = ({
    title = 'DEELNAMES',
    toggleShowList,
    showParticipationsList,
    newParticipation,
    participationCount,
    relatedParticipations = [],
    canManage = false,
}) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span>
                        {title} <span className="badge">{participationCount}</span>
                    </span>
                </div>
                <div className="col-sm-2">
                    {canManage && newParticipation && (
                        <a role="button" className="pull-right" onClick={newParticipation}>
                            <Icon className="harmonica-button" size={14} icon={plus} />
                        </a>
                    )}
                </div>
                <div className="col-sm-12">
                    {showParticipationsList && <ParticipationsList relatedParticipations={relatedParticipations} />}
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ParticipationHarmonica;
