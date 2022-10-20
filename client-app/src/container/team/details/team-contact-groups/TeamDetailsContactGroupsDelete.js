import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteTeamContactGroup } from '../../../../actions/team/TeamDetailsActions';

const TeamDetailsContactGroupsDelete = props => {
    const confirmAction = () => {
        props.deleteTeamContactGroup(props.teamId, props.contactGroupId);
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
    deleteTeamContactGroup: (teamId, contactGroupId) => {
        dispatch(deleteTeamContactGroup(teamId, contactGroupId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsContactGroupsDelete);
