import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteComposedGroup, fetchContactGroupDetails } from '../../../../actions/contact-group/ContactGroupDetailsActions';

const ContactGroupComposedGroupDelete = (props) => {
    const confirmAction = () => {
        props.deleteComposedGroup(props.contactGroupId, props.composedGroup.id);
        props.fetchContactGroupDetails(props.contactGroupId);
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
            <p>Ontkoppel groep: <strong> {`${props.composedGroup.name}` } </strong></p>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteComposedGroup: (contactGroupId, contactGroupToDetachId) => {
        dispatch(deleteComposedGroup(contactGroupId, contactGroupToDetachId));
    },
    fetchContactGroupDetails: (id) => {
        dispatch(fetchContactGroupDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactGroupComposedGroupDelete);
