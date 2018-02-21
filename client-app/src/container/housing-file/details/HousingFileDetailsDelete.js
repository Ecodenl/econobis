import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import HousingFileDetailsAPI from '../../../api/housing-file/HousingFileDetailsAPI';

const HousingFileDetailsDelete = (props) => {
    const confirmAction = () => {
        HousingFileDetailsAPI.deleteHousingFile(props.id).then((payload) => {
            hashHistory.push('/woningdossiers');
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
          <p>Verwijder woningdossier: <strong> {`${props.fullStreet}` } </strong></p>
        </Modal>
    );
};

export default HousingFileDetailsDelete;
