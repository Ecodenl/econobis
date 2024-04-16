import React, { Component, useEffect, useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import TasksListHead from './TasksListHead';
import TasksListFilter from './TasksListFilter';
import TasksListItem from './TasksListItem';
import TasksDeleteItem from './TasksDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { connect, useSelector } from 'react-redux';
import ButtonIcon from '../../../components/button/ButtonIcon';

function TasksList({
    tasks,
    multiSelectEnabled,
    onSubmitFilter,
    tasksPagination,
    handlePageClick,
    fetchTasksData,
    hasError,
    isLoading,
}) {
    const [checkedAll, setCheckedAll] = useState(false);
    const [taskIds, setTaskIds] = useState([]);
    const [showDeleteItem, setShowDeleteItem] = useState(false);
    const [deleteItem, setDeleteItem] = useState({
        id: '',
        name: '',
    });
    const permissions = useSelector(state => state.meDetails.permissions);

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    function toggleCheckedAll() {
        const isChecked = event.target.checked;
        let taskIds = [];

        if (isChecked) {
            taskIds = meta.taskIdsTotal;
        }
        setTaskIds(taskIds);
        setCheckedAll(isChecked);
    }

    function toggleTaskCheck(event) {
        const isChecked = event.target.checked;
        const taskId = Number(event.target.name);

        if (isChecked) {
            setTaskIds([...taskIds, taskId]);
            checkAllTasksAreChecked();
        } else {
            setTaskIds([...taskIds.filter(item => item !== taskId)]);
            setCheckedAll(false);
        }
    }

    function checkAllTasksAreChecked() {
        setCheckedAll(taskIds.length === meta.taskIdsTotal.length);
    }

    function showDeleteItemModal(id, name) {
        setDeleteItem(true);
        setDeleteItem({
            id: id,
            name: name,
        });
    }

    function closeDeleteItemModal() {
        setDeleteItem(false);
        setDeleteItem({
            id: '',
            name: '',
        });
    }
    function updateSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
    }
    function deleteSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
    }

    const { data = [], meta = {} } = tasks;

    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van taken.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (data.length === 0) {
        loadingText = 'Geen taken gevonden!';
    } else {
        loading = false;
    }

    let numberSelectedNumberTotal = 0;

    if (taskIds) {
        if (meta && meta.taskIdsTotal) {
            numberSelectedNumberTotal = taskIds.length + '/' + meta.taskIdsTotal.length;
        } else {
            numberSelectedNumberTotal = taskIds.length;
        }
    }

    return (
        <div>
            <form onKeyUp={handleKeyUp}>
                {multiSelectEnabled && (
                    <>
                        <div className="col-md-12">
                            <div className="alert alert-success">Geselecteerde taken: {numberSelectedNumberTotal}</div>
                        </div>
                        {permissions.manageTask && (
                            <div className="col-md-12 margin-10-bottom">
                                <div className="btn-group" role="group">
                                    <ButtonIcon
                                        iconName={'pencil'}
                                        onClickAction={updateSelection}
                                        title="Bijwerken geselecteerde taken"
                                    />
                                    <ButtonIcon
                                        iconName={'trash'}
                                        onClickAction={deleteSelection}
                                        title="Verwijderen geselecteerde taken"
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}

                <DataTable>
                    <DataTableHead>
                        <TasksListHead fetchTasksData={() => fetchTasksData()} showSelectTasks={multiSelectEnabled} />
                        <TasksListFilter
                            onSubmitFilter={onSubmitFilter}
                            showSelectTasks={multiSelectEnabled}
                            toggleCheckedAll={toggleCheckedAll}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={multiSelectEnabled ? 8 : 7}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(task => {
                                return (
                                    <TasksListItem
                                        key={task.id}
                                        {...task}
                                        showDeleteItemModal={showDeleteItemModal}
                                        showSelectTasks={multiSelectEnabled}
                                        toggleTaskCheck={toggleTaskCheck}
                                        taskIds={taskIds}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={meta.total}
                        initialPage={tasksPagination.page}
                    />
                </div>
            </form>
            {showDeleteItem && <TasksDeleteItem closeDeleteItemModal={closeDeleteItemModal} {...deleteItem} />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(TasksList);
