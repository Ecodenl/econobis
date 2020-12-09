import React from 'react';
import ParticipantItem from './ParticipantItem';

const ParticipantList = props => {
    // todo WM: opschonen log regels
    console.log('ParticipantList');
    console.log(props);

    return (
        <div>
            <div className="row header">
                <div className="col-sm-5">Deelnemer</div>
                <div className="col-sm-3">Waarde 1-1</div>
                <div className="col-sm-3">Waarde 31-12</div>
                <div className="col-sm-1" />
            </div>
            {props.financialOverviewProject.financialOverviewParticipantProjects.length > 0 ? (
                props.financialOverviewProject.financialOverviewParticipantProjects.map(
                    financialOverviewParticipantProject => {
                        return (
                            <ParticipantItem
                                financialOverview={props.financialOverviewProject.financialOverview}
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
