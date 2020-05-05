import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deletePhoneNumber } from '../../../../actions/contact/ContactDetailsActions';

const ContactDetailsPhoneDelete = props => {
    const confirmAction = () => {
        props.deletePhoneNumber(props.id);
        props.closeDeleteItemModal();
    };
    let allowDelete = false;
    if (!props.primary || (props.numberOfPhoneNumbers && props.numberOfPhoneNumbers === 1)) {
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
                Verwijder telefoonnummer: <strong> {`${props.number}`} </strong>
            </p>

            {props.primary && props.numberOfPhoneNumbers > 1 && (
                <p className={'text-danger'}>
                    <strong>Fout!</strong> Dit is een primair telefoonnummer en kan niet worden verwijderd.
                    <br />
                    Maak eerst een ander e-mailadres primair.
                </p>
            )}
            {props.primary && allowDelete && (
                <p className={'text-danger'}>
                    <strong>Let op!</strong> Dit is een primair telefoonnummer en enige telefoonnummer bij contact.
                </p>
            )}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deletePhoneNumber: id => {
        dispatch(deletePhoneNumber(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactDetailsPhoneDelete);
