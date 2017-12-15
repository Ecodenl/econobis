import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hashHistory } from 'react-router';
import moment from 'moment';

import  { setTaskCompleted } from '../../../actions/task/TasksActions';

class TasksListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };

        this.openItem = this.openItem.bind(this);
        this.setItemCompleted = this.setItemCompleted.bind(this);
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

    openItem() {
        hashHistory.push(`/taak/${this.props.id}`);
    };

    setItemCompleted() {
        const statusFinished = this.props.taskStatuses.find((taskStatus) => taskStatus.code === 'finished');

        const task = {
            id: this.props.id,
            statusId: statusFinished.id,
        };

        this.props.setTaskCompleted(task);
    };

    render() {
        const { id, createdAt, name, contactFullName, datePlanned, dateStarted, statusName, statusCode, responsibleUserName } = this.props;

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
                    {(this.state.showActionButtons ? <a role="button" onClick={this.openItem}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                    {(this.state.showActionButtons ? <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
                    {(this.state.showActionButtons && statusCode !== 'finished' ? <a role="button" onClick={this.setItemCompleted}><span className="glyphicon glyphicon-ok mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
};

const mapStateToProps = (state) => ({
    taskStatuses: state.systemData.taskStatuses,
});


const mapDispatchToProps = dispatch => ({
    setTaskCompleted: (id) => {
        dispatch(setTaskCompleted(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksListItem);