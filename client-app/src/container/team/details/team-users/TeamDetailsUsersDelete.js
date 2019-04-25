import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteTeamUser } from '../../../../actions/team/TeamDetailsActions';

const TeamDetailsUsersDelete = props => {
    const confirmAction = () => {
        props.deleteTeamUser(props.teamId, props.userId);
        props.toggleDelete();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleDelete}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Wil je deze gebruiker ontkoppelen van dit team?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        teamId: state.teamDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteTeamUser: (teamId, userId) => {
        dispatch(deleteTeamUser(teamId, userId));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetailsUsersDelete);
