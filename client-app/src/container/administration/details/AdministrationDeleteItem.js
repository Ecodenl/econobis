import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteAdministration } from '../../../actions/administration/AdministrationsActions';

const AdministrationDeleteItem = ({ id, name, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.administrationDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteAdministration(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/administraties');
            dispatch({ type: 'RESET_DELETE_ADMINISTRATION_SUCCESS' });
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
            Verwijder administratie: <strong>{name}</strong>?
        </Modal>
    );
};

export default AdministrationDeleteItem;
