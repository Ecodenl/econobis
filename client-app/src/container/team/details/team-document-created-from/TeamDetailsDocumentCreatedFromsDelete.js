import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteTeamDocumentCreatedFrom } from '../../../../actions/team/TeamDetailsActions';

const TeamDetailsDocumentCreatedFromsDelete = props => {
    const confirmAction = () => {
        props.deleteTeamDocumentCreatedFrom(props.teamId, props.documentCreatedFromId);
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
            <p>Wil je dit document gemaakt vanuit ontkoppelen van dit team?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        teamId: state.teamDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteTeamDocumentCreatedFrom: (teamId, documentCreatedFromId) => {
        dispatch(deleteTeamDocumentCreatedFrom(teamId, documentCreatedFromId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsDocumentCreatedFromsDelete);
