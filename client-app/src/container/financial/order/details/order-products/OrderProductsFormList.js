import React from 'react';
import {connect} from 'react-redux';

import OrderProductsFormItem from "./OrderProductsFormItem";

const OrderProductsFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Productcode</div>
                <div className="col-sm-3">Omschrijving</div>
                <div className="col-sm-1">Aantal</div>
                <div className="col-sm-1">Prijs incl. BTW</div>
                <div className="col-sm-2">Datum in</div>
                <div className="col-sm-2">Datum uit</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.orderProducts.length > 0 ?
                    props.orderProducts.map(orderProduct => {
                        return <OrderProductsFormItem
                            key={orderProduct.id}
                            orderProduct={orderProduct}
                        />;
                    })
                    :
                    <div>Geen orderregels bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orderProducts: state.orderDetails.orderProducts,
    };
};

export default connect(mapStateToProps)(OrderProductsFormList);
