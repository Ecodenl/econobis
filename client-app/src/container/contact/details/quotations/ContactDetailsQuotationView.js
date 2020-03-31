import React from 'react';
import moment from 'moment';
import { hashHistory } from 'react-router';

const ContactDetailsQuotationView = props => {
    const { opportunity, dateRecorded, dateReleased } = props.quotation;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => hashHistory.push(`/kans/${opportunity.id}`)}>
                <div className="col-sm-2">{opportunity ? opportunity.number : ''}</div>
                <div className="col-sm-2">{opportunity ? opportunity.measureCategory.name : ''}</div>
                <div className="col-sm-2">{opportunity ? opportunity.status.name : ''}</div>
                <div className="col-sm-2">{dateRecorded ? moment(dateRecorded).format('L') : ''}</div>
                <div className="col-sm-2">{dateReleased ? moment(dateReleased).format('L') : ''}</div>
            </div>
        </div>
    );
};

export default ContactDetailsQuotationView;
