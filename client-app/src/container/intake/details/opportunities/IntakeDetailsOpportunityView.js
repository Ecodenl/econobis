import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import { hashHistory } from 'react-router';

const IntakeDetailsOpportunityView = props => {
    const {id, number, createdAt, measure, status, quotationRequests} = props.opportunity;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
        <div onClick={() => hashHistory.push(`/kans/${id}`)}>
            <div className="col-sm-2" >{number}</div>
                <div className="col-sm-3">{createdAt ? moment(createdAt.date).format('L') : ''}</div>
                <div className="col-sm-3">{measure ? measure.name : ''}</div>
                <div className="col-sm-2">{status ? status.name : ''}</div>
                <div className="col-sm-2">{quotationRequests.length }</div>

        </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(IntakeDetailsOpportunityView);
