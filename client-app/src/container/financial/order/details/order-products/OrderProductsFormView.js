import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
moment.locale('nl');

const OrderProductsFormView = props => {
    const {product, description, amount, totalPriceInclVatAndReduction, dateStart, dateEnd } = props.orderProduct;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-2">
                    { product && product.code }
                </div>
                <div className="col-sm-3">
                    { description ? description : '' }
                </div>
                <div className="col-sm-1">
                    {amount ? amount : ''}
                </div>
                <div className="col-sm-1">
                    { totalPriceInclVatAndReduction ? '€' + totalPriceInclVatAndReduction.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '€0,00'}
                </div>
                <div className="col-sm-2">
                    {dateStart ? moment(dateStart).format('L') : ''}
                </div>
                <div className="col-sm-2">
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
