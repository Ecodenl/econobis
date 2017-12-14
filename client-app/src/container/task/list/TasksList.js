import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import TasksListHead from './TasksListHead';
import TasksListFilter from './TasksListFilter';
import TasksListItem from './TasksListItem';
import TasksDeleteItem from './TasksDeleteItem';

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
        return (
            <div>
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
                                    <tr><td colSpan={8}>Geen kansen gevonden!</td></tr>
                                ) : (
                                    this.props.tasks.map((task) => {
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