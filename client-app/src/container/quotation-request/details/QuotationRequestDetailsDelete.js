import React from 'react';

import Modal from '../../../components/modal/Modal';
import {deleteQuotationRequest} from "../../../actions/quotation-request/QuotationRequestDetailsActions";
import {connect} from "react-redux";

const QuotationRequestDetailsDelete = (props) => {
    const confirmAction = () => {
        props.deleteQuotationRequest(props.id);
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
          <p>Verwijder offerteverzoek: <strong> {`${props.id}` } </strong></p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteQuotationRequest: (id) => {
        dispatch(deleteQuotationRequest(id));
    },
});

export default connect(null, mapDispatchToProps)(QuotationRequestDetailsDelete);
