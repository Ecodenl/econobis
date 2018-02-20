import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";

const OpportunityDetailsQuotationRequestsView = props => {
    const {organisation, createdAt, dateRecorded, status, dateReleased, dateValid} = props.quotationRequest;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()}
             onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-2">{organisation && organisation.name}</div>
            <div className="col-sm-2">{createdAt ? moment(createdAt.date).format('L') : ''}</div>
            <div className="col-sm-2">{dateRecorded ? moment(dateRecorded).format('L') : ''}</div>
            <div className="col-sm-2">{status && status.name}</div>
            <div className="col-sm-2">{dateReleased ? moment(dateReleased).format('L') : ''}</div>
            <div className="col-sm-2">{dateValid ? moment(dateValid).format('L') : ''}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OpportunityDetailsQuotationRequestsView);
