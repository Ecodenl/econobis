import React from 'react';
import { hashHistory } from 'react-router';
import moment from "moment";
moment.locale('nl');

const MeasureDetailsMeasureRequestedView = props => {
    const {desiredDate, address} = props.measureRequested;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
        <div onClick={() => hashHistory.push(`/aanmelding/${address.registration.id}`)}>
            <div className="col-sm-3" >{address ? (address.registration ? address.registration.id : '') : ''}</div>
                <div className="col-sm-3">{desiredDate && moment(desiredDate.date).format('L')}</div>
                <div className="col-sm-5">{ address ? address.contact.fullName : '' }</div>
            <div className="col-sm-1">
                <div className="col-sm-1">
                    {(props.showActionButtons && <a role="button" ><span className="glyphicon glyphicon-pencil"  /> </a> : '')}
                </div>
            </div>
        </div>
        </div>
    );
};

export default MeasureDetailsMeasureRequestedView;
