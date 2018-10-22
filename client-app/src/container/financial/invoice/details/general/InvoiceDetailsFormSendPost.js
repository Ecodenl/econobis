import React, {Component} from 'react';

import Modal from '../../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../../api/invoice/InvoiceDetailsAPI";
import {connect} from "react-redux";
import {fetchInvoiceDetails} from "../../../../../actions/invoice/InvoiceDetailsActions";
import fileDownload from "js-file-download";
import InputDate from "../../../../../components/form/InputDate";
import validator from 'validator';
import moment from "moment/moment";

class InvoiceDetailsFormSendPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dateCollection: '',
            errors: {
                dateCollection: false,
            }
        };
    };

    confirmAction = event => {
        event.preventDefault();

        let hasErrors = false;

        if(this.props.paymentType === 'collection') {
            const {dateCollection} = this.state;

            // Validation
            let errors = {};

            if (validator.isEmpty(dateCollection + '')) {
                errors.dateCollection = true;
                hasErrors = true;
            }

            if(moment().isAfter(moment(dateCollection))){
                errors.dateCollection = true;
                hasErrors = true;
            }

            this.setState({...this.state, errors: errors});

            if (!hasErrors) {
                InvoiceDetailsAPI.sendPost(this.props.invoiceId, dateCollection).then((payload) => {
                    fileDownload(payload.data, payload.headers['x-filename']);
                    this.props.fetchInvoiceDetails(this.props.invoiceId);
                    this.props.closeModal();
                });
            }
        }

        else{
            InvoiceDetailsAPI.sendPost(this.props.invoiceId, null).then((payload) => {
                fileDownload(payload.data, payload.headers['x-filename']);
                this.props.fetchInvoiceDetails(this.props.invoiceId);
                this.props.closeModal();
            });
        }
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    render() {
        const { dateCollection } = this.state;

        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur verzenden"
                buttonConfirmText={"Verzenden"}
            >
                {this.props.paymentType === 'collection' &&
                <div className="row">
                    <InputDate
                        divSize={'col-xs-12'}
                        label="Incasso datum"
                        name="dateCollection"
                        value={dateCollection}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateCollection}
                    />
                </div>
                }

                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <p>Wilt u deze factuur verzenden?</p>
                        <p className={'text-danger'}><strong>Let op!</strong> Er is geen e-mailadres bekend. Deze factuur zal per post moeten worden verstuurd.</p>
                    </div>
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

export default connect(null, mapDispatchToProps)(InvoiceDetailsFormSendPost);