import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
moment.locale('nl');
import moneyPresenter from '../../../../helpers/MoneyPresenter';

const StyledContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
`;

const StyledColumn = styled.div`
    width: ${props => (props.columnWidth ? props.columnWidth : '8%')};
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    float: left;
`;

const MutationFormView = ({
    highlightLine,
    onLineEnter,
    onLineLeave,
    openEdit,
    showActionButtons,
    toggleDelete,
    permissions,
    projectTypeCodeRef,
    participantMutation,
}) => {
    const {
        type,
        dateCreation,
        entry,
        status,
        datePayment,
        amount,
        quantity,
        returns,
        payoutKwh,
        indicationOfRestitutionEnergyTax,
        paidOn,
        deletedAt,
    } = participantMutation;

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <StyledContainer onClick={openEdit}>
                <StyledColumn columnWidth={'8.5%'}>{dateCreation ? moment(dateCreation).format('L') : ''}</StyledColumn>
                <StyledColumn>{entry}</StyledColumn>
                <StyledColumn columnWidth={'12%'}>{type.name}</StyledColumn>
                <StyledColumn columnWidth={'10%'}>{status.name}</StyledColumn>
                <StyledColumn columnWidth={'8.5%'}>{datePayment ? moment(datePayment).format('L') : ''}</StyledColumn>
                <StyledColumn columnWidth={'10%'}>{type.description}</StyledColumn>
                {(projectTypeCodeRef === 'loan' ||
                    projectTypeCodeRef === 'capital' ||
                    projectTypeCodeRef === 'postalcode_link_capital') && (
                    <StyledColumn>{amount && moneyPresenter(amount)}</StyledColumn>
                )}
                {(projectTypeCodeRef === 'obligation' ||
                    projectTypeCodeRef === 'capital' ||
                    projectTypeCodeRef === 'postalcode_link_capital') && <StyledColumn>{quantity}</StyledColumn>}
                <StyledColumn>{returns}</StyledColumn>
                {projectTypeCodeRef === 'postalcode_link_capital' && <StyledColumn>{payoutKwh}</StyledColumn>}
                {projectTypeCodeRef === 'postalcode_link_capital' && (
                    <StyledColumn>{indicationOfRestitutionEnergyTax}</StyledColumn>
                )}
                <StyledColumn>{paidOn}</StyledColumn>
                {!deletedAt && (
                    <StyledColumn columnWidth={'6%'}>
                        {showActionButtons && permissions.manageFinancial ? (
                            <a role="button" onClick={openEdit}>
                                <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                            </a>
                        ) : (
                            ''
                        )}
                        {showActionButtons && permissions.manageFinancial ? (
                            <a role="button" onClick={toggleDelete}>
                                <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                            </a>
                        ) : (
                            ''
                        )}
                    </StyledColumn>
                )}
            </StyledContainer>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

export default connect(mapStateToProps)(MutationFormView);
