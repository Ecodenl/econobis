import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import OrderDetailsAPI from "../../../../api/order/OrderDetailsAPI";
import {hashHistory} from "react-router";

class OrderCreateConfirm extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();

        OrderDetailsAPI.createAll(this.props.orderIds).then((payload) => {
            hashHistory.push(`/financieel/${this.props.administrationId}/facturen/te-verzenden-incasso`);});
    };


    render() {
        return (
            <Modal
                modalClassName={'modal-lg'}
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur aanmaken"
                buttonConfirmText={"Aanmaken"}
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Wilt u alle facturen ({this.props.amountOfOrders}) aanmaken?
De aangemaakte facturen komen in de map “Te verzenden - incasso facturen” of “Te verzenden – overboek facturen”. Vanuit deze mappen kun je de facturen echt verzenden.
Deze orders komen in de order map “Actief – te verzenden orders”.
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default OrderCreateConfirm;