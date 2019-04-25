import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteAdministrationUser } from '../../../../actions/administration/AdministrationDetailsActions';

const AdministrationDetailsUsersDelete = props => {
    const confirmAction = () => {
        props.deleteAdministrationUser(props.administrationId, props.userId);
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
            <p>Wil je deze gebruiker ontkoppelen van deze administratie?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        administrationId: state.administrationDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteAdministrationUser: (administrationId, userId) => {
        dispatch(deleteAdministrationUser(administrationId, userId));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministrationDetailsUsersDelete);
