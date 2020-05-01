import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteAddress } from '../../../../actions/contact/ContactDetailsActions';

const ContactDetailsAddressDelete = props => {
    const confirmAction = () => {
        props.deleteAddress(props.id);
        props.closeDeleteItemModal();
    };
    let allowDelete = false;
    if (!props.primary || (props.numberOfAddresses && props.numberOfAddresses === 1)) {
        allowDelete = true;
    }

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            showConfirmAction={allowDelete}
            title="Verwijderen"
        >
            <p>
                Verwijder adres: <strong> {`${props.street} ${props.number}`} </strong>
            </p>

            {props.primary && props.numberOfAddresses > 1 && (
                <p className={'text-danger'}>
                    <strong>Fout!</strong> Dit is een primair adres en kan niet worden verwijderd.
                    <br />
                    Maak eerst een ander adres primair.
                </p>
            )}
            {props.primary && allowDelete && (
                <p className={'text-danger'}>
                    <strong>Let op!</strong> Dit is een primair adres en enige adres bij contact.
                </p>
            )}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteAddress: id => {
        dispatch(deleteAddress(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactDetailsAddressDelete);
