import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteInvoiceFromGrid } from '../../../../actions/invoice/InvoicesActions';

const InvoiceListDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteInvoiceFromGrid(props.id);
        props.fetchInvoices();
        props.closeDeleteItemModal();
    };

    return (
        <Modal
        buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
      >
            Verwijder factuur: <strong> { props.number }? </strong>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteInvoiceFromGrid: (id) => {
        dispatch(deleteInvoiceFromGrid(id));
    },
});

export default connect(null, mapDispatchToProps)(InvoiceListDeleteItem);
