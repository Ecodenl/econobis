import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';
import moment from 'moment/moment';
import validator from 'validator';
import InputDate from '../../../../components/form/InputDate';
import { hashHistory } from 'react-router';

class InvoiceListSetPaid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invoice: {
                id: props.invoiceId,
                datePaid: moment().format('Y-MM-DD'),
            },
            errors: {
                datePaid: false,
            },
        };
    }

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                [name]: value,
            },
        });
    };

    confirmAction = event => {
        event.preventDefault();

        const { invoice } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(invoice.datePaid + '')) {
            errors.datePaid = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            InvoiceDetailsAPI.updateInvoice(invoice).then(payload => {
                hashHistory.push(`/financieel/${this.props.administrationId}/notas/betaald`);
            });
        }
    };

    render() {
        const { datePaid } = this.state.invoice;

        return (
            <Modal
                buttonConfirmText="Nota betalen"
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Nota betalen"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>
                            Wanneer de betaaldatum wordt ingevuld zal er een betaling aangemaakt worden met het
                            openstaande bedrag(€
                            {this.props.amountOpen.toLocaleString('nl', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                            ).
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
    }
}

export default InvoiceListSetPaid;
