import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";
import {hashHistory} from "react-router";

class InvoiceListSend extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.send(this.props.invoiceId).then((payload) => {
            hashHistory.push(`/financieel/${this.props.administrationId}/facturen/herinnering`);
        });
    };

    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur verzenden"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Wilt u deze factuur verzenden?
                    </span>
                    </div>
                </div>
                {this.props.sendMethodId === 'post' &&
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>
                            <strong>
                        Let op, deze factuur moet per post worden verzonden. De status zal worden doorgezet naar verzonden, maar er zal geen e-mail worden verstuurd.
                        </strong>
                    </span>
                    </div>
                </div>
                }
            </Modal>
        );
    };
}

export default InvoiceListSend;