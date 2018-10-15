import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { fetchOrderDetails } from '../../../../../actions/order/OrderDetailsActions';
import OrderDetailsAPI from "../../../../../api/order/OrderDetailsAPI";

const OrderProductsFormDelete = (props) => {

    const confirmAction = () => {
        OrderDetailsAPI.deleteOrderProduct(props.id).then((payload) => {
            props.fetchOrderDetails(props.orderId);
            props.closeDeleteItemModal();
        });

    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Verwijder orderregel?</p>

        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: (id) => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(OrderProductsFormDelete);
