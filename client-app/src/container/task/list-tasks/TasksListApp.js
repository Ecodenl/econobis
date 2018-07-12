import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTasks, clearTasks } from '../../../actions/task/TasksActions';
import { clearFilterTask } from '../../../actions/task/TasksFiltersActions';
import { setTasksPagination } from '../../../actions/task/TasksPaginationActions';
import TasksList from './TasksList';
import TasksListToolbar from './TasksListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";
import { isEmpty } from 'lodash';
import { setFilterTaskMe } from '../../../actions/task/TasksFiltersActions';

class TasksListApp extends Component {
    constructor(props) {
        super(props);

        if (!isEmpty(props.params)) {
            if(props.params.type === 'eigen'){
                this.props.setFilterTaskMe(true);
            }
        } else {
            this.props.clearFilterTask();
        }

        this.fetchTasksData = this.fetchTasksData.bind(this);
        this.resetTaskFilters = this.resetTaskFilters.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchTasksData();
    };

    componentWillUnmount() {
        this.props.clearTasks();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.params.type !== nextProps.params.type){
            if(!isEmpty(nextProps.params)) {
                if(nextProps.params.type === 'eigen'){
                  this.props.setFilterTaskMe(true);
                };
            }
            else {
                this.props.clearFilterTask();
            }

            setTimeout(() => {
                this.fetchTasksData();
            }, 100);
        }
    }

    fetchTasksData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.tasksFilters);
            const sorts = this.props.tasksSorts;
            const pagination = { limit: 20, offset: this.props.tasksPagination.offset };

            //this.props.clearContacts();
            this.props.fetchTasks(filters, sorts, pagination);
        },100 );
    };

    resetTaskFilters() {
        this.props.clearFilterTask();

        this.fetchTasksData();
    };

    onSubmitFilter() {
        this.props.clearTasks();

        this.props.setTasksPagination({page: 0, offset: 0});

        this.fetchTasksData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setTasksPagination({page, offset});

        this.fetchTasksData();
    };

    render() {

        let me = false;

        if(this.props.params.type == 'eigen'){
            me = true;
        }

        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <TasksListToolbar
                            resetTaskFilters={() => this.resetTaskFilters()}
                            me={me}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <TasksList
                            tasks={this.props.tasks}
                            tasksPagination={this.props.tasksPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            fetchTasksData={() => this.fetchTasksData()}
                            handlePageClick={this.handlePageClick}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.list,
        tasksFilters: state.tasks.filters,
        tasksSorts: state.tasks.sorts,
        tasksPagination: state.tasks.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchTasks, clearTasks, clearFilterTask, setTasksPagination, setFilterTaskMe }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksListApp);