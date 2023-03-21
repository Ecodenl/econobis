import React, {useEffect, useState} from 'react';
import Modal from '../../../../components/modal/Modal';
import {hashHistory} from "react-router";

export default function OpportunityDetailsQuotationRequestPlanByDistrictModal({districts, onCancel, opportunityId}) {
    const [districtId, setDistrictId] = useState('');

    useEffect(() => {
        setDistrictId(districts[0].id);
    }, []);

    const confirmAction = () => {
        hashHistory.push(
            `/offerteverzoek/nieuw/kans/${opportunityId}/plan/${districtId}`
        )
    };

    return (
        <Modal
            buttonConfirmText="Doorgaan"
            closeModal={onCancel}
            confirmAction={confirmAction}
            title="Afspraak plannen"
        >
            Selecteer afspraakkalender:
            <select
                className="form-control input-sm"
                value={districtId}
                onChange={(event) => setDistrictId(event.target.value)}
            >
                {districts.map(option => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    );
                })}
            </select>

        </Modal>
    );
}