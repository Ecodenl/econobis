import React, { Component } from 'react';

import Modal from '../../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';
import { fetchInvoiceDetails } from '../../../../../actions/invoice/InvoiceDetailsActions';
import { connect } from 'react-redux';

class InvoiceDetailsFormSetIrrecoverable extends Component {
    constructor(props) {
        super(props);
    }

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.setIrrecoverable(this.props.invoiceId).then(payload => {
            this.props.fetchInvoiceDetails(this.props.invoiceId);
            this.props.closeModal();
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

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: id => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(InvoiceDetailsFormSetIrrecoverable);
