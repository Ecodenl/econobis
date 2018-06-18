import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import PaymentInvoicesAPI from "../../../../api/payment-invoice/PaymentInvoicesAPI";

import {hashHistory} from "react-router";

class PaymentInvoiceListSetNotPaid extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();
        PaymentInvoicesAPI.setNotPaid(this.props.invoiceId).then((payload) => {
            this.props.closeModal();
            hashHistory.push(`/financieel/${this.props.administrationId}/uitkering-facturen/niet-betaald`);
        });
    };

    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur niet betaald"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Wilt u deze factuur als niet betaald markeren?
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default PaymentInvoiceListSetNotPaid;