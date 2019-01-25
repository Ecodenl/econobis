import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import ProjectsListItem from './ProjectsListItem';
import ProjectsDeleteItem from './ProjectsDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';

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
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title-quaternary">
                            <DataTableHeadTitle title={'Projectcode'} width={'15%'} />
                            <DataTableHeadTitle title={'Project'} width={'20%'} />
                            <DataTableHeadTitle title={'Type project'} width={'20%'} />
                            <DataTableHeadTitle title={'# deelnames nodig'} width={'10%'} />
                            <DataTableHeadTitle title={'Uitgegeven deelnames'} width={'10%'} />
                            <DataTableHeadTitle title={'Uit te geven deelnames'} width={'10%'} />
                            <DataTableHeadTitle title={'Lening nodig'} width={'10%'} />
                            <DataTableHeadTitle title={'Lening opgehaald'} width={'10%'} />
                            <DataTableHeadTitle title={'Lening uit te geven'} width={'10%'} />
                            <DataTableHeadTitle title={'Percentage uitgegeven'} width={'14%'} />
                            <DataTableHeadTitle title={''} width={'6%'} />
                        </tr>
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

export default connect(
    mapStateToProps,
    null
)(ProjectsList);
