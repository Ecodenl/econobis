import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';

const AddressDetailsFormAddressEnergySupplierDelete = ({
    address,
    id,
    energySupplier,
    closeDeleteItemModal,
    reloadContact,
    deleteAddressEnergySupplier,
}) => {
    const addressLine = useMemo(() => {
        return (
            `${address.street} ${address.number}` +
            `${address.addition ? '-' + address.addition : ''}, ` +
            `${address.postalCode}, ${address.city}` +
            `${address.country ? ', ' + address.country.name : ''}`
        );
    }, [address]);

    const confirmAction = () => {
        deleteAddressEnergySupplier(id, () => {
            closeDeleteItemModal();
            reloadContact();
        });
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName="btn-danger"
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            <p>
                Verwijder energieleverancier: <strong>{energySupplier?.name || ''}</strong> bij adres{' '}
                <strong>{addressLine}</strong>?
            </p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteAddressEnergySupplier: (id, onSuccess) => {
        dispatch(deleteAddressEnergySupplier(id, onSuccess));
    },
});

export default connect(null, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierDelete);
