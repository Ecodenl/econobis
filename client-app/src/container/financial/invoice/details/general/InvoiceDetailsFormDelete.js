import React from 'react';

import Modal from '../../../../../components/modal/Modal';
import {deleteInvoice} from "../../../../../actions/invoice/InvoiceDetailsActions";
import {connect} from "react-redux";

const InvoiceDetailsFormDelete = (props) => {
    const confirmAction = () => {
        props.deleteInvoice(props.id);

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
          <p>Verwijder factuur: <strong> {`${props.number}?` }</strong></p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteInvoice: (id) => {
        dispatch(deleteInvoice(id));
    },
});

export default connect(null, mapDispatchToProps)(InvoiceDetailsFormDelete);
