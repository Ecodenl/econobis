import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';
import moment from 'moment/moment';
import validator from 'validator';
import InputDate from '../../../../components/form/InputDate';
import { useNavigate } from 'react-router-dom';
import InputText from '../../../../components/form/InputText';

// Functionele wrapper voor de class component
const InvoiceListSetMultiplePaidWrapper = props => {
    const navigate = useNavigate();
    return <InvoiceListSetMultiplePaid {...props} navigate={navigate} />;
};

class InvoiceListSetMultiplePaid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invoice: {
                datePaid: moment().format('Y-MM-DD'),
                paymentReference: null,
            },
            errors: {
                datePaid: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                [name]: value,
            },
        });
    };

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

        let invoiceIds = this.props.invoiceIds;

        // If no errors send form
        if (!hasErrors) {
            InvoiceDetailsAPI.setInvoicesPaid(invoiceIds, invoice.datePaid, invoice.paymentReference).then(payload => {
                this.props.navigate(`/financieel/${this.props.administrationId}/notas/betaald`);
            });
        }
    };

    render() {
        const { datePaid, paymentReference } = this.state.invoice;

        return (
            <Modal
                buttonConfirmText="Nota's betalen"
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Nota's betalen"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>
                            Vul de betaaldatum en evt. het betalingskenmerk in en klik op Nota's betalen. Er wordt dan
                            een betaling aangemaakt voor het openstaande bedrag.
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
                <div className="row">
                    <InputText
                        divSize={'col-sm-12'}
                        label="Betalingskenmerk"
                        name="paymentReference"
                        value={paymentReference}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
            </Modal>
        );
    }
}

export default InvoiceListSetMultiplePaidWrapper;
