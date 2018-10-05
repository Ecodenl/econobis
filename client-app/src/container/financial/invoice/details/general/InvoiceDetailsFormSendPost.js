import React, {Component} from 'react';

import Modal from '../../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../../api/invoice/InvoiceDetailsAPI";
import {connect} from "react-redux";
import {fetchInvoiceDetails} from "../../../../../actions/invoice/InvoiceDetailsActions";
import fileDownload from "js-file-download";
import moment from "moment/moment";

class InvoiceDetailsFormSendPost extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.sendPost(this.props.invoiceId).then((payload) => {
            fileDownload(payload.data, payload.headers['x-filename']);
            this.props.fetchInvoiceDetails(this.props.invoiceId);
            this.props.closeModal();
        });
    };

    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur verzenden"
                buttonConfirmText={"Verzenden"}
            >
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