import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import {
    deleteComposedExceptGroup,
    fetchContactGroupDetails,
} from '../../../../../actions/contact-group/ContactGroupDetailsActions';

const ContactGroupComposedExceptGroupDelete = props => {
    const confirmAction = () => {
        props.deleteComposedExceptGroup(props.contactGroupId, props.composedExceptGroup.id);
        props.fetchContactGroupDetails(props.contactGroupId);
        props.closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijder uit uitgezonderd"
        >
            <p>
                Ontkoppel groep: <strong> {`${props.composedExceptGroup.name}`} </strong>
            </p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteComposedExceptGroup: (contactGroupId, contactGroupToDetachId) => {
        dispatch(deleteComposedExceptGroup(contactGroupId, contactGroupToDetachId));
    },
    fetchContactGroupDetails: id => {
        dispatch(fetchContactGroupDetails(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactGroupComposedExceptGroupDelete);
