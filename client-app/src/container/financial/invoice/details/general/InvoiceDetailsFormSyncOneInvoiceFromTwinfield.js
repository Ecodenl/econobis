import React, { Component } from 'react';

import Modal from '../../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';
import { fetchInvoiceDetails } from '../../../../../actions/invoice/InvoiceDetailsActions';
import { connect } from 'react-redux';

class InvoiceDetailsFormSyncOneInvoiceFromTwinfield extends Component {
    constructor(props) {
        super(props);
    }

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.syncOneInvoiceFromTwinfield(this.props.administrationId, this.props.invoiceId).then(
            payload => {
                this.props.fetchInvoiceDetails(this.props.invoiceId);
                this.props.closeModal();
            }
        );
    };

    render() {
        console.log('this.props.invoiceDetails.administration_id');
        console.log(this.props.administrationId);
        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Twinfield betalingen synchroniseren "
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>Wilt u Twinfield betalingen synchroniseren voor deze nota ?</span>
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

export default connect(null, mapDispatchToProps)(InvoiceDetailsFormSyncOneInvoiceFromTwinfield);
