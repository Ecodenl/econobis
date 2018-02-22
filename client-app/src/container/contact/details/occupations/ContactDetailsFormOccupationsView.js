import React from 'react';
import moment from "moment/moment";
moment.locale('nl');

const ContactDetailsFormOccupationsView = props => {
    const {organisation, occupation, startDate, endDate, primary } = props.occupation;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-3">
                    { organisation ? organisation.name : '' }
                </div>
                <div className="col-sm-2">
                    { occupation ? occupation.name : '' }
                </div>
                <div className="col-sm-2">
                    { startDate ? moment(startDate).format('DD-MM-Y') : '' }
                </div>
                <div className="col-sm-2">
                    { endDate ? moment(endDate).format('DD-MM-Y') : '' }
                </div>
                <div className="col-sm-2">
                    { primary ? <span className="h6 pull-right">Primair</span> : '' }
                </div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {(props.showActionButtons ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

export default ContactDetailsFormOccupationsView;
