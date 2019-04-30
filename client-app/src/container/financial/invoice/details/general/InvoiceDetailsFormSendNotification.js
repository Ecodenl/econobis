import React, { Component } from 'react';

import Modal from '../../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';
import { connect } from 'react-redux';
import { fetchInvoiceDetails } from '../../../../../actions/invoice/InvoiceDetailsActions';

class InvoiceDetailsFormSendNotification extends Component {
    constructor(props) {
        super(props);
    }

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.sendNotification(this.props.invoiceId).then(payload => {
            this.props.fetchInvoiceDetails(this.props.invoiceId);
            this.props.closeModal();
        });
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Versturen"
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Notificatie versturen"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>{this.props.reminderText}</span>
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
)(InvoiceDetailsFormSendNotification);
