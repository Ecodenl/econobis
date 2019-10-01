import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';

import { hashHistory } from 'react-router';

class InvoiceListSetIrrecoverable extends Component {
    constructor(props) {
        super(props);
    }

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.setIrrecoverable(this.props.invoiceId).then(payload => {
            hashHistory.push(`/financieel/${this.props.administrationId}/notas/oninbaar`);
        });
    };

    render() {
        return (
            <Modal closeModal={this.props.closeModal} confirmAction={this.confirmAction} title="Nota oninbaar">
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>Wilt u deze nota als oninbaar markeren?</span>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default InvoiceListSetIrrecoverable;
