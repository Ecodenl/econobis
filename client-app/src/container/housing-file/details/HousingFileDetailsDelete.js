import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteHousingFile } from '../../../actions/housing-file/HousingFileDetailsActions';

const HousingFileDetailsDelete = ({ id, fullStreet, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.housingFileDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteHousingFile(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/woningdossiers');
            dispatch({ type: 'RESET_DELETE_HOUSING_FILE_SUCCESS' });
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
                Verwijder woningdossier: <strong> {`${fullStreet}`} </strong>
            </p>
        </Modal>
    );
};

export default HousingFileDetailsDelete;
