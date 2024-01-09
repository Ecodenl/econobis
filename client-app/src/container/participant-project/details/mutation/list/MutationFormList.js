import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import MutationFormListItem from '../details/MutationFormListItem';

const StyledContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
`;

const StyledColumn = styled.div`
    width: ${props => (props.columnWidth ? props.columnWidth : '100px')};
    position: relative;
    min-height: 1px;
    padding-right: 6px;
    padding-left: 6px;
    float: left;
`;

const MutationFormList = ({ projectTypeCodeRef, participantMutations }) => {
    return (
        <div>
            <StyledContainer className="row border header">
                <StyledColumn columnWidth={'100px'}>Type</StyledColumn>
                <StyledColumn columnWidth={'80px'}>Status</StyledColumn>
                <StyledColumn columnWidth={'100px'}>Betaal datum</StyledColumn>
                <StyledColumn columnWidth={'100px'}>Ingangs- datum</StyledColumn>
                <StyledColumn columnWidth={'120px'}>Omschrijving</StyledColumn>
                {projectTypeCodeRef === 'loan' && <StyledColumn>Lening rekening</StyledColumn>}
                {(projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital') && (
                    <StyledColumn>Kapitaal rekening</StyledColumn>
                )}
                {projectTypeCodeRef === 'obligation' && <StyledColumn>Obligatie rekening</StyledColumn>}
                {projectTypeCodeRef === 'obligation' && <StyledColumn>Aantal obligaties</StyledColumn>}
                {(projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital') && (
                    <StyledColumn>Aantal participaties</StyledColumn>
                )}
                <StyledColumn>Opbrengst</StyledColumn>
                {projectTypeCodeRef === 'postalcode_link_capital' && <StyledColumn>kWh</StyledColumn>}
                {projectTypeCodeRef === 'postalcode_link_capital' && (
                    <StyledColumn>Indicatie teruggave EB</StyledColumn>
                )}
                <StyledColumn columnWidth={'7%'}>&nbsp;</StyledColumn>
            </StyledContainer>
            {participantMutations.length > 0 ? (
                participantMutations.map(participantMutation => {
                    return (
                        <MutationFormListItem key={participantMutation.id} participantMutation={participantMutation} />
                    );
                })
            ) : (
                <div>Geen mutaties bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        participantMutations: state.participantProjectDetails.participantMutations,
        projectTypeCodeRef: state.participantProjectDetails.project?.typeCodeRef,
    };
};

export default connect(mapStateToProps)(MutationFormList);
