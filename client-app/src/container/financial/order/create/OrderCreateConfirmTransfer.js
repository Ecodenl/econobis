import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import OrderDetailsAPI from "../../../../api/order/OrderDetailsAPI";
import {hashHistory} from "react-router";
import moment from "moment/moment";
import InputDate from "../../../../components/form/InputDate";

class OrderCreateConfirmTransfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invoice: {
                administrationId: props.administrationId,
                orderId: props.orderId,
                dateRequested: moment(),
                filter: props.filter,
            },
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

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if (!hasErrors) {
            OrderDetailsAPI.createAll(invoice).then((payload) => {
                hashHistory.push(`/financieel/${this.props.administrationId}/facturen/gecontroleerd`);
            });
        }
    };

    render() {
        const { dateRequested } = this.state.invoice;

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

export default OrderCreateConfirmTransfer;