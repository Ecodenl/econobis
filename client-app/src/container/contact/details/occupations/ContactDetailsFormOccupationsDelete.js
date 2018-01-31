import React from 'react';

import Modal from '../../../../components/modal/Modal';

const ContactDetailsFormOccupationsDelete = (props) => {
    const confirmAction = () => {
        props.deleteOccupation(props.occupation);
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
            <p>Verwijder verbinding: <strong> {`${props.occupation.organisation.name} met rol: ${props.occupation.occupation.name}` } </strong></p>

        </Modal>
    );
};

export default ContactDetailsFormOccupationsDelete;
