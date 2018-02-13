import React from 'react';
import {hashHistory, Link} from 'react-router';
import moment from "moment";
moment.locale('nl');

const MeasureDetailsMeasureRequestedView = props => {
    const {id, contact, fullAddress} = props.measureRequested;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-3"  onClick={() => hashHistory.push(`/intake/${id}`)} ><Link className="link-underline">{id}</Link></div>
            <div className="col-sm-4" >{fullAddress ? fullAddress : ''}</div>
            <div className="col-sm-4"  onClick={() => hashHistory.push(`/contact/${contact.id}`)}><Link className="link-underline">{contact ? contact.fullName : ''}</Link></div>
            <div className="col-sm-1">
                <div className="col-sm-1">
                    {(props.showActionButtons && <a role="button" onClick={() => hashHistory.push(`/intake/${id}`)} ><span className="glyphicon glyphicon-pencil"  /> </a> : '')}
                </div>
            </div>
        </div>
    );
};

export default MeasureDetailsMeasureRequestedView;
