import React from 'react';

import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { FaExclamationCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const RevenuesListFormView = ({
    revenue: revenueDetails,
    projectName,
    permissions,
    showActionButtons,
    highlightLine,
    onLineEnter,
    onLineLeave,
}) => {
    const navigate = useNavigate();

    const { revenueId, categoryName, dateBegin, dateEnd, status, statusRevenue } = revenueDetails;

    const statusName = status => {
        switch (status) {
            case 'concept':
                return 'Concept';
            case 'confirmed':
                return 'Definitief';
            case 'processed':
                return 'Verwerkt';
        }
        return '';
    };
    const statusRevenueName = statusRevenue => {
        switch (statusRevenue) {
            case 'concept':
                return 'Concept';
            case 'concept-to-update':
                return 'Concept';
            case 'confirmed':
                return 'Definitief';
            case 'processed':
                return 'Verwerkt';
        }
        return '';
    };

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div className="col-sm-4">{projectName ? projectName : ''}</div>
            <div className="col-sm-2">{categoryName}</div>
            <div className={'col-sm-3'}>
                {dateBegin ? moment(dateBegin).format('L') : 'onbekend'}
                {' t/m '}
                {dateEnd ? moment(dateEnd).format('L') : 'onbekend'}
            </div>
            <div className="col-sm-1">{statusName(status)}</div>
            <div className="col-sm-1">
                {statusRevenueName(statusRevenue)}{' '}
                {statusRevenue == 'concept-to-update' && (
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
            <div className="col-sm-1">
                {showActionButtons && permissions.menuProjects ? (
                    <a role="button" onClick={() => navigate(`/project/opbrengst/${revenueId}`)}>
                        <Icon className="mybtn-success" size={14} icon={eye} />
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
        projectName: state.participantProjectDetails.project?.name,
    };
};

export default connect(mapStateToProps)(RevenuesListFormView);
