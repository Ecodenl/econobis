import React, {Component} from 'react';
import { connect } from 'react-redux';

import {fetchInvoiceDetails} from '../../../../../actions/invoice/InvoiceDetailsActions';
import InvoiceProductsFormView from './InvoiceProductsFormView';

class InvoiceProductsFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
            invoiceProduct: {
                ...props.invoiceProduct,
            },
        };

    };

    onLineEnter = () => {
        this.setState({
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <InvoiceProductsFormView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    invoiceProduct={this.state.invoiceProduct}
                />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
        invoiceDetails: state.invoiceDetails
    }
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: (id) => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProductsFormItem);
