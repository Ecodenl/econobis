import React from 'react';
import { hashHistory } from 'react-router';
import moment from "moment";
moment.locale('nl');

const MeasureDetailsMeasureTakenView = props => {
    const {measureDate, address} = props.measureTaken;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
        <div onClick={() => hashHistory.push(`/intake/${address.intake.id}`)}>
            <div className="col-sm-3" >{address ? (address.intake ? address.intake.id : '') : ''}</div>
                <div className="col-sm-3">{measureDate && moment(measureDate.date).format('L')}</div>
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

export default MeasureDetailsMeasureTakenView;
