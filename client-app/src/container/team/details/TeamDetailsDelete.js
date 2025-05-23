import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteTeam } from '../../../actions/team/TeamsActions';
import { useNavigate } from 'react-router-dom';

const TeamDetailsDelete = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        props.deleteTeam(props.id);
        props.closeDeleteItemModal();
        navigate(`/teams`);
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder team: <strong> {props.name} </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteTeam: id => {
        dispatch(deleteTeam(id));
    },
});

export default connect(null, mapDispatchToProps)(TeamDetailsDelete);
