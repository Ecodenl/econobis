import React, {Component} from 'react';

class PaymentInvoicesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

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
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{number}</td>
                <td>{revenueDistribution.contact ? revenueDistribution.contact.fullName: ''}</td>
                <td>{'€' + revenueDistribution.payout.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{status ? status.name : ''}</td>
            </tr>
        );
    }
}

export default PaymentInvoicesListItem;