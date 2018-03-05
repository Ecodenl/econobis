import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
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
                {(props.showActionButtons && props.permissions.manageFinancial ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {(props.showActionButtons && props.permissions.manageFinancial ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(ObligationNumberFormView);
