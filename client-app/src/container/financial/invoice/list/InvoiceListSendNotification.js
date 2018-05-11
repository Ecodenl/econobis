import React, {Component} from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";
import moment from "moment/moment";
import validator from "validator";
import InputDate from "../../../../components/form/InputDate";
import {connect} from "react-redux";
import {fetchAdministrationDetails} from "../../../../actions/administration/AdministrationDetailsActions";
import {hashHistory} from "react-router";

class InvoiceListSendNotification extends Component {

    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        event.preventDefault();
        InvoiceDetailsAPI.sendNotification(this.props.invoiceId).then((payload) => {
            this.props.fetchInvoicesData();
            this.props.closeModal();
        });
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Versturen"
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Notificatie versturen"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        {this.props.reminderText}
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default InvoiceListSendNotification;