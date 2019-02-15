import React from 'react';
import { connect } from 'react-redux';

import MutationFormListItem from './MutationFormListItem';

const MutationFormList = ({ projectTypeCodeRef, participantMutations }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Aanmaak- datum</div>
                <div className="col-sm-2">Boekstuk</div>
                {projectTypeCodeRef === 'loan' && <div className="col-sm-2">Lening</div>}
                {projectTypeCodeRef === 'obligation' && <div className="col-sm-2">Obligatie</div>}
                {(projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcodeLinkCapital') && (
                    <div className="col-sm-2">PCT en kapitaal</div>
                )}
                <div className="col-sm-2">Betaal datum</div>
                <div className="col-sm-2">Omschrijving</div>
                {projectTypeCodeRef === 'loan' && <div className="col-sm-1">Lening rekening</div>}
                {projectTypeCodeRef === 'capital' && <div className="col-sm-1">Kapitaal rekening</div>}
                {projectTypeCodeRef === 'obligation' && <div className="col-sm-1">Obligaties</div>}
                {(projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcodeLinkCapital') && (
                    <div className="col-sm-1">Participaties</div>
                )}
                <div className="col-sm-1">Opbrengst</div>
                {projectTypeCodeRef === 'postalcodeLinkCapital' && <div className="col-sm-1">kWh</div>}
                <div className="col-sm-1">Uitgekeerd op of via</div>
            </div>
            {participantMutations.length > 0 ? (
                participantMutations.map(participantMutation => {
                    return (
                        <MutationFormListItem key={participantMutation.id} participantMutation={participantMutation} />
                    );
                })
            ) : (
                <div>Geen transacties bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        participantMutations: state.participantProjectDetails.participantMutations,
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

export default connect(mapStateToProps)(MutationFormList);
