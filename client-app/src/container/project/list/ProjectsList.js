import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';

import ProjectsListItem from './ProjectsListItem';
import ProjectsDeleteItem from './ProjectsDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import ProjectsListHead from './ProjectsListHead';
import ProjectsListFilter from './ProjectsListFilter';

class ProjectsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            },
        };
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id,
                name,
            },
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem: {
                ...this.state.deleteItem,
                id: '',
                name: '',
            },
        });
    };

    render() {
        const { data = [], meta = {} } = this.props.projects;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van projecten.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen projecten gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <ProjectsListHead fetchProjectsListData={() => this.props.fetchProjectsListData()} />
                            <ProjectsListFilter onSubmitFilter={this.props.onSubmitFilter} />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={11}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(project => (
                                    <ProjectsListItem
                                        key={project.id}
                                        {...project}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                    />
                                ))
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.projectsPagination.page}
                        />
                    </div>
                </form>
                {this.state.showDeleteItem && (
                    <ProjectsDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        fetchProjectsData={this.props.fetchProjectsData}
                        {...this.state.deleteItem}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.list,
        projectsPagination: state.projects.pagination,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(ProjectsList);
