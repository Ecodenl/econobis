import React, { useState } from 'react';
import Modal from '../../../components/modal/Modal';
import DistrictAPI from '../../../api/district/DistrictAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';

export default function DistrictListItemDeleteModal({ district, onDelete, showDeleteModal, setShowDeleteModal }) {
    const confirmAction = () => {
        DistrictAPI.deleteDistrict(district)
            .then(() => {
                setShowDeleteModal(false);
                onDelete();
            })
            .catch(() => {
                alert('Er is iets misgegaan met het verwijderen van de afspraakkalender.');
            });
    };

    return (
        <>
            <ButtonIcon iconName={'trash'} onClickAction={() => setShowDeleteModal(true)} />
            {showDeleteModal && (
                <Modal
                    buttonConfirmText="Verwijder"
                    buttonClassName={'btn-danger'}
                    closeModal={() => setShowDeleteModal(false)}
                    confirmAction={() => confirmAction()}
                    title="Verwijderen"
                >
                    Verwijder afspraakkalender: <strong> {district.name} </strong>
                </Modal>
            )}
        </>
    );
}
