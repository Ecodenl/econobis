import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import TasksListHead from './TasksListHead';
import TasksListFilter from './TasksListFilter';
import TasksListItem from './TasksListItem';

class TasksList extends Component {
    constructor(props){
        super(props);
    };

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    render() {
        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <TasksListHead
                            refreshTasksData={() => this.props.refreshTasksData()}
                        />
                        <TasksListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {
                            this.props.tasks.length === 0 ? (
                                <tr><td colSpan={7}>Geen aanmeldingen gevonden!</td></tr>
                            ) : (
                                this.props.tasks.map((task) => {
                                    return <TasksListItem
                                        key={task.id}
                                        {...task}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>
            </form>
        );
    };
}

export default TasksList;