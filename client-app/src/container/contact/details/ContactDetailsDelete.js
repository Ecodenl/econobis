import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.contactDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteContact(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/contacten');
            dispatch({ type: 'RESET_DELETE_CONTACT_SUCCESS' });
        }
    }, [deleteSuccess, navigate, dispatch]);

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
