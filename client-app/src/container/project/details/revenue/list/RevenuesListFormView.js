import React from 'react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import { FaExclamationCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const RevenuesListFormView = ({
    revenue: revenueDetails,
    projectTypeCodeRef,
    showActionButtons,
    permissions,
    toggleDelete,
    highlightLine,
    onLineEnter,
    onLineLeave,
}) => {
    const navigate = useNavigate();

    const { id, confirmed, status, category, dateBegin, dateEnd, datePayed, amountRevenue } = revenueDetails;

    let statusText = '';
    switch (status) {
        case 'concept':
            statusText = 'Concept';
            break;
        case 'concept-to-update':
            statusText = 'Concept';
            break;
        case 'confirmed':
            statusText = 'Definitief';
            break;
        case 'in-progress':
            statusText = 'Bezig...';
            break;
        case 'processed':
            statusText = 'Verwerkt';
            break;
    }
    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div className="col-sm-1 custom-col-width-12-5">{category ? category.name : ''}</div>
            <div className="col-sm-2">{dateBegin ? moment(dateBegin).format('L') : ''}</div>
            <div className="col-sm-2">{dateEnd ? moment(dateEnd).format('L') : ''}</div>
            <div className="col-sm-2">{datePayed ? moment(datePayed).format('L') : ''}</div>
            <div className="col-sm-1 custom-col-width-12-5">
                {statusText}{' '}
                {status == 'concept-to-update' && (
                    <>
                        <FaExclamationCircle
                            color={'red'}
                            size={'15px'}
                            data-tip={'Bijwerken noodzakelijk'}
                            data-for={`tooltip-concept-to-update`}
                        />
                        <ReactTooltip
                            id={`tooltip-concept-to-update`}
                            effect="float"
                            place="right"
                            multiline={true}
                            aria-haspopup="true"
                        />
                    </>
                )}
            </div>
            <div className="col-sm-2">{amountRevenue ? MoneyPresenter(amountRevenue) : ''}</div>
            <div className="col-sm-1">
                {showActionButtons ? (
                    <a role="button" onClick={() => navigate(`/project/opbrengst/${id}`)}>
                        <Icon className="mybtn-success" size={14} icon={confirmed ? eye : pencil} />
                    </a>
                ) : (
                    ''
                )}
                {showActionButtons && permissions.manageProject && !confirmed ? (
                    <a role="button" onClick={toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projectTypeCodeRef: state.projectDetails.projectType?.codeRef,
    };
};

export default connect(mapStateToProps)(RevenuesListFormView);
