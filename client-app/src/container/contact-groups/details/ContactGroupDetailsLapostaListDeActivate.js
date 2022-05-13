import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../../../components/modal/Modal';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import { deActivateContactGroupLapostaList } from '../../../actions/contact-group/ContactGroupDetailsActions';

function ContactGroupDetailsLapostaListDeActivate({ closeModal, id, lapostaListId }) {
    const [message, setMessage] = useState('Aanmaken laposta lijst gestart');
    const [errors, setErrors] = useState([]);

    useEffect(function() {
        ContactGroupAPI.deActivateLapostaList(id)
            .then(payload => {
                setMessage('Laposta lijst is succesvol uitgezet');
                deActivateContactGroupLapostaList(lapostaListId);
                setTimeout(closeModal, 2000);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.econobis && error.response.data.errors.econobis.length) {
                            setMessage('De volgende fouten gevonden tijdens uitzetten:');
                            setErrors(error.response.data.errors.econobis);
                        }
                    } else if (error.response.data && error.response.data.message) {
                        setMessage(
                            'Er is iets misgegaan bij het uitzetten van Laposta (' + error.response.status + ').'
                        );
                        let messageErrors = [];
                        for (const [key, value] of Object.entries(JSON.parse(error.response.data.message))) {
                            messageErrors.push(`${value}`);
                        }

                        setErrors(messageErrors);
                    }
                } else {
                    setMessage(
                        'Er is iets misgegaan bij het uitzetten van Laposta (' +
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
            title="Uitzetten van Laposta"
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

const mapStateToProps = state => {
    return {
        id: state.contactGroupDetails.id,
        lapostaListId: state.contactGroupDetails.lapostaListId,
    };
};

const mapDispatchToProps = dispatch => ({
    deActivatedContactGroupLapostaList: lapostaListId => {
        dispatch(deActivatedContactGroupLapostaList(lapostaListId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupDetailsLapostaListDeActivate);
