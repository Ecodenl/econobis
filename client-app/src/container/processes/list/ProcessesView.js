import React from 'react';
import moment from 'moment/moment';

const ProcessesView = props => {
    const { value, createdAt, jobCategoryId } = props.job;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div className="col-sm-2">{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
            <div className="col-sm-6">{value}</div>
            <div className="col-sm-4">{jobCategoryId}</div>
        </div>
    );
};

export default ProcessesView;
