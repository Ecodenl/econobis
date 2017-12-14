import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class TasksListItem extends Component {
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
        hashHistory.push(`/taak/${id}`);
    };

    render() {
        const { id, createdAt, name, contactFullName, datePlanned, dateStarted, statusName, responsibleUserName } = this.props;

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{ moment(createdAt.date).format('DD-MM-Y') }</td>
                <td>{ name }</td>
                <td>{ contactFullName }</td>
                <td>{ datePlanned && moment(datePlanned.date).format('DD-MM-Y') }</td>
                <td>{ dateStarted && moment(dateStarted.date).format('DD-MM-Y') }</td>
                <td>{ statusName }</td>
                <td>{ responsibleUserName }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
}

export default TasksListItem;