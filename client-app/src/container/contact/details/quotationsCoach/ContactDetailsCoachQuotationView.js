import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ContactDetailsCoachQuotationView = props => {
    const navigate = useNavigate();

    const { opportunity, dateRecorded, dateReleased } = props.quotation;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => navigate(`/kans/${opportunity.id}`)}>
                <div className="col-sm-2">{opportunity ? opportunity.number : ''}</div>
                <div className="col-sm-2">{opportunity ? opportunity.measureCategoryName : ''}</div>
                <div className="col-sm-2">{opportunity ? opportunity.statusName : ''}</div>
                <div className="col-sm-2">{dateRecorded ? moment(dateRecorded).format('L') : ''}</div>
                <div className="col-sm-2">{dateReleased ? moment(dateReleased).format('L') : ''}</div>
                <div className="col-sm-2">{opportunity ? opportunity.intakeContactFullName : ''}</div>
            </div>
        </div>
    );
};

export default ContactDetailsCoachQuotationView;
