import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import PaymentInvoicesAPI from '../../../../api/payment-invoice/PaymentInvoicesAPI';

import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const PaymentInvoiceListSetNotPaidWrapper = props => {
    const navigate = useNavigate();
    return <PaymentInvoiceListSetNotPaid {...props} navigate={navigate} />;
};

class PaymentInvoiceListSetNotPaid extends Component {
    constructor(props) {
        super(props);
    }

    confirmAction = event => {
        event.preventDefault();
        PaymentInvoicesAPI.setNotPaid(this.props.invoiceId).then(payload => {
            this.props.closeModal();
            this.props.navigate(`/financieel/${this.props.administrationId}/uitkering-notas/niet-betaald`);
        });
    };

    render() {
        return (
            <Modal closeModal={this.props.closeModal} confirmAction={this.confirmAction} title="Nota niet betaald">
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>Wilt u deze nota als niet betaald markeren?</span>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default PaymentInvoiceListSetNotPaidWrapper;
