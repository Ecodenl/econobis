import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import QuotationRequestDetailsAPI from '../../../api/quotation-request/QuotationRequestDetailsAPI';

const QuotationRequestDetailsDelete = (props) => {
    const confirmAction = () => {
        QuotationRequestDetailsAPI.deleteQuotationRequest(props.id).then((payload) => {
            hashHistory.push('/offerteverzoeken');
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
          <p>Verwijder offerteverzoek: <strong> {`${props.id}` } </strong></p>
        </Modal>
    );
};

export default QuotationRequestDetailsDelete;
