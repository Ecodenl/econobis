import React from 'react';
import { hashHistory } from 'react-router';
import moment from "moment";
moment.locale('nl');

const MeasureDetailsOpportunityView = props => {
    const {id, number, createdAt, contact, campaign} = props.opportunity;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
        <div onClick={() => hashHistory.push(`/kans/${id}`)}>
            <div className="col-sm-2" >{number}</div>
                <div className="col-sm-3">{createdAt && moment(createdAt.date).format('L')}</div>
                <div className="col-sm-3">{ contact ? contact.fullName : '' }</div>
                <div className="col-sm-3">{ campaign ? campaign.name : '' }</div>
            <div className="col-sm-1">
                <div className="col-sm-1">
                    {(props.showActionButtons && <a role="button" ><span className="glyphicon glyphicon-pencil"  /> </a> : '')}
                </div>
            </div>
        </div>
        </div>
    );
};

export default MeasureDetailsOpportunityView;
