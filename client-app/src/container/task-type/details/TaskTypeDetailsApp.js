import React, { Component } from 'react';

import TaskTypeDetailsToolbar from './TaskTypeDetailsToolbar';
import TaskTypeDetailsForm from './TaskTypeDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import TaskTypeDetailsAPI from '../../../api/task-type/TaskTypeDetailsAPI';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const TaskTypeDetailsAppWrapper = props => {
    const params = useParams();
    return <TaskTypeDetailsApp {...props} params={params} />;
};

class TaskTypeDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskType: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchTaskTypeDetails();
    }

    callFetchTaskTypeDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        TaskTypeDetailsAPI.fetchTaskTypeDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    taskType: {
                        ...payload.data.data,
                    },
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = taskType => {
        this.setState({ taskType });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <TaskTypeDetailsToolbar name={this.state.taskType.name || ''} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <TaskTypeDetailsForm
                            taskType={this.state.taskType}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            updateState={this.updateState}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default TaskTypeDetailsAppWrapper;
