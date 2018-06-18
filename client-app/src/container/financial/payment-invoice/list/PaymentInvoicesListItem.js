import React, {Component} from 'react';
import PaymentInvoiceListSetNotPaid from "./PaymentInvoiceListSetNotPaid";

class PaymentInvoicesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
            showSetNotPaid: false,
        };
    }

    showSetNotPaid = () => {
        this.setState({showSetNotPaid: !this.state.showSetNotPaid});
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


    render() {
        const { id, number, revenueDistribution, status } = this.props;
        return (
            <tr className={this.state.highlightRow} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{number}</td>
                <td>{revenueDistribution.contact ? revenueDistribution.contact.fullName: ''}</td>
                <td>{'€' + revenueDistribution.payout.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{status ? status.name : ''}</td>
                <td>
                    {(this.state.showActionButtons && this.props.statusId === 'sent' ? <a role="button" onClick={() => this.showSetNotPaid()} title="Zet op niet betaald"><span className="glyphicon glyphicon-remove mybtn-success" /> </a> : '')}
                    {
                        this.state.showSetNotPaid &&
                        <PaymentInvoiceListSetNotPaid
                            closeModal={this.showSetNotPaid}
                            invoiceId={id}
                            administrationId={this.props.administrationId}
                        />
                    }
                </td>
            </tr>
        );
    }
}

export default PaymentInvoicesListItem;