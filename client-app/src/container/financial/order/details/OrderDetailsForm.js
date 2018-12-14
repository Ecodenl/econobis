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

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van order.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (isEmpty(this.props.orderDetails)) {
            loadingText = 'Geen order gevonden!';
        }
        else {
            loading = false;
        }

        return (
            loading ?
                <div>{loadingText}</div>
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
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(OrderDetailsForm);
