import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
moment.locale('nl');

const OrderProductsFormView = props => {
    const {product, description, amount, totalPriceInclVatAndReduction, dateStart, dateEnd, totalPriceInclVatAndReductionPerYear, isOneTimeAndPaidProduct, period } = props.orderProduct;

    const notActiveAnymore = moment(moment().format('YYYY-MM-DD')).isAfter(moment(dateEnd).format('YYYY-MM-DD'));

    const classRowIsPaid = isOneTimeAndPaidProduct ? 'paid-order-product-row' : '';
    const classRowNotActiveAnymore = notActiveAnymore ? 'not-active-anymore-row' : '';

    const classTextNotActiveAnymore = notActiveAnymore ? 'not-active-anymore-text' : '';

    return (
        <div className={`row border ${props.highlightLine} ${classRowIsPaid} ${classRowNotActiveAnymore}`}  onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-1">
                    { product && product.code }
                </div>
                <div className="col-sm-2">
                    { description ? description : '' }
                </div>
                <div className="col-sm-1">
                    {amount ? amount : ''}
                </div>
                <div className="col-sm-1">
                    { totalPriceInclVatAndReduction ? '€' + totalPriceInclVatAndReduction.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '€0,00'}
                </div>
                <div className="col-sm-2">
                    { product.invoiceFrequency ? product.invoiceFrequency.name : ''}
                </div>
                <div className="col-sm-2">
                    { totalPriceInclVatAndReductionPerYear ? '€' + totalPriceInclVatAndReductionPerYear.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '€0,00'}
                </div>
                <div className={`col-sm-1`}>
                    {dateStart ? moment(dateStart).format('L') : ''}
                </div>
                <div className={`col-sm-1 ${classTextNotActiveAnymore}`}>
                    {dateEnd ? moment(dateEnd).format('L') : ''}
                </div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.manageFinancial ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {(props.showActionButtons && props.permissions.manageFinancial ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
                </div>
            {period &&
            <div className="col-sm-12">
                <strong>Periode {period}</strong>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OrderProductsFormView);
