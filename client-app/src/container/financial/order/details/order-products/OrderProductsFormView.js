import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';

moment.locale('nl');

const OrderProductsFormView = props => {
    const {
        product,
        amount,
        amountInclReductionInclVat,
        dateStart,
        dateEnd,
        amountInclReductionInclVatPerYear,
        isOneTimeAndPaidProduct,
        period,
    } = props.orderProduct;

    const notActiveAnymore = moment(moment().format('YYYY-MM-DD')).isAfter(moment(dateEnd).format('YYYY-MM-DD'));

    const classRowIsPaid = isOneTimeAndPaidProduct ? 'paid-order-product-row' : '';
    const classRowNotActiveAnymore = notActiveAnymore ? 'not-active-anymore-row' : '';

    const classTextNotActiveAnymore = notActiveAnymore ? 'not-active-anymore-text' : '';

    return (
        <div
            className={`row border ${props.highlightLine} ${classRowIsPaid} ${classRowNotActiveAnymore}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-1">{product && product.code}</div>
                <div className="col-sm-2">{product ? product.invoiceText : ''}</div>
                <div className="col-sm-1">{amount ? amount : ''}</div>
                <div className="col-sm-2">
                    {amountInclReductionInclVat
                        ? '€ ' +
                          amountInclReductionInclVat.toLocaleString('nl', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })
                        : '€ 0,00'}
                </div>
                <div className="col-sm-2">{product.invoiceFrequency ? product.invoiceFrequency.name : ''}</div>
                <div className="col-sm-1">
                    {amountInclReductionInclVatPerYear
                        ? '€ ' +
                          amountInclReductionInclVatPerYear.toLocaleString('nl', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })
                        : '€ 0,00'}
                </div>
                <div className={`col-sm-1`}>{dateStart ? moment(dateStart).format('L') : ''}</div>
                <div className={`col-sm-1 ${classTextNotActiveAnymore}`}>
                    {dateEnd ? moment(dateEnd).format('L') : ''}
                </div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons && props.permissions.manageFinancial ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                        &nbsp;
                    </a>
                ) : (
                    ''
                )}
                {props.showActionButtons && props.permissions.manageFinancial ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                        &nbsp;
                    </a>
                ) : (
                    ''
                )}
            </div>
            {period && <div className="col-sm-12">Periode {period}</div>}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(OrderProductsFormView);
