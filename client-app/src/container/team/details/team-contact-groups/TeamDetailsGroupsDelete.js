import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteTeamGroup } from '../../../../actions/team/TeamDetailsActions';

const TeamDetailsGroupsDelete = props => {
    const confirmAction = () => {
        props.deleteTeamGroup(props.teamId, props.groupId);
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
    deleteTeamGroup: (teamId, groupId) => {
        dispatch(deleteTeamGroup(teamId, groupId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsGroupsDelete);
