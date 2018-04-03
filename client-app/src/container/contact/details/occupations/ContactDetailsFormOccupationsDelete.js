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
            {props.primaryOccupation ?
                <p>Verwijder
                    verbinding: <strong> {`${props.occupation.contact.fullName} met rol: ${props.occupation.occupation.secondaryOccupation}`} </strong>
                </p>
                :
                <p>Verwijder
                    verbinding: <strong> {`${props.occupation.primaryContact.fullName} met rol: ${props.occupation.occupation.primaryOccupation}`} </strong>
                </p>
            }
        </Modal>
    );
};

export default ContactDetailsFormOccupationsDelete;
