import React from 'react';

import Modal from '../../../components/modal/Modal';

const ContactsListSaveAsGroup = (props) => {
    const confirmAction = () => {
        props.saveAsGroup();
    };

    return (
        <Modal
        buttonConfirmText="Aanmaken"
            buttonClassName={'btn-success'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Groep aanmaken"
      >
            Wilt u een groep aanmaken op basis van de huidige filters?
      </Modal>
    );
};

export default ContactsListSaveAsGroup;
