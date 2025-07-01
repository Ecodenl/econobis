import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';

import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const InvoiceListSetIrrecoverableWrapper = props => {
    const navigate = useNavigate();
    return <InvoiceListSetIrrecoverable {...props} navigate={navigate} />;
};

class InvoiceListSetIrrecoverable extends Component {
    constructor(props) {
        super(props);
    }

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.setIrrecoverable(this.props.invoiceId).then(payload => {
            this.props.navigate(`/financieel/${this.props.administrationId}/notas/oninbaar`);
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

export default InvoiceListSetIrrecoverableWrapper;
