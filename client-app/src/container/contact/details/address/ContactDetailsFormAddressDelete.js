import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteAddress } from '../../../../actions/contact/ContactDetailsActions';

const ContactDetailsAddressDelete = ({ id, primary, numberOfAddresses, street, number, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteAddress(id));
        closeDeleteItemModal();
    };

    const allowDelete = !primary || (numberOfAddresses && numberOfAddresses === 1);

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            showConfirmAction={allowDelete}
            title="Verwijderen"
        >
            <p>
                Verwijder adres: <strong>{`${street} ${number}`}</strong>
            </p>

            {primary && numberOfAddresses > 1 && (
                <p className={'text-danger'}>
                    <strong>Fout!</strong> Dit is een primair adres en kan niet worden verwijderd.
                    <br />
                    Maak eerst een ander adres primair.
                </p>
            )}

            {primary && allowDelete && (
                <p className={'text-danger'}>
                    <strong>Let op!</strong> Dit is een primair adres en enige adres bij contact.
                </p>
            )}
        </Modal>
    );
};

export default ContactDetailsAddressDelete;
