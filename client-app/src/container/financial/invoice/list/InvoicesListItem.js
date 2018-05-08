import React, { Component } from 'react';

import { hashHistory } from 'react-router';
import moment from 'moment';

class InvoicesListItem extends Component {
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

    openItem(id) {
        hashHistory.push(`/factuur/${id}`);
    };

    render() {
        const { id, number, dateRequested, order, subject, paymentType, status } = this.props;

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{number}</td>
                <td>{ dateRequested ? moment(dateRequested).format('DD-MM-Y') : ''}</td>
                <td>{order ? order.contact.fullName : ''}</td>
                <td>{subject ? subject : ''}</td>
                <td>{'todo'}</td>
                <td>{'todo'}</td>
                {/*<td>{'€' + totalPriceInclVatPerYear.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>*/}
                <td>{paymentType ? paymentType.name : ''}</td>
                <td>{status ? status.name : ''}</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
}

export default InvoicesListItem;