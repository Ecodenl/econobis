import React, { Component } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import TaskTypeAPI from '../../../api/task-type/TaskTypeAPI';
import TaskTypesListToolbar from './TaskTypesListToolbar';
import TaskTypesList from './TaskTypesList';

class TaskTypesListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskTypes: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchTaskTypesData();
    }

    callFetchTaskTypesData = () => {
        this.setState({ isLoading: true, hasError: false });
        TaskTypeAPI.fetchTaskTypes()
            .then(payload => {
                this.setState({ isLoading: false, taskTypes: payload.data.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <TaskTypesListToolbar
                            taskTypesCount={this.state.taskTypes ? this.state.taskTypes.length : 0}
                            refreshTaskTypesData={this.callFetchTaskTypesData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <TaskTypesList
                            taskTypes={this.state.taskTypes}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default TaskTypesListApp;
