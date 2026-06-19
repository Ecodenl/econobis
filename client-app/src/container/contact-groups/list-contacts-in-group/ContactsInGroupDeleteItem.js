import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContactInGroup } from '../../../actions/contact-group/ContactsInGroupActions';

const ContactsDeleteItem = props => {
    const confirmAction = () => {
        props.deleteContactInGroup(props.groupId, props.id);
        setTimeout(() => {
            props.closeDeleteItemModal();
            props.refreshContactsInGroupData();
        }, 1000);
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder contact uit groep: <strong> {props.fullName} </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContactInGroup: (contactGroupId, id) => {
        dispatch(deleteContactInGroup(contactGroupId, id));
    },
});

export default connect(null, mapDispatchToProps)(ContactsDeleteItem);
