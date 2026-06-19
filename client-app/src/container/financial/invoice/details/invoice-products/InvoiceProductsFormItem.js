import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchInvoiceDetails } from '../../../../../actions/invoice/InvoiceDetailsActions';
import InvoiceProductsFormView from './InvoiceProductsFormView';
import validator from 'validator';
import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';
import { isEqual } from 'lodash';
import InvoiceProductsFormEdit from './InvoiceProductsFormEdit';
import InvoiceProductsFormDelete from './InvoiceProductsFormDelete';

class InvoiceProductsFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            totalPrice: props.invoiceProduct.amountInclVatInclReduction,
            invoiceProduct: {
                ...props.invoiceProduct,
                variablePrice: props.invoiceProduct.priceInclVat
                    ? Math.round(props.invoiceProduct.priceInclVat * 100) / 100
                    : 0,
            },
            errors: {
                amount: false,
                description: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.invoiceProduct, nextProps.invoiceProduct)) {
            this.setState({
                ...this.state,
                totalPrice: nextProps.invoiceProduct.amountInclVatInclReduction,
                invoiceProduct: {
                    ...nextProps.invoiceProduct,
                    variablePrice: nextProps.invoiceProduct.priceInclVat
                        ? Math.round(nextProps.invoiceProduct.priceInclVat * 100) / 100
                        : 0,
                },
            });
        }
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            invoiceProduct: { ...this.props.invoiceProduct },
        });

        this.closeEdit();
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                invoiceProduct: {
                    ...this.state.invoiceProduct,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    updatePrice = () => {
        let price = 0;
        if (this.state.invoiceProduct.variablePrice) {
            price = validator.isFloat(this.state.invoiceProduct.variablePrice + '')
                ? this.state.invoiceProduct.variablePrice
                : 0;
        } else {
            price =
                this.props.invoiceProduct.product.currentPrice &&
                validator.isFloat(this.props.invoiceProduct.product.currentPrice.priceInclVat + '')
                    ? this.props.invoiceProduct.product.currentPrice.priceInclVat
                    : 0;
        }
        let amount = validator.isFloat(this.state.invoiceProduct.amount + '') ? this.state.invoiceProduct.amount : 0;
        let percentageReduction = validator.isFloat(this.state.invoiceProduct.percentageReduction + '')
            ? this.state.invoiceProduct.percentageReduction
            : 0;
        let amountReduction = validator.isFloat(this.state.invoiceProduct.amountReduction + '')
            ? this.state.invoiceProduct.amountReduction
            : 0;

        let totalPrice = 0;

        if (price < 0) {
            const reduction = parseFloat(100) + parseFloat(percentageReduction);
            totalPrice = price * amount * (reduction / 100) - amountReduction;
        } else {
            totalPrice = price * amount * ((100 - percentageReduction) / 100) - amountReduction;
        }

        this.setState({
            ...this.state,
            totalPrice: totalPrice,
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            invoiceProduct: {
                ...this.state.invoiceProduct,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        let errors = {};
        let hasErrors = false;

        const { invoiceProduct } = this.state;

        if (validator.isEmpty(invoiceProduct.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }

        if (validator.isEmpty(invoiceProduct.description + '')) {
            errors.description = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            InvoiceDetailsAPI.updateInvoiceProduct(invoiceProduct).then(payload => {
                this.props.fetchInvoiceDetails(this.state.invoiceProduct.invoiceId);
                this.closeEdit();
            });
    };

    handleInputChangeVariablePrice = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                price: value,
                invoiceProduct: {
                    ...this.state.invoiceProduct,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    render() {
        return (
            <div>
                <InvoiceProductsFormView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    showActionButtons={this.state.showActionButtons}
                    invoiceProduct={this.state.invoiceProduct}
                    invoiceDetails={this.props.invoiceDetails}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                />
                {this.state.showEdit && this.props.permissions.manageFinancial && (
                    <InvoiceProductsFormEdit
                        invoiceDetails={this.props.invoiceDetails}
                        errors={this.state.errors}
                        totalPrice={this.state.totalPrice}
                        invoiceProduct={this.state.invoiceProduct}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        handleInputChangeVariablePrice={this.handleInputChangeVariablePrice}
                        productVariablePrice={this.state.invoiceProduct.product.hasVariablePrice === 'variable'}
                    />
                )}
                {this.state.showDelete && this.props.permissions.manageFinancial && (
                    <InvoiceProductsFormDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={this.state.invoiceProduct.id}
                        invoiceId={this.state.invoiceProduct.invoiceId}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        invoiceDetails: state.invoiceDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: id => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProductsFormItem);
