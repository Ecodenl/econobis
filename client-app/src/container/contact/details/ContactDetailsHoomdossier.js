import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../../../components/modal/Modal';
import { updateContactHoomAccount } from '../../../actions/contact/ContactDetailsActions';
import ContactDetailsAPI from '../../../api/contact/ContactDetailsAPI';

function ContactDetailHoomdossier({ closeModal, id, updateContactHoomAccount }) {
    const [message, setMessage] = useState('Aanmaken hoomdossier gestart');
    const [errors, setErrors] = useState([]);

    useEffect(function() {
        ContactDetailsAPI.makeHoomDossier(id)
            .then(payload => {
                setMessage('Hoomdossier is succesvol aangemaakt');
                if (payload && payload.data) {
                    updateContactHoomAccount(payload.data);
                }
                setTimeout(closeModal, 2000);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.econobis && error.response.data.errors.econobis.length) {
                            setMessage('Niet alle benodigde gegevens zijn ingevuld:');
                            setErrors(error.response.data.errors.econobis);
                        }
                    } else if (error.response.data && error.response.data.message) {
                        setMessage(
                            'Er is iets misgegaan bij het aanmaken van het hoomdossier (' + error.response.status + ').'
                        );
                        let messageErrors = [];
                        for (const [key, value] of Object.entries(JSON.parse(error.response.data.message))) {
                            messageErrors.push(`${value}`);
                        }

                        setErrors(messageErrors);
                    }
                } else {
                    setMessage(
                        'Er is iets misgegaan bij het aanmaken van het hoomdossier (' +
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
            title="Hoomdossier aanmaken"
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
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    updateContactHoomAccount: hoomAccountId => {
        dispatch(updateContactHoomAccount(hoomAccountId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailHoomdossier);
