import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteOrder } from '../../../../actions/order/OrdersActions';
import { hashHistory } from 'react-router';

const OrderDeleteItem = props => {
    const confirmAction = () => {
        props.deleteOrder(props.id);
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
            Verwijder Order: <strong> {props.subject} </strong>?
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteOrder: id => {
        dispatch(deleteOrder(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(OrderDeleteItem);
