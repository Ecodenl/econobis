import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
moment.locale('nl');

const InvoicePaymentsFormView = props => {
    const {datePaid, amount, createdAt} = props.payment;

    return (
        <div className={`row border ${props.highlightLine}`}  onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-4">
                    {datePaid ? moment(datePaid).format('L') : ''}
                </div>
                <div className="col-sm-3">
                    { amount ? '€' + amount.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '€0,00'}
                </div>
                <div className="col-sm-4">
                    {createdAt ? moment(createdAt).format('L') : ''}
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
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(InvoicePaymentsFormView);
