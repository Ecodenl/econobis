import React from 'react';

import Modal from '../../../../components/modal/Modal';
import { deletePortalUser } from '../../../../actions/contact/ContactDetailsActions';
import { connect } from 'react-redux';

const ContactDetailsFormPortalUserDelete = props => {
    const confirmAction = () => {
        props.deletePortalUser(props.portalUser.id);
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
            <p>Verwijder portal gebruiker</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        portalUser: state.contactDetails.portalUser,
    };
};

const mapDispatchToProps = dispatch => ({
    deletePortalUser: id => {
        dispatch(deletePortalUser(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetailsFormPortalUserDelete);
