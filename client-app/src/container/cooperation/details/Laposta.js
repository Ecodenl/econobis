import React, { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';
import CooperationDetailsAPI from '../../../api/cooperation/CooperationDetailsAPI';

function CooperationDetailsLaposta({ closeModal, formData }) {
    const [message, setMessage] = useState('Synchronisatie laposta gestart');
    const [errors, setErrors] = useState([]);

    useEffect(function() {
        CooperationDetailsAPI.syncAllWithLaposta(formData.id)
            .then(payload => {
                setMessage('Synchronisatie is succesvol uitgevoerd');
                setTimeout(closeModal, 2000);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.econobis && error.response.data.errors.econobis.length) {
                            setMessage('De volgende fouten gevonden tijdens synchronisatie:');
                            setErrors(error.response.data.errors.econobis);
                        }
                    } else if (error.response.data && error.response.data.message) {
                        setMessage(
                            'Er is iets misgegaan bij het synchroniseren met Laposta (' + error.response.status + ').'
                        );
                        let messageErrors = [];
                        for (const [key, value] of Object.entries(JSON.parse(error.response.data.message))) {
                            messageErrors.push(`${value}`);
                        }

                        setErrors(messageErrors);
                    }
                } else {
                    setMessage(
                        'Er is iets misgegaan bij het synchroniseren met Laposta (' +
                            (error.response && error.response.status) +
                            ').'
                    );
                }
            });
    }, []);

    return (
        <Modal
            buttonClassName={'btn-danger'}
            closeModal={closeModal}
            buttonCancelText={'Sluiten'}
            showConfirmAction={false}
            title="Synchroniseren met Laposta"
        >
            <p>{message}</p>
            {errors.length ? (
                <ul>
                    {errors.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
        </Modal>
    );
}

export default CooperationDetailsLaposta;
