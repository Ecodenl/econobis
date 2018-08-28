import React from 'react';

import Modal from '../../../components/modal/Modal';
import {connect} from "react-redux";
import {deleteHousingFile} from "../../../actions/housing-file/HousingFileDetailsActions";

const HousingFileDetailsDelete = (props) => {
    const confirmAction = () => {
      props.deleteHousingFile(props.id);
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
          <p>Verwijder woningdossier: <strong> {`${props.fullStreet}` } </strong></p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteHousingFile: (id) => {
        dispatch(deleteHousingFile(id));
    },
});

export default connect(null, mapDispatchToProps)(HousingFileDetailsDelete);
