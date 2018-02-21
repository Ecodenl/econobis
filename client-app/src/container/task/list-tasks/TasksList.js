import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import TasksListHead from './TasksListHead';
import TasksListFilter from './TasksListFilter';
import TasksListItem from './TasksListItem';
import TasksDeleteItem from './TasksDeleteItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class TasksList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: ''
            }
        };
    };

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id: id,
                name: name
            }
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                name: ''
            }
        });
    };

    render() {
        const { data = [], meta = {}, isLoading } = this.props.tasks;

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <TasksListHead
                                fetchTasksData={() => this.props.fetchTasksData()}
                            />
                            <TasksListFilter
                                onSubmitFilter={this.props.onSubmitFilter}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {
                                data.length === 0 ? (
                                    <tr><td colSpan={7}>Geen taken gevonden!</td></tr>
                                ) : (
                                    data.map((task) => {
                                        return <TasksListItem
                                            key={task.id}
                                            {...task}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                        />
                                    })
                                )
                            }
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.tasksPagination.page}
                        />
                    </div>
                </form>
                {
                    this.state.showDeleteItem &&
                    <TasksDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                }
            </div>
        );
    };
}

export default TasksList;