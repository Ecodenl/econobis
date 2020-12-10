import React from 'react';
import ParticipantItem from './ParticipantItem';

const ParticipantList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-3">Deelnemer</div>
                <div className="col-sm-1 text-right">Aantal 1-1</div>
                <div className="col-sm-1 text-right">Waarde 1-1</div>
                <div className="col-sm-2 text-right">Tot.waarde 1-1</div>
                <div className="col-sm-1 text-right">Aantal 31-12</div>
                <div className="col-sm-1 text-right">Waarde 31-12</div>
                <div className="col-sm-2 text-right">Tot.waarde 31-12</div>
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
