import React, {useState} from 'react';
import Modal from "../../../components/modal/Modal";
import DistrictAPI from "../../../api/district/DistrictAPI";

export default function DistrictDetailsCoachesListItem({district, coach, onDetach}) {
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const detach = () => {
        DistrictAPI.detachDistrictCoach({districtId: district.id, coachId: coach.id}).then(() => {
            onDetach();
            setShowDeleteModal(false);
        }).catch(() => {
            alert("Er is iets misgegaan met het ontkoppelen van de coach.");
        });
    };

    return (
        <>
            <div
                className={`row border ${isHovered ? 'highlight-line' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="col-sm-11">{coach.fullName}</div>
                <div className="col-sm-1">
                    {isHovered && (
                        <a role="button" onClick={() => setShowDeleteModal(true)}>
                            <span className="glyphicon glyphicon-trash mybtn-danger" />
                        </a>
                    )}
                </div>
            </div>

            {
                showDeleteModal && (
                    <Modal
                        buttonConfirmText="Verwijder"
                        buttonClassName={'btn-danger'}
                        closeModal={() => setShowDeleteModal(false)}
                        confirmAction={() => detach()}
                        title="Verwijderen"
                    >
                        <p>Wil je deze coach ontkoppelen van deze afspraak kalender?</p>
                    </Modal>
                )
            }
        </>
    );
}
