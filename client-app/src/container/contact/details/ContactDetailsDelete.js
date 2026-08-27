import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContact } from '../../../actions/contact/ContactDetailsActions';

const ContactDetailsDelete = ({
    id,
    fullName,
    type,
    numberOfActions,
    isOrganisationOrCoach,
    inspectionPersonTypeId,
    closeDeleteItemModal,
}) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteContact(id));
        closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            <p>
                Verwijder contact ({`${type.name}`}): <strong> {`${fullName}`} </strong>
            </p>
            {numberOfActions > 0 ? (
                <>
                    <p>
                        Er {numberOfActions == 1 ? `is` : `zijn`} nog <strong>{`${numberOfActions}`}</strong> gekoppelde
                        Acties op kans voor deze <strong>{`${type.name}`}</strong>.
                    </p>
                    <p>
                        <span className="error-span">
                            {isOrganisationOrCoach
                                ? `Deze gekoppelde Acties op kans zullen ontkoppeld worden!`
                                : inspectionPersonTypeId === 'projectmanager'
                                ? `Contact is projectleider bij deze Acties op kans en zal hiervan ontkoppeld worden.`
                                : inspectionPersonTypeId === 'externalparty'
                                ? `Contact is externe partij bij deze Acties op kans en zal hiervan ontkoppeld worden.`
                                : `Onbekende koppeling met Acties op kans`}
                        </span>
                    </p>
                </>
            ) : null}
        </Modal>
    );
};

export default ContactDetailsDelete;
