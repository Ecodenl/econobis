import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// Functionele wrapper voor de class component
const TaskListWrapper = props => {
    const navigate = useNavigate();
    return <TaskList {...props} navigate={navigate} />;
};

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedTasks: '',
        };
    }

    openItem = id => {
        this.props.navigate(`/taak/${id}`);
    };

    render() {
        const { relatedTasks } = this.props;
        return (
            <div>
                {relatedTasks == '' && <div>Geen taken gevonden.</div>}

                {relatedTasks != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedTasks.map((relatedTask, i) => {
                                return (
                                    <tr onClick={() => this.openItem(relatedTask.id)} key={i}>
                                        <td className="col-xs-12 clickable">
                                            {moment(relatedTask.createdAt).format('L')} - {relatedTask.noteSummary}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        relatedTasks: state.taskDetails.relatedTasks,
    };
};

export default connect(mapStateToProps)(TaskListWrapper);
