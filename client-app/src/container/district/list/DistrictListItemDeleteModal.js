import React, {useState} from 'react';
import Modal from '../../../components/modal/Modal';
import DistrictAPI from "../../../api/district/DistrictAPI";

export default function DistrictListItemDeleteModal({district, onDelete, showDeleteModal, setShowDeleteModal}) {
    const confirmAction = () => {
        DistrictAPI.deleteDistrict(district).then(() => {
            setShowDeleteModal(false);
            onDelete();
        }).catch(() => {
            alert("Er is iets misgegaan met het verwijderen van de wijk.");
        });
    };

    if (showDeleteModal) {
        return (
            <Modal
                buttonConfirmText="Verwijder"
                buttonClassName={'btn-danger'}
                closeModal={() => setShowDeleteModal(false)}
                confirmAction={() => confirmAction()}
                title="Verwijderen"
            >
                Verwijder wijk: <strong> {district.name} </strong>
            </Modal>
        );
    }

    return (
        <a role="button" onClick={() => setShowDeleteModal(true)}>
            <span className="glyphicon glyphicon-trash mybtn-danger"/>
        </a>
    );
}