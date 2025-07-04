import React from 'react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { pencil } from 'react-icons-kit/fa/pencil';

const RevenuesKwhListFormView = ({
    revenueKwh: revenueKwhDetails,
    projectName,
    permissions,
    showActionButtons,
    highlightLine,
    onLineEnter,
    onLineLeave,
}) => {
    const navigate = useNavigate();

    const { revenueId, dateBegin, dateEnd, status, statusRevenue } = revenueKwhDetails;

    const statusName = status => {
        switch (status) {
            case 'new':
                return 'Nieuw';
            case 'concept':
                return 'Concept';
            case 'concept-to-update':
                return 'Concept (bijwerken noodzakelijk)';
            case 'confirmed':
                return 'Definitief';
            case 'in-progress':
                return 'Bezig...';
            case 'in-progress-update':
                return 'Bezig met bijwerken...';
            case 'in-progress-report':
                return 'Bezig met rapportage...';
            case 'in-progress-process':
                return 'Bezig met verdelen...';
            case 'processed':
                return 'Verwerkt';
        }
        return '';
    };
    const statusRevenueName = statusRevenue => {
        switch (statusRevenue) {
            case 'new':
                return 'Nieuw';
            case 'concept':
                return 'Concept';
            case 'concept-to-update':
                return 'Concept (bijwerken noodzakelijk)';
            case 'confirmed':
                return 'Definitief';
            case 'in-progress':
                return 'Bezig...';
            case 'in-progress-update':
                return 'Bezig met bijwerken...';
            case 'in-progress-report':
                return 'Bezig met rapportage...';
            case 'in-progress-process':
                return 'Bezig met verdelen...';
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
            <div className="col-sm-2">Opbrengst Kwh</div>
            <div className="col-sm-3">
                {dateBegin ? moment(dateBegin).format('L') : 'onbekend'}
                {' t/m '}
                {dateEnd ? moment(dateEnd).format('L') : 'onbekend'}
            </div>
            <div className="col-sm-1">{statusName(status)}</div>
            <div className="col-sm-1">{statusRevenueName(statusRevenue)}</div>
            <div className="col-sm-1">
                {showActionButtons && permissions.menuProjects ? (
                    <a role="button" onClick={() => navigate(`/project/opbrengst-kwh/${revenueId}`)}>
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

export default connect(mapStateToProps)(RevenuesKwhListFormView);
