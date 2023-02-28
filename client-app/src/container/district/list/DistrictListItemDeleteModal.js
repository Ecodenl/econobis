import React, {useState} from 'react';
import Modal from '../../../components/modal/Modal';
import DistrictAPI from "../../../api/district/DistrictAPI";

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

export default function DistrictListItemDeleteModal({district, onDelete, showDeleteModal, setShowDeleteModal}) {
    const confirmAction = () => {
        DistrictAPI.deleteDistrict(district).then(() => {
            setShowDeleteModal(false);
            onDelete();
        }).catch(() => {
            alert("Er is iets misgegaan met het verwijderen van de afspraakkalender.");
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
                Verwijder afspraakkalender: <strong> {district.name} </strong>
            </Modal>
        );
    }

    return (
        <a role="button" onClick={() => setShowDeleteModal(true)}>
            <Icon class="mybtn-danger" size={14} icon={trash} />
        </a>
    );
}