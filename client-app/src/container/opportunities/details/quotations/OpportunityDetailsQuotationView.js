import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";

const OpportunityDetailQuotationsView = props => {
    const {organisationName, dateRequested, dateTaken, dateValidTill, dateRealised } = props.quotation;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-2">{props.opportunityMeasure}</div>
                <div className="col-sm-2">{organisationName}</div>
                <div className="col-sm-2">{dateRequested ? moment(dateRequested).format('L') : ''}</div>
                <div className="col-sm-2">{props.opportunityStatus}</div>
                <div className="col-sm-1">{dateTaken ? moment(dateTaken).format('L') : ''}</div>
                <div className="col-sm-1">{dateValidTill ? moment(dateValidTill).format('L') : ''}</div>
                <div className="col-sm-1">{dateRealised ? moment(dateRealised).format('L') : ''}</div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.manageOpportunity ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {/*{(props.showActionButtons ? <a role="button"><span className="glyphicon glyphicon-copy"  /> </a> : '')}*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OpportunityDetailQuotationsView);
