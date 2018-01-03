import React from 'react';

import Modal from '../../../../components/modal/Modal';

const ContactDetailsContactFromGroupDelete = (props) => {
    const confirmAction = () => {
        props.deleteContactFromGroup(props.group.pivot.contact_group_id, props.group.pivot.contact_id);
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
            <p className="modal-text">Verwijder groep: <strong> { props.group.name } </strong></p>
        </Modal>
    );
};

export default ContactDetailsContactFromGroupDelete;
