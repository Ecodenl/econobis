import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import InvoiceDetailsFormGeneral from './general/InvoiceDetailsFormGeneral';
import moment from "moment/moment";
import InvoiceDetailsFormConclusion from "./conclusion/InvoiceDetailsFormConclusion";
import InvoiceProductsForm from "./invoice-products/InvoiceProductsForm";
import InvoicePaymentsForm from "./invoice-payments/InvoicePaymentsForm";
moment.locale('nl');

class InvoiceDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.invoiceDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <InvoiceDetailsFormGeneral />
                    <InvoiceProductsForm />
                    <InvoicePaymentsForm />
                    <InvoiceDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps)(InvoiceDetailsForm);
