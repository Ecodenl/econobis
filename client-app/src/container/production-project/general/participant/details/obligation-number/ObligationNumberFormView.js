import React from 'react';
import moment from "moment/moment";
moment.locale('nl');

const ObligationNumberFormView = props => {
    const {number } = props.obligationNumber;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-11">
                    { number  }
                </div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {(props.showActionButtons ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

export default ObligationNumberFormView;
