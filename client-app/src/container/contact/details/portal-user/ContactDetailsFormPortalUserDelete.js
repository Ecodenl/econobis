import React from 'react';

import Modal from '../../../../components/modal/Modal';

const ContactDetailsFormPortalUserDelete = props => {
    const confirmAction = () => {
        props.deletePortalUser(props.portalUser);
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
                <p>
                    Verwijder portal gebruiker
                </p>
        </Modal>
    );
};

export default ContactDetailsFormPortalUserDelete;
