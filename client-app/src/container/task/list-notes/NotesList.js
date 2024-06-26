import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import NotesListHead from './NotesListHead';
import NotesListFilter from './NotesListFilter';
import NotesListItem from './NotesListItem';
import NotesDeleteItem from './NotesDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { connect } from 'react-redux';

class NotesList extends Component {
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
                id: id,
                name: name,
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
        const { data = [], meta = {} } = this.props.notes;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van notities.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen notities gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <NotesListHead fetchNotesData={() => this.props.fetchNotesData()} />
                            <NotesListFilter onSubmitFilter={this.props.onSubmitFilter} />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(task => {
                                    return (
                                        <NotesListItem
                                            key={task.id}
                                            {...task}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                        />
                                    );
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.notesPagination.page}
                        />
                    </div>
                </form>
                {this.state.showDeleteItem && (
                    <NotesDeleteItem closeDeleteItemModal={this.closeDeleteItemModal} {...this.state.deleteItem} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(NotesList);
