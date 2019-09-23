import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import OrderDetailsAPI from '../../../../api/order/OrderDetailsAPI';
import { hashHistory } from 'react-router';

class OrderCreateConfirm extends Component {
    constructor(props) {
        super(props);

        super(props);

        this.state = {
            loading: false,
        };
    }

    confirmAction = event => {
        this.setState({
            loading: true,
        });

        event.preventDefault();

        OrderDetailsAPI.createAll(this.props.orderIds).then(payload => {
            hashHistory.push(`/financieel/${this.props.administrationId}/notas/te-verzenden-incasso`);
        });
    };

    render() {
        return (
            <Modal
                modalClassName={'modal-lg'}
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Nota aanmaken"
                buttonConfirmText={'Aanmaken'}
                loading={this.state.loading}
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>
                            Wilt u alle nota's ({this.props.amountOfOrders}) aanmaken? Let op. Nadat je op "maak
                            nota's" hebt geklikt staan de nota's klaar om te verzenden. Je kunt geen wijzigingen
                            aanmaken in de order. Dit kan pas weer, nadat de aangemaakte nota werkelijk is verzonden.
                            Zorg er daarom voor dat je order juist is.
                            <br />
                            <br />
                            De aangemaakte nota's komen in de map “Te verzenden - incasso nota's” of “Te verzenden –
                            overboek nota's”. Vanuit deze mappen kun je de nota's echt verzenden.
                            <br />
                            <br />
                            Deze orders gaan van de order map "Actief - te factureren orders" naar de order map “Actief
                            – te verzenden orders”.
                        </span>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default OrderCreateConfirm;
