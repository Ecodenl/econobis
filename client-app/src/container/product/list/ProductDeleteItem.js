import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import {deleteProduct} from "../../../actions/product/ProductsActions";

const ProductDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteProduct(props.id);
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
            Verwijder product: <strong> { props.name } </strong>?
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteProduct: (id) => {
        dispatch(deleteProduct(id));
    },
});

export default connect(null, mapDispatchToProps)(ProductDeleteItem);
