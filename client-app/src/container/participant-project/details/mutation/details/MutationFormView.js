import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

moment.locale('nl');
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

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

const MutationFormView = ({
    highlightLine,
    onLineEnter,
    onLineLeave,
    openDetails,
    showActionButtons,
    toggleDelete,
    permissions,
    projectTypeCodeRef,
    participantMutation,
    participantInDefinitiveRevenue,
    participantProjectDateTerminated,
}) => {
    const {
        type,
        dateCreation,
        status,
        datePayment,
        dateEntry,
        amount,
        participationWorth,
        quantity,
        returns,
        payoutKwh,
        indicationOfRestitutionEnergyTax,
        deletedAt,
        financialOverviewDefinitive,
        isPaidByMollie,
    } = participantMutation;

    let allowDelete = false;
    if (status && status.codeRef !== 'final') {
        allowDelete = true;
    } else if (
        !isPaidByMollie &&
        !financialOverviewDefinitive &&
        !participantInDefinitiveRevenue &&
        participantProjectDateTerminated === null
    ) {
        allowDelete = true;
    }

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <StyledContainer onClick={openDetails}>
                <StyledColumn columnWidth={'100px'}>{type.name}</StyledColumn>
                <StyledColumn columnWidth={'80px'}>{status && status.name}</StyledColumn>
                <StyledColumn columnWidth={'100px'}>{datePayment ? moment(datePayment).format('L') : ''}</StyledColumn>
                <StyledColumn columnWidth={'100px'}>{dateEntry ? moment(dateEntry).format('L') : ''}</StyledColumn>
                <StyledColumn columnWidth={'120px'}>{type.description}</StyledColumn>
                {projectTypeCodeRef === 'loan' ? <StyledColumn>{amount && moneyPresenter(amount)}</StyledColumn> : null}
                {projectTypeCodeRef === 'obligation' ||
                projectTypeCodeRef === 'capital' ||
                projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <StyledColumn>
                        {(amount || participationWorth) && moneyPresenter(amount + participationWorth)}
                    </StyledColumn>
                ) : null}
                {(projectTypeCodeRef === 'obligation' ||
                    projectTypeCodeRef === 'capital' ||
                    projectTypeCodeRef === 'postalcode_link_capital') && <StyledColumn>{quantity}</StyledColumn>}
                <StyledColumn>{returns && moneyPresenter(returns)}</StyledColumn>
                {projectTypeCodeRef === 'postalcode_link_capital' && <StyledColumn>{payoutKwh}</StyledColumn>}
                {projectTypeCodeRef === 'postalcode_link_capital' && (
                    <StyledColumn>
                        {indicationOfRestitutionEnergyTax && moneyPresenter(indicationOfRestitutionEnergyTax)}
                    </StyledColumn>
                )}
                {!deletedAt && (
                    <StyledColumn columnWidth={'6%'}>
                        {showActionButtons && !financialOverviewDefinitive && permissions.manageFinancial ? (
                            <a role="button" onClick={openDetails}>
                                <Icon class="mybtn-success" size={14} icon={pencil} />
                            </a>
                        ) : (
                            ''
                        )}
                        &nbsp;
                        {allowDelete && showActionButtons && permissions.manageFinancial ? (
                            <a role="button" onClick={toggleDelete}>
                                <Icon class="mybtn-danger" size={14} icon={trash} />
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
        participantInDefinitiveRevenue: state.participantProjectDetails.participantInDefinitiveRevenue,
        participantProjectDateTerminated: state.participantProjectDetails.dateTerminated,
    };
};

export default connect(mapStateToProps)(MutationFormView);
