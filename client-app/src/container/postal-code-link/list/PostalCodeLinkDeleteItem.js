import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deletePostalCodeLink } from '../../../actions/postal-code-link/PostalCodeLinkActions';

const PostalCodeLinkDeleteItem = props => {
    const confirmAction = () => {
        props.deletePostalCodeLink(props.id);
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
            Verwijder postcode roos: <strong> {props.postalCodeMain} </strong>gelinkt met{' '}
            <strong>{props.postalCodeLink}</strong>?
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deletePostalCodeLink: id => {
        dispatch(deletePostalCodeLink(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(PostalCodeLinkDeleteItem);
