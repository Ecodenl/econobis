import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteAdministration } from '../../../actions/administration/AdministrationsActions';

const AdministrationDeleteItem = ({ id, name, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteAdministration(id));
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
            Verwijder administratie: <strong>{name}</strong>?
        </Modal>
    );
};

export default AdministrationDeleteItem;
