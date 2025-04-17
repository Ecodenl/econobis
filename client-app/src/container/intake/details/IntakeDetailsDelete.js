import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteIntake } from '../../../actions/intake/IntakeDetailsActions';

const IntakeDetailsDelete = ({ id, contactId, fullStreet, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.intakeDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteIntake(id, contactId));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            if (contactId == 0) {
                navigate('/intakes');
            } else {
                navigate(`/contact/` + contactId);
            }
            dispatch({ type: 'RESET_DELETE_INTAKE_SUCCESS' });
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
                Verwijder intake: <strong> {`${fullStreet}?`} </strong>
            </p>
        </Modal>
    );
};

export default IntakeDetailsDelete;
