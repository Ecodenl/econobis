import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteEmailAddress } from '../../../../actions/contact/ContactDetailsActions';

const ContactDetailsEmailDelete = props => {
    const confirmAction = () => {
        props.deleteEmailAddress(props.id);
        props.closeDeleteItemModal();
    };
    let allowDelete = false;
    if (!props.primary || (props.numberOfEmailAddresses && props.numberOfEmailAddresses === 1)) {
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
                Verwijder e-mailadres: <strong> {`${props.email}`} </strong>
            </p>

            {props.primary && props.numberOfEmailAddresses > 1 && (
                <p className={'text-danger'}>
                    <strong>Fout!</strong> Dit is een primair e-mailadres en kan niet worden verwijderd.
                    <br />
                    Maak eerst een ander e-mailadres primair.
                </p>
            )}
            {props.primary && allowDelete && (
                <p className={'text-danger'}>
                    <strong>Let op!</strong> Dit is een primair e-mailadres en enige e-mailadres bij contact.
                </p>
            )}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteEmailAddress: id => {
        dispatch(deleteEmailAddress(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactDetailsEmailDelete);
