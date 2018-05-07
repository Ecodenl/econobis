import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
moment.locale('nl');

const OrderProductsFormView = props => {
    const {product, description, amount, totalPriceInclVatAndReduction, dateStart, dateEnd, totalPriceInclVatAndReductionPerYear } = props.orderProduct;

    const notActiveYet = moment(moment().format('YYYY-MM-DD')).isBefore(moment(dateStart).format('YYYY-MM-DD'));
    const notActiveAnymore = moment(moment().format('YYYY-MM-DD')).isAfter(moment(dateEnd).format('YYYY-MM-DD'));

    const classRowNotActiveYet = notActiveYet ? 'not-active-yet-row' : '';
    const classRowNotActiveAnymore = notActiveAnymore ? 'not-active-anymore-row' : '';

    const classTextNotActiveYet = notActiveYet ? 'not-active-yet-text' : '';
    const classTextNotActiveAnymore = notActiveAnymore ? 'not-active-anymore-text' : '';

    return (
        <div className={`row border ${props.highlightLine} ${classRowNotActiveYet} ${classRowNotActiveAnymore}`}  onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
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
                    { product ? product.invoiceFrequency.name : ''}
                </div>
                <div className="col-sm-2">
                    { totalPriceInclVatAndReductionPerYear ? '€' + totalPriceInclVatAndReductionPerYear.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '€0,00'}
                </div>
                <div className={`col-sm-1 ${classTextNotActiveYet}`}>
                    {dateStart ? moment(dateStart).format('L') : ''}
                </div>
                <div className={`col-sm-1 ${classTextNotActiveAnymore}`}>
                    {dateEnd ? moment(dateEnd).format('L') : ''}
                </div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.manageFinancial ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
           </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OrderProductsFormView);
