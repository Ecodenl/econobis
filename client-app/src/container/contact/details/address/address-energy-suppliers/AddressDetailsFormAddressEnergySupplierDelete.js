import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';

const AddressDetailsFormAddressEnergySupplierDelete = props => {
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
                Verwijder energieleverancier: <strong> {`${props.energySupplier.name}`} </strong> bij contact{' '}
                <strong> {`${props.contact.fullName}`} </strong>?
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
