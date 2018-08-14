import React from 'react';

import Modal from '../../../../../components/modal/Modal';
import {deleteParticipantProductionProject} from "../../../../../actions/participants-production-project/ParticipantProductionProjectDetailsActions";
import {connect} from "react-redux";

const ParticipantDetailsDelete = (props) => {
    const confirmAction = () => {
        props.deleteParticipantProductionProject(props.id);
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
            <p>Weet u zeker dat u deze participatie wilt verwijderen?</p>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteParticipantProductionProject: (id) => {
        dispatch(deleteParticipantProductionProject(id));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantDetailsDelete);
