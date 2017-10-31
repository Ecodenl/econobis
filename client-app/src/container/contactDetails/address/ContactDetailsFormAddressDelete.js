import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteAddress } from '../../../actions/ContactDetailsActions';

const ContactDetailsAddressDelete = (props) => {
    const confirmAction = () => {
        props.deleteAddress(props.id);
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
            <p>Verwijder adres: <strong> {`${props.street} ${props.number}` } </strong></p>

            { props.primary && <p className={'text-danger'}><strong>Let op!</strong> Dit is een primair adres</p> }
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteAddress: (id) => {
        dispatch(deleteAddress(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailsAddressDelete);
