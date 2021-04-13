import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

class TaskTypesListItem extends Component {
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
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        hashHistory.push(`/taak-type/${id}`);
    }

    render() {
        const {
            id,
            name,
            usesWfExpiredTask,
            usesWfCompletedTask,
            numberOfDaysToSendEmailCompletedTask,
            usesWfNewTask,
            permissions,
        } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={permissions.manageFinancial ? () => this.openItem(id) : null}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{name}</td>
                <td>{usesWfExpiredTask ? 'Ja' : 'Nee'}</td>
                <td>{usesWfCompletedTask ? 'Ja' : 'Nee'}</td>
                {/*<td>{usesWfCompletedTask ? (numberOfDaysToSendEmailCompletedTask === 0 ? 'Direct' : numberOfDaysToSendEmailCompletedTask) : ''}</td>*/}
                <td>{usesWfCompletedTask ? numberOfDaysToSendEmailCompletedTask : ''}</td>
                <td>{usesWfNewTask ? 'Ja' : 'Nee'}</td>

                <td>
                    {this.state.showActionButtons && permissions.manageFinancial ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(TaskTypesListItem);
