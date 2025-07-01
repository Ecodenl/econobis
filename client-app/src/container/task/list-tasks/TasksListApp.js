import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTasks, clearTasks } from '../../../actions/task/TasksActions';
import { clearFilterTask, setFilterTaskMe } from '../../../actions/task/TasksFiltersActions';
import { setTasksPagination } from '../../../actions/task/TasksPaginationActions';
import TasksList from './TasksList';
import TasksListToolbar from './TasksListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

function TasksListApp(props) {
    const params = useParams();

    const [multiSelectEnabled, setMultiSelectEnabled] = useState(false);
    const tasks = useSelector(state => state.tasks.list);
    const tasksFilters = useSelector(state => state.tasks.filters);
    const tasksSorts = useSelector(state => state.tasks.sorts);
    const tasksPagination = useSelector(state => state.tasks.pagination);
    const dispatch = useDispatch();

    useEffect(() => {
        if (params && params.type === 'eigen') {
            dispatch(setFilterTaskMe(true));
        } else {
            dispatch(setFilterTaskMe(false));
        }
    }, [params.type]);
    useEffect(() => {
        fetchTasksData();
    }, [tasksFilters, tasksSorts, tasksPagination]);

    function fetchTasksData() {
        setTimeout(() => {
            const filters = filterHelper(tasksFilters);
            const sorts = tasksSorts;
            const pagination = { limit: 20, offset: tasksPagination.offset };
            dispatch(fetchTasks(filters, sorts, pagination));
        }, 100);
    }

    const resetTaskFilters = () => {
        dispatch(clearFilterTask());

        // Filter eigen komt vanuit URL (params) en die willen we graag behouden.
        if (!isEmpty(params)) {
            if (params.type === 'eigen') {
                dispatch(setFilterTaskMe(true));
            }
        }
        // fetchTasksData doet ie obv eventueel gewijzigde filter, sortering of pagina. Hier overbodig dus.
        // fetchTasksData();
    };

    const onSubmitFilter = () => {
        dispatch(clearTasks());
        dispatch(setTasksPagination({ page: 0, offset: 0 }));
        // fetchTasksData doet ie obv eventueel gewijzigde filter, sortering of pagina. Hier overbodig dus.
        // fetchTasksData();
    };

    const handlePageClick = data => {
        let page = data.selected;
        let offset = Math.ceil(page * 20);
        dispatch(setTasksPagination({ page, offset }));
    };

    let me = false;
    if (params.type === 'eigen') {
        me = true;
    }

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <TasksListToolbar
                        resetTaskFilters={resetTaskFilters}
                        me={me}
                        setMultiSelectEnabled={() => setMultiSelectEnabled(!multiSelectEnabled)}
                    />
                </div>

                <div className="col-md-12 margin-10-top">
                    <TasksList
                        tasks={tasks}
                        multiSelectEnabled={multiSelectEnabled}
                        setMultiSelectDisabled={() => setMultiSelectEnabled(false)}
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
