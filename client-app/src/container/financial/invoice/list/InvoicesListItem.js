import React, { Component } from 'react';

import { hashHistory } from 'react-router';
import moment from 'moment';
import InvoiceListSetPaid from "./InvoiceListSetPaid";
import InvoiceListSendNotification from "./InvoiceListSendNotification";
import InvoiceListSetIrrecoverable from "./InvoiceListSetIrrecoverable";

class InvoicesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            finalized: false,
            showActionButtons: false,
            highlightRow: '',
            showSetPaid: false,
            showSendNotification: false,
            reminderText: '',
            showSetIrrecoverable: false,
        };
    }

    componentDidMount() {
        if(this.props.dateReminder3){
            this.setState({
                reminderText: 'Wilt u de aanmaning sturen?',
            });
        }
        else if(this.props.dateReminder2){
            this.setState({
                reminderText: 'Wilt u de derde herinnering sturen?',
            });
        }
        else if(this.props.dateReminder1){
            this.setState({
                reminderText: 'Wilt u de tweede herinnering sturen?',
            });
        }
        else{
            this.setState({
                reminderText: 'Wilt u de eerste herinnering sturen?',
            });
        }

        if(this.props.statusId === 'paid' || this.props.statusId === 'irrecoverable'){
            this.setState({
                finalized: true,
            });
        }
    };

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    };

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    };

    openItem(id) {
        hashHistory.push(`/factuur/${id}`);
    };

    viewItem(id) {
        hashHistory.push(`/factuur/inzien/${id}`);
    };


    showSetPaid = () => {
        this.setState({showSetPaid: !this.state.showSetPaid});
    };

    showSendNotification = () => {
        this.setState({showSendNotification: !this.state.showSendNotification});
    };

    showSetIrrecoverable = () => {
        this.setState({showSetIrrecoverable: !this.state.showSetIrrecoverable});
    };

    render() {
        const { id, number, dateRequested, order, subject, paymentType, status, daysExpired, totalPriceInclVatAndReduction, amountOpen } = this.props;
        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{number}</td>
                <td>{ dateRequested ? moment(dateRequested).format('DD-MM-Y') : ''}</td>
                <td>{order ? order.contact.fullName : ''}</td>
                <td>{subject ? subject : ''}</td>
                <td>{daysExpired}</td>
                <td>{'€' + totalPriceInclVatAndReduction.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{paymentType ? paymentType.name : ''}</td>
                <td>{status ? status.name : ''}</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.viewItem(id)}><span className="glyphicon glyphicon-eye-open mybtn-success" /> </a> : '')}
                    {(this.state.showActionButtons && !this.state.finalized ? <a role="button" onClick={() => this.showSetPaid()}><span className="glyphicon glyphicon-euro mybtn-success" /> </a> : '')}
                    {(this.state.showActionButtons && !this.state.finalized && !this.props.dateExhortation ? <a role="button" onClick={() => this.showSendNotification()}><span className="glyphicon glyphicon-bullhorn mybtn-success" /> </a> : '')}
                    {(this.state.showActionButtons && !this.state.finalized ? <a role="button" onClick={() => this.showSetIrrecoverable()}><span className="glyphicon glyphicon-remove mybtn-success" /> </a> : '')}
                </td>

                {
                    this.state.showSetPaid &&
                    <InvoiceListSetPaid
                        closeModal={this.showSetPaid}
                        invoiceId={id}
                        amountOpen={amountOpen}
                        administrationId={this.props.administrationId}
                    />
                }

                {
                    this.state.showSendNotification &&
                    <InvoiceListSendNotification
                        reminderText={this.state.reminderText}
                        closeModal={this.showSendNotification}
                        invoiceId={id}
                        fetchInvoicesData={this.props.fetchInvoicesData}
                    />
                }

                {
                    this.state.showSetIrrecoverable &&
                    <InvoiceListSetIrrecoverable
                        closeModal={this.showSetIrrecoverable}
                        invoiceId={id}
                        administrationId={this.props.administrationId}
                    />
                }

            </tr>
        );
    }
}

export default InvoicesListItem;