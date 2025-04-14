import React from 'react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const RevenuePartsKwhListFormView = ({
    revenuePartKwh: revenuePartKwhDetails,
    showActionButtons,
    permissions,
    toggleDelete,
    highlightLine,
    onLineEnter,
    onLineLeave,
}) => {
    const navigate = useNavigate();

    const {
        id,
        revenueId,
        confirmed,
        dateBegin,
        dateEnd,
        status,
        deliveredTotalConcept,
        deliveredTotalConfirmed,
        deliveredTotalProcessed,
        isLastRevenuePartsKwh,
    } = revenuePartKwhDetails;

    const statusText = status => {
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
                return 'Bezig met verwerken...';
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
            <div className="col-sm-2">{dateBegin ? moment(dateBegin).format('L') : ''}</div>
            <div className="col-sm-2">{dateEnd ? moment(dateEnd).format('L') : ''}</div>
            <div className="col-sm-1">{status ? statusText(status) : ''}</div>
            <div className="col-sm-2">{deliveredTotalConcept ? deliveredTotalConcept : ''}</div>
            <div className="col-sm-2">{deliveredTotalConfirmed ? deliveredTotalConfirmed : ''}</div>
            <div className="col-sm-2">{deliveredTotalProcessed ? deliveredTotalProcessed : ''}</div>
            <div className="col-sm-1">
                {showActionButtons ? (
                    <a role="button" onClick={() => navigate(`/project/opbrengst-kwh/${revenueId}/deelperiode/${id}`)}>
                        <Icon className="mybtn-success" size={14} icon={confirmed ? eye : pencil} />
                    </a>
                ) : (
                    ''
                )}
                {/* Laatste deelperiode met nog status new mag je verwijderen */}
                {showActionButtons && permissions.manageFinancial && isLastRevenuePartsKwh && status === 'new' ? (
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
    };
};

export default connect(mapStateToProps)(RevenuePartsKwhListFormView);
