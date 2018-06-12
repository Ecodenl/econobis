import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";
import {hashHistory} from "react-router";

class InvoiceListSetCheckedAll extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.setCheckedAll(this.props.administrationId).then((payload) => {
            this.props.closeModal();
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
                        Wilt u alle facturen als gecontroleerd({this.props.amountOfInvoices}) markeren?
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default InvoiceListSetCheckedAll;