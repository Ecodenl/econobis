import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import IntakeDetailsAPI from '../../../api/intake/IntakeDetailsAPI';

const IntakeDetailsDelete = (props) => {
    const confirmAction = () => {
        IntakeDetailsAPI.deleteIntake(props.id).then((payload) => {
            hashHistory.push('/intakes');
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
          <p>Verwijder intake: <strong> {`${props.fullStreet}` } </strong></p>
        </Modal>
    );
};

export default IntakeDetailsDelete;
