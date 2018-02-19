import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class QuotationRequestsListItem extends Component {
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
        hashHistory.push(`/offerteverzoek/${id}`);
    };

    render() {
        const { id, organisation, opportunity, createdAt, datedRecorded, status, dateReleased, dateValid } = this.props;

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{ organisation && organisation.name }</td>
                <td>{ opportunity && opportunity.contact.fullName }</td>
                <td>{ opportunity && opportunity.intake.fullAddress }</td>
                <td>{ opportunity && opportunity.measure.name }</td>
                <td>{ moment(createdAt.date).format('DD-MM-Y') }</td>
                <td>{ datedRecorded && moment(datedRecorded).format('DD-MM-Y') }</td>
                <td>{ status ? status.name : 'Onbekend'}</td>
                <td>{ dateReleased && moment(dateReleased).format('DD-MM-Y') }</td>
                <td>{ dateValid && moment(dateValid).format('DD-MM-Y') }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
}

export default QuotationRequestsListItem;