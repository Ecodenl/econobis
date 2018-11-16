import React from 'react';
import {connect} from 'react-redux';

import OrderProductsFormItem from "./OrderProductsFormItem";

const OrderProductsFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Productcode</div>
                <div className="col-sm-2">Omschrijving</div>
                <div className="col-sm-1">Aantal</div>
                <div className="col-sm-2">Prijs incl. BTW</div>
                <div className="col-sm-2">Prijs per</div>
                <div className="col-sm-1">Prijs incl. BTW/jaar</div>
                <div className="col-sm-1">Begin datum</div>
                <div className="col-sm-1">Eind datum</div>
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
