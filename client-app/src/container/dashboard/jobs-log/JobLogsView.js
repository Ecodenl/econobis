import React from 'react';
import moment from "moment/moment";

const JobLogsView = props => {
    const {value, createdAt} = props.job;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-8" >{value}</div>
            <div className="col-sm-4" >{moment(createdAt).format('L')}</div>
        </div>
    );
};


export default JobLogsView;
