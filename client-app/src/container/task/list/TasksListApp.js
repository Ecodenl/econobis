import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTasks, clearTasks } from '../../../actions/task/TasksActions';
import TasksList from './TasksList';
import TasksListToolbar from './TasksListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";

class TasksListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            const filters = filterHelper(this.props.tasksFilters);
            const sorts = this.props.tasksSorts.reverse();

            this.props.fetchTasks(filters, sorts);
        },100 );
    };

    componentWillUnmount() {
        this.props.clearTasks();
    };

    refreshTasksData = () => {
        const filters = filterHelper(this.props.tasksFilters);
        const sorts = this.props.tasksSorts.reverse();

        this.props.clearTasks();
        this.props.fetchTasks(filters, sorts);
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.tasksFilters);
        const sorts = this.props.tasksSorts.reverse();

        this.props.clearTasks();
        this.props.fetchTasks(filters, sorts);
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 extra-space-above">
                        <TasksListToolbar
                            refreshTasksData={() => this.refreshTasksData()}
                        />
                    </div>

                    <div className="col-md-12 extra-space-above">
                        <TasksList
                            tasks={this.props.tasks}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshTasksData={() => this.refreshTasksData()}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        tasksFilters: state.tasksFilters,
        tasksSorts: state.tasksSorts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchTasks, clearTasks }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksListApp);