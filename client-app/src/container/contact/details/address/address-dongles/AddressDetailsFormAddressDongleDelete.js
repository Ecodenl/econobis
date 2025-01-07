import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteAddressDongle } from '../../../../../actions/contact/ContactDetailsActions';

const AddressDetailsFormAddressDongleDelete = props => {
    const confirmAction = () => {
        props.deleteAddressDongle(props.id);
        props.closeDeleteItemModal();
        props.reloadContact();
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
                <strong> Weet u zeker dat u deze dongel wilt verwijderen? </strong>?
            </p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteAddressDongle: id => {
        dispatch(deleteAddressDongle(id));
    },
});

export default connect(null, mapDispatchToProps)(AddressDetailsFormAddressDongleDelete);
