import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteProductUser } from '../../../../actions/administration/ProductDetailsActions';

const ProductDetailsUsersDelete = (props) => {
    const confirmAction = () => {
        props.deleteProductUser(props.administrationId, props.userId);
        props.toggleDelete();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleDelete}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Wil je deze gebruiker ontkoppelen van deze administratie?</p>

        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        administrationId: state.administrationDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteProductUser: (administrationId, userId) => {
        dispatch(deleteProductUser(administrationId, userId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsUsersDelete);
