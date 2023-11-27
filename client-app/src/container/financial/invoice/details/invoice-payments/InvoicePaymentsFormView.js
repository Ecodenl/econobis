import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
moment.locale('nl');

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const InvoicePaymentsFormView = props => {
    const { datePaid, amount, paymentReference, createdAt } = props.payment;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-3">{datePaid ? moment(datePaid).format('L') : ''}</div>
                <div className="col-sm-2">
                    {amount
                        ? '€ ' + amount.toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : '€ 0,00'}
                </div>
                <div className="col-sm-3">{paymentReference ? paymentReference : ''}</div>
                <div className="col-sm-3">{createdAt ? moment(createdAt).format('L') : ''}</div>
            </div>
            <div className="col-sm-1">
                {!props.invoiceInTwinfield &&
                !props.invoicePaidInTwinfield &&
                props.showActionButtons &&
                props.permissions.manageFinancial ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                &nbsp;
                {!props.invoiceInTwinfield &&
                !props.invoicePaidInTwinfield &&
                props.showActionButtons &&
                props.permissions.manageFinancial ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(InvoicePaymentsFormView);
