import React from 'react';
import { connect } from 'react-redux';
import ParticipantItem from './ParticipantItem';

const ParticipantList = props => {
    // todo WM: opschonen log regels
    console.log('ParticipantList');
    console.log(props);

    return (
        <div>
            <div className="row header">
                <div className="col-sm-6">Deelnemer</div>
                <div className="col-sm-3">Waarde 1-1</div>
                <div className="col-sm-3">Waarde 31-12</div>
            </div>
            {props.financialOverviewProject.financialOverviewParticipantProjects.length > 0 ? (
                props.financialOverviewProject.financialOverviewParticipantProjects.map(
                    financialOverviewParticipantProject => {
                        return (
                            <ParticipantItem
                                financialOverviewParticipantProject={financialOverviewParticipantProject}
                            />
                        );
                    }
                )
            ) : (
                <div>Geen deelnemers bekend.</div>
            )}
        </div>
    );
};

export default ParticipantList;
