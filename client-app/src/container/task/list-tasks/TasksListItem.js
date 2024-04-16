import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hashHistory } from 'react-router';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';
import { check } from 'react-icons-kit/fa/check';

import { setTaskFinished } from '../../../actions/task/TasksActions';

class TasksListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };

        this.openItem = this.openItem.bind(this);
        this.setItemFinished = this.setItemFinished.bind(this);
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem() {
        hashHistory.push(`/taak/${this.props.id}`);
    }

    setItemFinished() {
        // Set task on finished
        const task = {
            id: this.props.id,
            finished: true,
        };

        this.props.setTaskFinished(task);
    }

    render() {
        const {
            id,
            createdAt,
            typeName,
            noteSummary,
            contactFullName,
            datePlannedStart,
            responsibleName,
            showSelectTasks,
            toggleTaskCheck,
            taskIds,
        } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                {showSelectTasks && (
                    <td>
                        <input
                            type="checkbox"
                            name={id}
                            onChange={toggleTaskCheck}
                            checked={taskIds && taskIds.length > 0 ? taskIds.includes(id) : false}
                        />
                    </td>
                )}
                <td>{moment(createdAt).format('L')}</td>
                <td>{typeName}</td>
                <td>{noteSummary}</td>
                <td>{contactFullName}</td>
                <td>{datePlannedStart && moment(datePlannedStart).format('L')}</td>
                <td>{responsibleName}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={this.openItem}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.manageTask ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={this.setItemFinished}>
                            <Icon className="mybtn-success" size={14} icon={check} />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

const mapDispatchToProps = dispatch => ({
    setTaskFinished: id => {
        dispatch(setTaskFinished(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksListItem);
