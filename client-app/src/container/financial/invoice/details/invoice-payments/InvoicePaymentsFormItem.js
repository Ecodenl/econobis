import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';
import { fetchInvoiceDetails } from '../../../../../actions/invoice/InvoiceDetailsActions';
import InvoicePaymentsFormView from './InvoicePaymentsFormView';
import InvoicePaymentsFormEdit from './InvoicePaymentsFormEdit';
import { isEqual } from 'lodash';
import validator from 'validator';
import InvoicePaymentsFormDelete from './InvoicePaymentsFormDelete';

class InvoicePaymentsFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            payment: {
                ...props.payment,
            },
            errors: {
                amount: false,
                datePaid: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.payment, nextProps.payment)) {
            this.setState({
                ...this.state,
                payment: {
                    ...nextProps.payment,
                },
            });
        }
    }

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
            payment: { ...this.props.payment },
        });

        this.closeEdit();
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            payment: {
                ...this.state.payment,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            payment: {
                ...this.state.payment,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        let errors = {};
        let hasErrors = false;

        const { payment } = this.state;

        if (validator.isEmpty(payment.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }
        if (validator.isEmpty(payment.datePaid + '')) {
            errors.datePaid = true;
            hasErrors = true;
        }
        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            InvoiceDetailsAPI.updatePayment(payment).then(payload => {
                this.props.fetchInvoiceDetails(this.state.payment.invoiceId);
                this.closeEdit();
            });
    };

    render() {
        return (
            <div>
                <InvoicePaymentsFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    payment={this.state.payment}
                    invoiceInTwinfield={this.props.invoiceInTwinfield}
                    invoicePaidInTwinfield={this.props.invoicePaidInTwinfield}
                />
                {!this.props.invoiceInTwinfield &&
                    !this.props.invoicePaidInTwinfield &&
                    this.state.showEdit &&
                    this.props.permissions.manageFinancial && (
                        <InvoicePaymentsFormEdit
                            errors={this.state.errors}
                            payment={this.state.payment}
                            handleInputChange={this.handleInputChange}
                            handleInputChangeDate={this.handleInputChangeDate}
                            handleSubmit={this.handleSubmit}
                            cancelEdit={this.cancelEdit}
                        />
                    )}
                {!this.props.invoiceInTwinfield &&
                    !this.props.invoicePaidInTwinfield &&
                    this.state.showDelete &&
                    this.props.permissions.manageFinancial && (
                        <InvoicePaymentsFormDelete
                            closeDeleteItemModal={this.toggleDelete}
                            id={this.state.payment.id}
                            invoiceId={this.state.payment.invoiceId}
                        />
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        invoiceInTwinfield: state.invoiceDetails.invoiceInTwinfield,
        invoicePaidInTwinfield: state.invoiceDetails.invoicePaidInTwinfield,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: id => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePaymentsFormItem);
