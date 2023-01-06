import React, {useEffect, useState} from 'react';
import Modal from '../../../components/modal/Modal';

export default function QuotationRequestPlanNewSelectCoachModal({coaches, onSelectCoach, onCancel}) {
    const [coachId, setCoachId] = useState(null);

    useEffect(() => {
        setCoachId(coaches[0].id);
    }, []);

    const confirmAction = () => {
        onSelectCoach(coachId);
    };

    return (
        <Modal
            buttonConfirmText="Plannen"
            closeModal={onCancel}
            confirmAction={confirmAction}
            title="Afspraak plannen"
        >
            Er zijn meerdere coaches beschikbaar, selecteer een coach:
            <select
                className="form-control input-sm"
                value={coachId}
                onChange={(event) => setCoachId(event.target.value)}
            >
                {coaches.map(option => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option.fullName}
                        </option>
                    );
                })}
            </select>
        </Modal>
    );
}