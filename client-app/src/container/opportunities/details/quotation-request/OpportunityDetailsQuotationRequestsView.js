import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';

const OpportunityDetailsQuotationRequestsView = props => {
    const navigate = useNavigate();

    const {
        id,
        organisationOrCoach,
        opportunityAction,
        createdAt,
        dateRecorded,
        datePlanned,
        status,
        dateReleased,
        usesPlanning,
    } = props.quotationRequest;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
            onDoubleClick={() => navigate(`/offerteverzoek/${id}`)}
        >
            <div className="col-sm-2">{organisationOrCoach && organisationOrCoach.fullName}</div>
            <div className="col-sm-2">{createdAt ? moment(createdAt).format('L') : ''}</div>
            <div className="col-sm-2">
                {opportunityAction ? opportunityAction.name : ''} {usesPlanning && <Icon size={14} icon={calendar} />}
            </div>
            <div className="col-sm-2">{dateRecorded ? moment(dateRecorded).format('L') : ''}</div>
            <div className="col-sm-2">{datePlanned ? moment(datePlanned).format('DD-MM-YYYY HH:mm') : ''}</div>
            <div className="col-sm-2">{status && status.name}</div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(OpportunityDetailsQuotationRequestsView);
