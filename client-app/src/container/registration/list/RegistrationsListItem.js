import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class RegistrationsListItem extends Component {
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
        hashHistory.push(`/aanmelding/${id}`);
    };

    render() {
        const { id, fullName, createdAt, sourceNames = [], status, measuresRequested = [] } = this.props;

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{ fullName }</td>
                <td>{ moment(createdAt.date).format('DD-MM-Y') }</td>
                <td>{ sourceNames.join(', ') }</td>
                <td>{ status }</td>
                <td>{ measuresRequested }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
}

export default RegistrationsListItem;