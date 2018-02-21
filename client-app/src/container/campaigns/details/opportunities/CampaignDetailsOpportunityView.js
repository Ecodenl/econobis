import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import { hashHistory } from 'react-router';

const CampaignDetailsOpportunityView = props => {
    const {id, number, intake, createdAt, measure, status, quotationRequests} = props.opportunity;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
        <div onClick={() => hashHistory.push(`/kans/${id}`)}>
            <div className="col-sm-2" >{number}</div>
                <div className="col-sm-2">{createdAt ? moment(createdAt.date).format('L') : ''}</div>
                <div className="col-sm-3 link-underline">{intake ? intake.contact.fullName : ''}</div>
                <div className="col-sm-2">{measure ? measure.name : ''}</div>
                <div className="col-sm-1">{status ? status.name : ''}</div>
                <div className="col-sm-1">{ quotationRequests.length }</div>
        </div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.manageMarketing ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(CampaignDetailsOpportunityView);
