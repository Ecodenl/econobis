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
Let op. Nadat je op "maak facturen" hebt geklikt staan de facturen klaar om te verzenden. Je kunt geen wijzigingen aanmaken in de order. Dit kan pas weer, nadat de aangemaakte factuur werkelijk is verzonden. Zorg er daarom voor dat je order juist is.
<br/><br/>
De aangemaakte facturen komen in de map “Te verzenden - incasso facturen” of “Te verzenden – overboek facturen”. Vanuit deze mappen kun je de facturen echt verzenden.
<br/><br/>
Deze orders gaan van de order map "Actief - te factureren orders" naar de order map “Actief – te verzenden orders”.
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default OrderCreateConfirm;