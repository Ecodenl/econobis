import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import TaskAPI from '../../../api/task/TasksAPI';

class ButtonTasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountActiveTasks: '-',
        };
    }

    UNSAFE_componentWillMount() {
        TaskAPI.getAmountActive().then(payload => {
            this.setState({
                amountActiveTasks: payload,
            });
        });
    }

    render() {
        return (
            <div className={this.props.size} onClick={() => hashHistory.push(`/taken/eigen`)}>
                <div className="panel panel-default" id="dashboardbutton-4">
                    <div className="panel-body">
                        <h4 className="text-center text-bold">OPEN TAKEN</h4>
                        <h4 className="text-center text-bold">{this.state.amountActiveTasks}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonTasks;
