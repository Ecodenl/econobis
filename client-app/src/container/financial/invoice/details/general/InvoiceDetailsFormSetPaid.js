import React, {Component} from 'react';

import Modal from '../../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../../api/invoice/InvoiceDetailsAPI";
import moment from "moment/moment";
import validator from "validator";
import InputDate from "../../../../../components/form/InputDate";
import {connect} from "react-redux";
import {fetchInvoiceDetails} from "../../../../../actions/invoice/InvoiceDetailsActions";

class InvoiceDetailsFormSetPaid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invoice: {
                id: props.invoiceId,
                datePaid: moment(),
            },
            errors: {
                datePaid: false,
            }
        };
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                [name]: value
            },
        });
    };

    confirmAction = event => {
        event.preventDefault();

        const {invoice} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(invoice.datePaid + '')) {
            errors.datePaid = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if (!hasErrors) {
            InvoiceDetailsAPI.updateInvoice(invoice).then((payload) => {
                this.props.fetchInvoiceDetails(invoice.id);
                this.props.closeModal();
            });
        }
    };

    render() {
        const {datePaid} = this.state.invoice;

        return (
            <Modal
                buttonConfirmText="Factuur betalen"
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur betalen"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                    Wanneer de betaaldatum wordt ingevuld zal er een betaling aangemaakt worden met het openstaande bedrag(€{this.props.amountOpen.toLocaleString('nl', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}).
                    </span>
                    </div>
                </div>
                <div className="row">
                    <InputDate
                        divSize={'col-sm-12'}
                        label="Datum betaald"
                        name="datePaid"
                        value={datePaid}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.datePaid}
                    />
                </div>
            </Modal>
        );
    };
}

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: (id) => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(InvoiceDetailsFormSetPaid);