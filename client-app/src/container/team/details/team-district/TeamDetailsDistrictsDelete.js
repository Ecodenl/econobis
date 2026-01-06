import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteTeamDistrict } from '../../../../actions/team/TeamDetailsActions';

const TeamDetailsDistrictsDelete = props => {
    const confirmAction = () => {
        props.deleteTeamDistrict(props.teamId, props.districtId);
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
            <p>Wil je deze afspraak kalender ontkoppelen van dit team?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        teamId: state.teamDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteTeamDistrict: (teamId, districtId) => {
        dispatch(deleteTeamDistrict(teamId, districtId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsDistrictsDelete);
