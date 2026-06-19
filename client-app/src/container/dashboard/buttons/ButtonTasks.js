import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskAPI from '../../../api/task/TasksAPI';

// Functionele wrapper voor de class component
const ButtonTasksWrapper = props => {
    const navigate = useNavigate();
    return <ButtonTasks {...props} navigate={navigate} />;
};

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
            <div className={this.props.size} onClick={() => this.props.navigate(`/taken/eigen`)}>
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

export default ButtonTasksWrapper;
