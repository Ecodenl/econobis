import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";
import {hashHistory} from "react-router";

class InvoiceListSetChecked extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.setChecked(this.props.invoiceId).then((payload) => {
            hashHistory.push(`/financieel/${this.props.administrationId}/facturen/gecontroleerd`);
        });
    };

    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Factuur gecontroleerd"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Wilt u deze factuur als gecontroleerd markeren?
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default InvoiceListSetChecked;