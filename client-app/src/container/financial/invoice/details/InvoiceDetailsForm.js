import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import InvoiceDetailsFormGeneral from './general/InvoiceDetailsFormGeneral';
import moment from 'moment/moment';
import InvoiceDetailsFormConclusion from './conclusion/InvoiceDetailsFormConclusion';
import InvoiceProductsForm from './invoice-products/InvoiceProductsForm';
import InvoicePaymentsForm from './invoice-payments/InvoicePaymentsForm';
import InvoiceMolliePaymentsForm from './invoice-mollie-payments/InvoiceMolliePaymentsForm';
import TwinfieldLogInvoicesForm from './twinfield-log-invoices/TwinfieldLogInvoicesForm';
import TwinfieldLogPaymentsForm from './twinfield-log-payments/TwinfieldLogPaymentsForm';
moment.locale('nl');

class InvoiceDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van nota.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.invoiceDetails)) {
            loadingText = 'Geen nota gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <InvoiceDetailsFormGeneral />
                <InvoiceProductsForm />
                {this.props.invoiceDetails.usesTwinfield ? <TwinfieldLogInvoicesForm /> : null}
                <InvoicePaymentsForm />
                {this.props.invoiceDetails.usesMollie ? <InvoiceMolliePaymentsForm /> : null}
                {this.props.invoiceDetails.usesTwinfield ? <TwinfieldLogPaymentsForm /> : null}
                <InvoiceDetailsFormConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoiceDetails: state.invoiceDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(InvoiceDetailsForm);
