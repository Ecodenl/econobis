import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import RegistrationDetailsAPI from '../../../api/registration/RegistrationDetailsAPI';

const RegistrationDetailsDelete = (props) => {
    const confirmAction = () => {
        RegistrationDetailsAPI.deleteRegistration(props.id).then((payload) => {
            hashHistory.push('/aanmeldingen');
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
          <p>Verwijder aanmelding: <strong> {`${props.fullStreet}` } </strong></p>
        </Modal>
    );
};

export default RegistrationDetailsDelete;
