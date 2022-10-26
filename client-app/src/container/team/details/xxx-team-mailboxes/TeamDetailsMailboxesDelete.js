import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteTeamMailbox } from '../../../../actions/team/TeamDetailsActions';

const TeamDetailsMailboxesDelete = props => {
    const confirmAction = () => {
        props.deleteTeamMailbox(props.teamId, props.mailboxId);
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
            <p>Wil je deze mailbox ontkoppelen van dit team?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        teamId: state.teamDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteTeamMailbox: (teamId, mailboxId) => {
        dispatch(deleteTeamMailbox(teamId, mailboxId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsMailboxesDelete);
