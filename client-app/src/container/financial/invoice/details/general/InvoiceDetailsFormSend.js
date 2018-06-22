import React, {Component} from 'react';

import Modal from '../../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../../api/invoice/InvoiceDetailsAPI";
import {connect} from "react-redux";
import {fetchInvoiceDetails} from "../../../../../actions/invoice/InvoiceDetailsActions";

class InvoiceDetailsFormSetChecked extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.send(this.props.invoiceId).then((payload) => {
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
                    <span>
                        Wilt u deze factuur verzenden?
                    </span>
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

export default connect(null, mapDispatchToProps)(InvoiceDetailsFormSetChecked);