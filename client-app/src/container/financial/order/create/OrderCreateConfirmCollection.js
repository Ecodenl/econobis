import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import OrderDetailsAPI from "../../../../api/order/OrderDetailsAPI";
import {hashHistory} from "react-router";
import moment from "moment/moment";
import validator from "validator";
import InputDate from "../../../../components/form/InputDate";

class OrderCreateConfirmCollection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invoice: {
                administrationId: props.administrationId,
                dateRequested: moment(),
                dateCollection: '',
                filter: props.filter,
            },
            errors: {
                dateCollection: false,
            }
        };
    };

    confirmAction = event => {
        event.preventDefault();

        const {invoice} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(invoice.dateCollection + '')) {
            errors.dateCollection = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if (!hasErrors) {
            OrderDetailsAPI.createAll(invoice).then((payload) => {
                hashHistory.push(`/financieel/${this.props.administrationId}/facturen/gecontroleerd`);
            });
        }
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

    render() {
        const { dateRequested, dateCollection } = this.state.invoice;

        return (
            <Modal
                modalClassName={'modal-lg'}
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur aanmaken"
                buttonConfirmText={"Aanmaken"}
            >
                <div className="row">
                    <InputDate
                        label="Geplande factuur datum"
                        name="dateRequested"
                        value={dateRequested}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label="Incasso datum"
                        name="dateCollection"
                        value={dateCollection}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateCollection}
                    />
                </div>

                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Wilt u alle facturen({this.props.amountOfOrders}) aanmaken?
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default OrderCreateConfirmCollection;