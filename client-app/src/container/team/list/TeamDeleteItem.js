import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import {deleteTeam} from "../../../actions/team/TeamsActions";

const TeamDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteTeam(props.id);
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
            Verwijder team: <strong> { props.name } </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteTeam: (id) => {
        dispatch(deleteTeam(id));
    },
});

export default connect(null, mapDispatchToProps)(TeamDeleteItem);
