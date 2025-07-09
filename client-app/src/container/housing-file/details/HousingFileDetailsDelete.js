import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteHousingFile } from '../../../actions/housing-file/HousingFileDetailsActions';

const HousingFileDetailsDelete = ({ id, fullStreet, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteHousingFile(id));
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
                Verwijder woningdossier: <strong> {`${fullStreet}`} </strong>
            </p>
        </Modal>
    );
};

export default HousingFileDetailsDelete;
