import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const TaskTypesListItemWrapper = props => {
    const navigate = useNavigate();
    return <TaskTypesListItem {...props} navigate={navigate} />;
};

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
        this.props.navigate(`/taak-type/${id}`);
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
                            <Icon className="mybtn-success" size={14} icon={pencil} />
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

export default connect(mapStateToProps)(TaskTypesListItemWrapper);
