import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../../../components/modal/Modal';
import ParticipantProductionProjectDetailsAPI from '../../../../../api/participant-production-project/ParticipantProductionProjectDetailsAPI';

const ParticipantDetailsDelete = (props) => {
    const confirmAction = () => {
        ParticipantProductionProjectDetailsAPI.deleteParticipantProductionProject(props.id).then(() => {
            hashHistory.push(`/productie-project/${props.productionProjectid}`);
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
            <p>Weet u zeker dat u deze participatie wilt verwijderen?</p>
      </Modal>
    );
};

export default ParticipantDetailsDelete;
