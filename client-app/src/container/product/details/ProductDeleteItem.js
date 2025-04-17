import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteProduct } from '../../../actions/product/ProductsActions';

const ProductDeleteItem = ({ id, name, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.productDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteProduct(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/producten');
            dispatch({ type: 'RESET_DELETE_PRODUCT_SUCCESS' });
        }
    }, [deleteSuccess, navigate, dispatch]);

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            Verwijder product: <strong>{name}</strong>?
        </Modal>
    );
};

export default ProductDeleteItem;
