import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";
import {hashHistory} from "react-router";
import fileDownload from "js-file-download";
import InputDate from "../../../../components/form/InputDate";
import validator from 'validator';
import moment from "moment/moment";
import {setError} from "../../../../actions/general/ErrorActions";
import {connect} from "react-redux";

class InvoiceSendConfirm extends Component {

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

        if(!this.props.canCreateInvoices['can']){
            this.props.setError(412, this.props.canCreateInvoices['message']);
            this.props.closeModal();
            return;
        }

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
                InvoiceDetailsAPI.sendAll(this.props.invoiceIds, dateCollection).then((payload) => {
                    if (payload && payload.headers && payload.headers['x-filename']) {
                        fileDownload(payload.data, payload.headers['x-filename']);
                    }
                });

                hashHistory.push(`/financieel/${this.props.administrationId}/facturen/verzonden`);
            }
        }

        else{
            InvoiceDetailsAPI.sendAll(this.props.invoiceIds, null).then((payload) => {
                if (payload && payload.headers && payload.headers['x-filename']) {
                    fileDownload(payload.data, payload.headers['x-filename']);
                }
            });

            hashHistory.push(`/financieel/${this.props.administrationId}/facturen/verzonden`);
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
                {this.props.paymentType === 'incasso' &&
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
                    <span>
                        Wilt u alle facturen verzenden?
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        canCreateInvoices: state.administrationDetails.canCreateInvoices,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSendConfirm);
