import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { fetchTasks, clearTasks } from '../../../actions/task/TasksActions';
import { clearFilterTask, setFilterTaskMe } from '../../../actions/task/TasksFiltersActions';
import { setTasksPagination } from '../../../actions/task/TasksPaginationActions';
import TasksList from './TasksList';
import TasksListToolbar from './TasksListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { isEmpty } from 'lodash';

function TasksListApp(props) {
    const [multiselectEnabled, setMultiselectEnabled] = useState(false);
    const tasks = useSelector(state => state.tasks.list);
    const tasksFilters = useSelector(state => state.tasks.filters);
    const tasksSorts = useSelector(state => state.tasks.sorts);
    const tasksPagination = useSelector(state => state.tasks.pagination);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(props.params)) {
            if (props.params.type === 'eigen') {
                dispatch(setFilterTaskMe(true));
            }
        } else {
            dispatch(clearFilterTask());
        }
        fetchTasksData();
        return () => {
            dispatch(clearTasks());
        };
    }, [props.params]);

    const fetchTasksData = () => {
        setTimeout(() => {
            const filters = filterHelper(tasksFilters);
            const sorts = tasksSorts;
            const pagination = { limit: 20, offset: tasksPagination.offset };
            dispatch(fetchTasks(filters, sorts, pagination));
        }, 100);
    };

    const resetTaskFilters = () => {
        dispatch(clearFilterTask());
        fetchTasksData();
    };

    const onSubmitFilter = () => {
        dispatch(clearTasks());
        dispatch(setTasksPagination({ page: 0, offset: 0 }));
        fetchTasksData();
    };

    const handlePageClick = data => {
        let page = data.selected;
        let offset = Math.ceil(page * 20);
        dispatch(setTasksPagination({ page, offset }));
        fetchTasksData();
    };

    let me = false;
    if (props.params.type === 'eigen') {
        me = true;
    }

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <TasksListToolbar
                        resetTaskFilters={resetTaskFilters}
                        me={me}
                        setMultiselectEnabled={() => setMultiselectEnabled(!multiselectEnabled)}
                    />
                </div>

                <div className="col-md-12 margin-10-top">
                    <TasksList
                        tasks={tasks}
                        multiselectEnabled={multiselectEnabled}
                        tasksPagination={tasksPagination}
                        onSubmitFilter={onSubmitFilter}
                        fetchTasksData={fetchTasksData}
                        handlePageClick={handlePageClick}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default TasksListApp;
