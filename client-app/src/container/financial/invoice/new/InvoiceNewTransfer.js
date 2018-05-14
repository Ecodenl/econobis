import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";
import {hashHistory} from "react-router";
import moment from "moment/moment";
import validator from "validator";
import {connect} from "react-redux";
import InputSelect from "../../../../components/form/InputSelect";
import InputText from "../../../../components/form/InputText";
import InputDate from "../../../../components/form/InputDate";

class InvoiceNewTransfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invoice: {
                orderId: props.orderId,
                sendMethodId: 'mail',
                dateRequested: moment(),
            },
            errors: {
                sendMethodId: false,
            }
        };
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                [name]: value
            },
        });
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

    confirmAction = () => {
        event.preventDefault();

        const {invoice} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(invoice.sendMethodId + '')) {
            errors.invoice = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if (!hasErrors) {
            InvoiceDetailsAPI.newInvoice(invoice).then((payload) => {
                hashHistory.push(`/factuur/${payload.data.id}`);
            }).catch(function (error) {
                console.log(error)
            });
        }
    };

    render() {
        const { sendMethodId, dateRequested } = this.state.invoice;

        return (
            <Modal
                modalClassName={'modal-lg'}
                buttonConfirmText="Aanmaken"
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Nieuwe factuur"
            >
                <div className="row">
                    <InputText
                        label="Order"
                        value={this.props.orderNumber}
                        name={'orderNumber'}
                        readOnly={true}
                    />
                    <InputSelect
                        label={"Verzend via"}
                        id="sendMethodId"
                        name={"sendMethodId"}
                        options={this.props.invoiceSendMethods}
                        value={sendMethodId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.sendMethodId}
                    />
                </div>
                <div className="row">
                    <InputDate
                        label="Aanvraag datum"
                        name="dateRequested"
                        value={dateRequested}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>
            </Modal>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        invoiceSendMethods: state.systemData.invoiceSendMethods,
    };
};

export default connect(mapStateToProps)(InvoiceNewTransfer);