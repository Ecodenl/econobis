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
                updateContactHoomAccount(1);
                setTimeout(closeModal, 2000);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    if (error.response.data && error.response.data.message) {
                        setMessage('Niet alle benodigde gegevens zijn ingevuld:');
                        // todo WM: opschonen log
                        // console.log(JSON.parse(error.response.data.message));
                        setErrors(JSON.parse(error.response.data.message));
                    }
                } else {
                    alert('Er is iets misgegaan met het aanmaken van het hoomdossier');
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
            {errors && errors.email ? (
                <ul>
                    {errors.email.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.first_name ? (
                <ul>
                    {errors.first_name.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.last_name ? (
                <ul>
                    {errors.last_name.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.postal_code ? (
                <ul>
                    {errors.postal_code.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.number ? (
                <ul>
                    {errors.number.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.house_number_extension ? (
                <ul>
                    {errors.house_number_extension.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.street ? (
                <ul>
                    {errors.street.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.city ? (
                <ul>
                    {errors.city.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            ) : null}
            {errors && errors.phone_number ? (
                <ul>
                    {errors.phone_number.map(item => (
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
