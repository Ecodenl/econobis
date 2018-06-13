import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import OrderDetailsAPI from "../../../../api/order/OrderDetailsAPI";
import {hashHistory} from "react-router";
import moment from "moment/moment";
import validator from "validator";
import InputDate from "../../../../components/form/InputDate";
import InputSelect from "../../../../components/form/InputSelect";
import InputText from "../../../../components/form/InputText";
import {connect} from "react-redux";

class OrderCreateConfirmCollection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invoice: {
                administrationId: props.administrationId,
                sendMethodId: 'mail',
                dateRequested: moment(),
                dateCollection: '',
                filter: props.filter,
            },
            errors: {
                sendMethodId: false,
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

        if (validator.isEmpty(invoice.sendMethodId + '')) {
            errors.invoice = true;
            hasErrors = true;
        }

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

    render() {
        const { sendMethodId, dateRequested, dateCollection } = this.state.invoice;

        return (
            <Modal
                modalClassName={'modal-lg'}
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur aanmaken"
                buttonConfirmText={"Aanmaken"}
            >
                <div className="row">
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
                    <InputDate
                        label="Aanvraag datum"
                        name="dateRequested"
                        value={dateRequested}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>
                <div className="row">
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

const mapStateToProps = (state) => {
    return {
        invoiceSendMethods: state.systemData.invoiceSendMethods,
    };
};

export default connect(mapStateToProps)(OrderCreateConfirmCollection);