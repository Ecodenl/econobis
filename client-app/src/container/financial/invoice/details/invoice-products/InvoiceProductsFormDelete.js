import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { fetchInvoiceDetails } from '../../../../../actions/invoice/InvoiceDetailsActions';
import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';

const InvoiceProductsFormDelete = props => {
    const confirmAction = () => {
        InvoiceDetailsAPI.deleteInvoiceProduct(props.id).then(payload => {
            props.fetchInvoiceDetails(props.invoiceId);
            props.closeDeleteItemModal();
        });
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Verwijder notaregel?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: id => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(InvoiceProductsFormDelete);
