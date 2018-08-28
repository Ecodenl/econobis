import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import OrderDetailsFormGeneral from './general/OrderDetailsFormGeneral';
import moment from "moment/moment";
import OrderDetailsFormConclusion from "./conclusion/OrderDetailsFormConclusion";
import OrderProductsForm from "./order-products/OrderProductsForm";
moment.locale('nl');

class OrderDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.orderDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <OrderDetailsFormGeneral />
                    <OrderProductsForm />
                    <OrderDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(OrderDetailsForm);
