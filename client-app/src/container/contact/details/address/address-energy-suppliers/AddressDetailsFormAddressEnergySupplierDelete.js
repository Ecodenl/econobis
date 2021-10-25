import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';

const AddressDetailsFormAddressEnergySupplierDelete = props => {
    const addressLine =
        props.address.street +
        ' ' +
        props.address.number +
        (props.address.addition ? '-' + props.address.addition : '') +
        ', ' +
        props.address.postalCode +
        ', ' +
        props.address.city +
        (props.address.country ? ', ' + props.address.country.name : '');
    const confirmAction = () => {
        props.deleteAddressEnergySupplier(props.id);
        props.closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>
                Verwijder energieleverancier: <strong> {`${props.energySupplier.name}`} </strong> bij adres{' '}
                <strong> {`${addressLine}`} </strong>?
            </p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteAddressEnergySupplier: id => {
        dispatch(deleteAddressEnergySupplier(id));
    },
});

export default connect(null, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierDelete);
