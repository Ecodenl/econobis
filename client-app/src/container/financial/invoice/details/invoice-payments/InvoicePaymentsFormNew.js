import React, {Component} from 'react';
import {connect} from 'react-redux';

import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';
import {fetchInvoiceDetails} from '../../../../../actions/invoice/InvoiceDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from "validator";
import InputDate from "../../../../../components/form/InputDate";
import moment from "moment/moment";

class InvoicePaymentsFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: {
                invoiceId: this.props.invoiceDetails.id,
                amount: '',
                datePaid: moment()
            },
            errors: {
                amount: false,
                datePaid: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
                ...this.state,
                payment: {
                    ...this.state.payment,
                    [name]: value
                },

            },
        );

    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            payment: {
                ...this.state.payment,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {payment} = this.state;

        let errors = {};
        let hasErrors = false;


        if (validator.isEmpty(payment.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }
        ;

        if (validator.isEmpty(payment.datePaid + '')) {
            errors.datePaid = true;
            hasErrors = true;
        }
        ;

        this.setState({...this.state, errors: errors});

        // If no errors send form
        !hasErrors &&
        InvoiceDetailsAPI.newPayment(payment).then((payload) => {
            this.props.fetchInvoiceDetails(payment.invoiceId);
            this.props.toggleShowNew();
        });
    };

    render() {

        const {amount, datePaid} = this.state.payment;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Bedrag"}
                                id={"amount"}
                                name={"amount"}
                                value={amount}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.amount}
                            />
                            <InputDate
                                label="Datum betaald"
                                name="datePaid"
                                value={datePaid}
                                onChangeAction={this.handleInputChangeDate}
                                required={"required"}
                                error={this.state.errors.datePaid}
                            />
                        </div>


                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                        onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                        value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: (id) => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePaymentsFormNew);
