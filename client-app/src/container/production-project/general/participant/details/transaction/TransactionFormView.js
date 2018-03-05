import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
moment.locale('nl');

const TransactionFormView = props => {
    const {type, dateTransaction, amount, iban, referral, entry, dateBooking } = props.participantTransaction;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>

                <div className="col-sm-1">
                    { type && type.name }
                </div>
                <div className="col-sm-2">
                    {dateTransaction ? moment(dateTransaction).format('L') : ''}
                </div>
                <div className="col-sm-2">
                    { amount }
                </div>
                <div className="col-sm-2">
                    { iban }
                </div>
                <div className="col-sm-2">
                    { referral }
                </div>
                <div className="col-sm-1">
                    { entry }
                </div>
                <div className="col-sm-1">
                    {dateBooking ? moment(dateBooking).format('L') : ''}
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

export default connect(mapStateToProps)(TransactionFormView);